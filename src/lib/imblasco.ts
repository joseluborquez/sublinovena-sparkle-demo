// Integración con el catálogo API de Imblasco (ver MANUAL_USO.pdf en la raíz, no versionado).
// Requiere la variable de entorno IMBLASCO_API_KEY (ver .env.example) — nunca se expone al
// cliente: todo el fetch ocurre dentro de este server function.
import { createServerFn } from "@tanstack/react-start";
import type { Product } from "@/data/products";

const API_BASE = "https://api.imblasco.cl/";
const CACHE_TTL_MS = 30 * 60 * 1000;

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

function normalize(raw: ImblascoRawProduct): Product {
  const categoriaFull = raw.categorias[0]?.nombre ?? "Imblasco";
  const [topCategory, category] = splitCategoria(categoriaFull);
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

export const fetchImblascoProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      return cache.data;
    }

    const apiKey = process.env["IMBLASCO_API_KEY"];
    if (!apiKey) {
      console.error("IMBLASCO_API_KEY no está configurada.");
      return cache?.data ?? [];
    }

    try {
      const res = await fetch(`${API_BASE}?ruta=productos&limit=0`, {
        headers: { "X-Api-Key": apiKey },
      });
      if (!res.ok) {
        console.error(`Imblasco API respondió ${res.status}`);
        return cache?.data ?? [];
      }
      const json = (await res.json()) as ImblascoApiResponse;
      const data = json.productos.map(normalize);
      cache = { data, fetchedAt: Date.now() };
      return data;
    } catch (error) {
      console.error("Error consultando la API de Imblasco:", error);
      return cache?.data ?? [];
    }
  },
);
