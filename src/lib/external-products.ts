// Une los catálogos de todos los proveedores externos. Cada proveedor falla por
// separado: si uno cae, el catálogo sigue con los demás y los productos propios.
import type { Product } from "@/data/products";
import { safeFetchImblascoProducts } from "@/lib/imblasco";
import { fetchStocksurProducts } from "@/lib/stocksur";
import { fetchZecatProducts } from "@/lib/zecat";

async function safeFetchStocksurProducts(): Promise<Product[]> {
  try {
    return await fetchStocksurProducts();
  } catch (error) {
    console.error("fetchStocksurProducts falló, se omiten productos de Stocksur:", error);
    return [];
  }
}

async function safeFetchZecatProducts(): Promise<Product[]> {
  try {
    return await fetchZecatProducts();
  } catch (error) {
    console.error("fetchZecatProducts falló, se omiten productos de Zecat:", error);
    return [];
  }
}

export async function safeFetchExternalProducts(): Promise<Product[]> {
  // Los productos repetidos entre proveedores se muestran todos (cada uno con su id);
  // esto solo evita que un mismo id aparezca dos veces.
  const lists = await Promise.all([
    safeFetchImblascoProducts(),
    safeFetchStocksurProducts(),
    safeFetchZecatProducts(),
  ]);
  const seen = new Set<string>();
  return lists.flat().filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}
