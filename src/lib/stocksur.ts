// Integración con la API v2 de Stocksur (Chile). Requiere STOCKSUR_API_TOKEN (ver .env.example).
// Igual que Imblasco, todo el fetch ocurre en el servidor: el token nunca llega al cliente.
import { createServerFn } from "@tanstack/react-start";
import type { Product } from "@/data/products";

const API_BASE = "https://api.chile.stocksur.com/v2/products";
const PAGE_SIZE = 100; // máximo permitido por la API
const CACHE_TTL_MS = 30 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 60_000;

// Solo importamos los "rubros" de Stocksur; sus categorías de campaña (Halloween,
// Día del Padre, Precios Wow, Reingresos, etc.) se descartan. El orden importa:
// si un producto tiene varios rubros gana el primero de la lista (de más
// específico a más general). Los nombres se alinean con los de Imblasco/propios.
const RUBROS: ReadonlyArray<readonly [stocksur: string, categoria: string]> = [
  ["Escrituras Metálicas", "Lápices Metálicos"],
  ["Escrituras Plásticas y otros", "Lápices Plásticos"],
  ["Escritura", "Lápices Plásticos"],
  ["Botellas, Termos, Mugs", "Botellas"],
  ["Mochilas, Bolsos y Bolsas", "Mochilas"],
  ["Tecnología", "Otros Tecnológicos"],
  ["Automóvil", "Accesorios Automóvil"],
  ["Kits / Sets", "Set de Regalos"],
  ["Oficina y Negocios", "Escritorio y Oficina"],
  ["Hogar", "Hogar y Decoración"],
  ["Viajes", "Viajes y Vacaciones"],
  ["Tiempo libre", "Entretención y Outdoor"],
  ["Ecológicos", "Amigables"],
];

type Pictures = { small?: string; medium?: string; original?: string };
type StocksurVariant = {
  id: string | number;
  sku: string;
  stock_available: string | number | null;
  net_price: string | null;
  list_price: string | null;
  picture?: Pictures | null;
  detail_picture?: Pictures | null;
  other_pictures?: Pictures[] | null;
  color?: { name?: string } | null;
};
type StocksurRawProduct = {
  id: string | number;
  code: string;
  name: string;
  description: string | null;
  categories: { id: number; name: string }[];
  variants: StocksurVariant[];
};
type StocksurResponse = {
  products: StocksurRawProduct[];
  meta: { pagination: { total_pages: number } };
};

let cache: { data: Product[]; fetchedAt: number } | null = null;
let inflight: Promise<Product[]> | null = null;

function rubroDe(raw: StocksurRawProduct): string | null {
  const names = new Set(raw.categories.map((c) => c.name.trim()));
  return RUBROS.find(([stocksur]) => names.has(stocksur))?.[1] ?? null;
}

function hasStock(v: StocksurVariant): boolean {
  return Number(v.stock_available ?? 0) > 0;
}

function normalize(raw: StocksurRawProduct, categoria: string): Product | null {
  // Productos (o variantes) sin stock no se muestran; vuelven solos al reponerse.
  const variants = raw.variants.filter(hasStock);
  if (variants.length === 0) return null;

  // "medium" es una miniatura (~2 KB) que se ve borrosa en las tarjetas: se usa el
  // tamaño original y, solo si faltara, el medium.
  const best = (p?: Pictures | null) => p?.original || p?.medium;
  const urls = (v: StocksurVariant) =>
    [best(v.picture), best(v.detail_picture), ...(v.other_pictures ?? []).map(best)].filter(
      (u): u is string => !!u,
    );
  const all = variants.flatMap(urls);
  const image = all[0] ?? "";

  return {
    id: `stocksur-${raw.code}`,
    sku: raw.code,
    name: raw.name,
    topCategory: categoria,
    category: categoria,
    description: raw.description?.trim() ?? "",
    notes: [],
    image,
    images: Array.from(new Set(all)).filter((u) => u !== image),
    source: "stocksur",
    tiers: variants.map((v) => ({
      label: v.color?.name?.trim() || v.sku,
      price: Number(v.net_price ?? v.list_price ?? 0),
    })),
    tiersLabel: "Variantes disponibles (Color)",
  };
}

async function fetchPage(token: string, page: number): Promise<StocksurResponse> {
  const url = `${API_BASE}?auth_token=${encodeURIComponent(token)}&page_size=${PAGE_SIZE}&page_number=${page}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  // No se loguea la URL: lleva el token.
  if (!res.ok) throw new Error(`Stocksur API respondió ${res.status} (página ${page})`);
  return (await res.json()) as StocksurResponse;
}

function refresh(): Promise<Product[]> {
  if (inflight) return inflight;

  inflight = (async () => {
    const token = process.env["STOCKSUR_API_TOKEN"];
    if (!token) {
      console.error("STOCKSUR_API_TOKEN no está configurada.");
      return cache?.data ?? [];
    }

    try {
      const first = await fetchPage(token, 1);
      const totalPages = first.meta.pagination.total_pages;
      const rest = await Promise.all(
        Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => fetchPage(token, i + 2)),
      );
      const data = [first, ...rest]
        .flatMap((r) => r.products)
        .flatMap((raw) => {
          const categoria = rubroDe(raw);
          const product = categoria ? normalize(raw, categoria) : null;
          return product ? [product] : [];
        });
      cache = { data, fetchedAt: Date.now() };
      return data;
    } catch (error) {
      console.error(
        "Error consultando la API de Stocksur:",
        error instanceof Error ? error.message : "desconocido",
      );
      return cache?.data ?? [];
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

export const fetchStocksurProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Product[]> => {
    if (!cache) return refresh();
    if (Date.now() - cache.fetchedAt >= CACHE_TTL_MS) void refresh();
    return cache.data;
  },
);

// Precalienta el caché al arrancar el servidor.
void refresh();
