// Integración con el catálogo API de Imblasco (ver MANUAL_USO.pdf en la raíz, no versionado).
// Requiere la variable de entorno IMBLASCO_API_KEY (ver .env.example) — nunca se expone al
// cliente: todo el fetch ocurre dentro de este server function.
import { createServerFn } from "@tanstack/react-start";
import type { Product } from "@/data/products";

const API_BASE = "https://api.imblasco.cl/";
const CACHE_TTL_MS = 30 * 60 * 1000;
// Por ahora solo traemos esta categoría grande (la más alineada al rubro de
// Sublinovena) — el resto del catálogo de Imblasco (Premiación, Novedades,
// Línea Cobre, etc.) no se importa.
const CATEGORIA_FILTRO = "Artículos Publicitarios";

// SKUs de Imblasco que se ocultan del catálogo: Sublinovena ya los ofrece en
// su catálogo propio (src/data/products.ts), así que no deben repetirse.
const SKUS_OCULTOS = new Set(["601055447"]);

type ImblascoCategoria = { id: number; nombre: string };
type ImblascoVariantValue = {
  sku: string;
  nombre: string;
  precio: number | null;
  stock: number | null;
};
type ImblascoVariantGroup = { atributo: string; valores: ImblascoVariantValue[] };
type ImblascoRawProduct = {
  sku: string;
  nombre: string;
  descripcion: string | null;
  foto_principal: string | null;
  url: string | null;
  imagenes: string[];
  categorias: ImblascoCategoria[];
  precio?: number | null;
  stock?: number | null;
  stock_total?: number;
  total_variantes?: number;
  variantes?: ImblascoVariantGroup[];
};
type ImblascoApiResponse = {
  total: number;
  page: number;
  limit: number;
  pages: number;
  productos: ImblascoRawProduct[];
};

let cache: { data: Product[]; fetchedAt: number } | null = null;
let inflight: Promise<Product[]> | null = null;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// "Artículos Publicitarios > Botellas-Mugs... > Mugs y Tazones" -> [primer tramo, último tramo]
function splitCategoria(full: string): [string, string] {
  const parts = full.split(">").map((p) => p.trim());
  return [parts[0] ?? full, parts[parts.length - 1] ?? full];
}

// Imblasco etiqueta cada producto con varias subcategorías a la vez, muchas
// de ellas genéricas (ej. "Accesorios-Herramientas" aparece en casi todo).
// Entre las etiquetas de un producto, nos quedamos con la MENOS frecuente en
// todo el catálogo — es la más específica y la que mejor describe el
// producto, en vez de la primera que aparezca en su lista.
function pickSubcategoria(raw: ImblascoRawProduct, freq: Map<string, number>): string {
  const candidates = raw.categorias
    .filter((c) => c.nombre.startsWith(CATEGORIA_FILTRO))
    .map((c) => splitCategoria(c.nombre)[1]);
  if (candidates.length === 0) return CATEGORIA_FILTRO;

  return candidates.reduce((best, candidate) => {
    const bestFreq = freq.get(best) ?? Infinity;
    const candidateFreq = freq.get(candidate) ?? Infinity;
    return candidateFreq < bestFreq ? candidate : best;
  });
}

function buildSubcategoriaFrequency(productos: ImblascoRawProduct[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const raw of productos) {
    const seen = new Set<string>();
    for (const c of raw.categorias) {
      if (!c.nombre.startsWith(CATEGORIA_FILTRO)) continue;
      const sub = splitCategoria(c.nombre)[1];
      if (seen.has(sub)) continue;
      seen.add(sub);
      freq.set(sub, (freq.get(sub) ?? 0) + 1);
    }
  }
  return freq;
}

function normalize(raw: ImblascoRawProduct, freq: Map<string, number>): Product {
  // Ya no agrupamos bajo "Artículos Publicitarios" como categoría grande —
  // cada subcategoría real de Imblasco (Botellas, Llaveros, etc.) pasa a ser
  // su propia categoría de nivel superior, igual que los productos propios.
  const subcategoria = pickSubcategoria(raw, freq);
  const topCategory = subcategoria;
  const category = subcategoria;
  const image = raw.foto_principal ?? raw.imagenes[0] ?? "";
  const description = raw.descripcion ? stripHtml(raw.descripcion) : "";
  const base = {
    id: `imblasco-${raw.sku}`,
    sku: raw.sku,
    name: raw.nombre,
    topCategory,
    category,
    description,
    notes: [],
    image,
    images: raw.imagenes.filter((img) => img !== image),
    source: "imblasco" as const,
  };

  const group = raw.variantes?.[0];
  if (group) {
    return {
      ...base,
      tiers: group.valores.map((v) => ({ label: v.nombre, price: v.precio ?? 0 })),
      tiersLabel: `Variantes disponibles (${group.atributo})`,
    };
  }

  return {
    ...base,
    tiers: [{ label: "Precio", price: raw.precio ?? 0 }],
    tiersLabel: "Precio",
  };
}

// Hace el fetch real contra Imblasco. Si ya hay uno en curso, lo reutiliza en
// vez de disparar requests duplicadas en paralelo.
function refresh(): Promise<Product[]> {
  if (inflight) return inflight;

  inflight = (async () => {
    const apiKey = process.env["IMBLASCO_API_KEY"];
    if (!apiKey) {
      console.error("IMBLASCO_API_KEY no está configurada.");
      return cache?.data ?? [];
    }

    try {
      const url = `${API_BASE}?ruta=productos&limit=0&categoria=${encodeURIComponent(CATEGORIA_FILTRO)}`;
      const res = await fetch(url, {
        headers: { "X-Api-Key": apiKey },
      });
      if (!res.ok) {
        console.error(`Imblasco API respondió ${res.status}`);
        return cache?.data ?? [];
      }
      const json = (await res.json()) as ImblascoApiResponse;
      const freq = buildSubcategoriaFrequency(json.productos);
      const data = json.productos.map((raw) => normalize(raw, freq));
      cache = { data, fetchedAt: Date.now() };
      return data;
    } catch (error) {
      console.error("Error consultando la API de Imblasco:", error);
      return cache?.data ?? [];
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

export const fetchImblascoProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    if (!cache) {
      // Nunca se ha traído nada: no hay nada que mostrar mientras tanto, así
      // que acá sí hay que esperar el fetch.
      return refresh();
    }
    if (Date.now() - cache.fetchedAt >= CACHE_TTL_MS) {
      // Caché vencido: se sirve lo que hay altiro y se refresca en segundo
      // plano para la próxima — el usuario actual nunca espera por esto.
      void refresh();
    }
    return cache.data;
  },
);

// Wrapper defensivo para usar en loaders de rutas: si el server function
// falla por cualquier motivo (red, plataforma de hosting, etc.), la página
// igual debe renderizar con los productos propios en vez de romperse entera.
export async function safeFetchImblascoProducts(): Promise<Product[]> {
  try {
    return await fetchImblascoProducts();
  } catch (error) {
    console.error("fetchImblascoProducts falló, se omiten productos de Imblasco:", error);
    return [];
  }
}

// Precalienta el caché apenas arranca el servidor, para que ningún visitante
// real tenga que esperar el primer fetch completo a la API de Imblasco.
void refresh();
