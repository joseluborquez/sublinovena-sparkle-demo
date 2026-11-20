// Integración con la API 2.0 de Zecat Chile (ver "DOC-API-ZECAT CHILE" 2.0, no versionado).
// Requiere ZECAT_API_TOKEN (ver .env.example), enviado como "Authorization: Bearer".
// Todo el fetch ocurre en el servidor: el token nunca llega al cliente.
import { createServerFn } from "@tanstack/react-start";
import type { Product } from "@/data/products";

const API_BASE = "https://api.zecat.cl/v1/generic_product";
const PAGE_LIMIT = 50;
// Zecat pide consultar el listado como máximo cada hora.
const CACHE_TTL_MS = 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 60_000;

// Solo importamos las "familias" que son rubros; las de campaña (Próximos Arribos,
// 2026 Reingresos/Novedades/Felices Fiestas) y Packaging se descartan. Si un producto
// tiene varias familias gana la primera de la lista (de más específica a más general).
const FAMILIAS: ReadonlyArray<readonly [zecat: string, categoria: string]> = [
  ["Hydra Go", "Botellas"],
  ["Mates y termos", "Botellas"],
  ["Drinkware", "Botellas"],
  ["Jockey", "Jockey - Gorros y Sombreros"],
  ["Llaveros", "Llaveros"],
  ["Cuadernos", "Cuadernos-Libretas"],
  ["Escritura", "Escritura"],
  ["Bolsos y Mochilas", "Mochilas"],
  ["Bolsas y Tote Bags", "Bolsas y Tote Bags"],
  ["Coolers y luncheras", "Coolers y Luncheras"],
  ["Paraguas", "Paraguas"],
  ["Uniformes", "Vestuario y Ropa de Trabajo"],
  ["Apparel", "Vestuario y Ropa de Trabajo"],
  ["Tecnología", "Otros Tecnológicos"],
  ["Escritorio", "Escritorio y Oficina"],
  ["Viajes", "Viajes y Vacaciones"],
  ["Deporte", "Entretención y Outdoor"],
  ["Hogar y Tiempo Libre", "Hogar y Decoración"],
  ["Sustentables", "Amigables"],
];

type ZecatVariant = {
  id: string | number;
  sku: string;
  element_description_1?: string | null;
  stock: string | number | null;
};
type ZecatImage = { image_url: string | null; main?: boolean; order?: number | string | null };
type ZecatRawProduct = {
  id: string | number;
  external_id: string;
  name: string;
  description: string | null;
  price: number | null;
  discountPrice: number | null;
  families: { description: string }[];
  images: ZecatImage[];
  products: ZecatVariant[];
};
type ZecatResponse = { total_pages: number; count: number; generic_products: ZecatRawProduct[] };

let cache: { data: Product[]; fetchedAt: number } | null = null;
let inflight: Promise<Product[]> | null = null;

function categoriaDe(raw: ZecatRawProduct): string | null {
  const names = new Set(raw.families.map((f) => f.description.trim()));
  return FAMILIAS.find(([zecat]) => names.has(zecat))?.[1] ?? null;
}

function normalize(raw: ZecatRawProduct, categoria: string): Product | null {
  // Variantes sin stock no se muestran; si no queda ninguna, se oculta el producto.
  const variants = raw.products.filter((v) => Number(v.stock ?? 0) > 0);
  if (variants.length === 0) return null;

  const urls = raw.images
    .slice()
    .sort((a, b) => Number(b.main ?? false) - Number(a.main ?? false))
    .map((i) => i.image_url)
    .filter((u): u is string => !!u);
  const image = urls[0] ?? "";
  const price = raw.discountPrice ?? raw.price ?? 0;

  return {
    id: `zecat-${raw.id}`,
    sku: raw.external_id || null,
    name: raw.name,
    topCategory: categoria,
    category: categoria,
    description: raw.description?.trim() ?? "",
    notes: [],
    image,
    images: Array.from(new Set(urls)).filter((u) => u !== image),
    source: "zecat",
    tiers: Array.from(new Set(variants.map((v) => v.element_description_1?.trim() || v.sku))).map(
      (label) => ({ label, price }),
    ),
    tiersLabel: "Variantes disponibles (Color)",
  };
}

async function fetchPage(token: string, page: number): Promise<ZecatResponse> {
  const res = await fetch(`${API_BASE}?page=${page}&limit=${PAGE_LIMIT}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Zecat API respondió ${res.status} (página ${page})`);
  return (await res.json()) as ZecatResponse;
}

function refresh(): Promise<Product[]> {
  if (inflight) return inflight;

  inflight = (async () => {
    const token = process.env["ZECAT_API_TOKEN"];
    if (!token) {
      console.error("ZECAT_API_TOKEN no está configurada.");
      return cache?.data ?? [];
    }

    try {
      const first = await fetchPage(token, 1);
      const rest = await Promise.all(
        Array.from({ length: Math.max(0, first.total_pages - 1) }, (_, i) =>
          fetchPage(token, i + 2),
        ),
      );
      const data = [first, ...rest]
        .flatMap((r) => r.generic_products)
        .flatMap((raw) => {
          const categoria = categoriaDe(raw);
          const product = categoria ? normalize(raw, categoria) : null;
          return product ? [product] : [];
        });
      cache = { data, fetchedAt: Date.now() };
      return data;
    } catch (error) {
      console.error(
        "Error consultando la API de Zecat:",
        error instanceof Error ? error.message : "desconocido",
      );
      return cache?.data ?? [];
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

export const fetchZecatProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    if (!cache) return refresh();
    if (Date.now() - cache.fetchedAt >= CACHE_TTL_MS) void refresh();
    return cache.data;
  },
);

// Precalienta el caché al arrancar el servidor.
void refresh();
