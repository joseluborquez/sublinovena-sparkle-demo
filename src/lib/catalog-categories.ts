import type { Product } from "@/data/products";

export type TopCategory = { name: string; slug: string; count: number; image: string };

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Las categorías propias mantienen su orden curado; las que llegan de Imblasco
// (sin ese orden) se agregan después, de mayor a menor cantidad de productos.
export function buildTopCategories(
  allProducts: Product[],
  localCategoryOrder: readonly string[],
): TopCategory[] {
  const counts = new Map<string, number>();
  // Primera foto encontrada de cada categoría — es la imagen representativa de la tarjeta.
  const images = new Map<string, string>();
  for (const p of allProducts) {
    counts.set(p.topCategory, (counts.get(p.topCategory) ?? 0) + 1);
    if (!images.has(p.topCategory) && p.image) images.set(p.topCategory, p.image);
  }

  const ordered = localCategoryOrder.filter((c) => counts.has(c));
  const extra = Array.from(counts.keys())
    .filter((c) => !localCategoryOrder.includes(c))
    .sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));

  return [...ordered, ...extra].map((name) => ({
    name,
    slug: slugify(name),
    count: counts.get(name) ?? 0,
    image: images.get(name) ?? "",
  }));
}

export function findTopCategoryBySlug(
  allProducts: Product[],
  localCategoryOrder: readonly string[],
  slug: string,
): TopCategory | undefined {
  return buildTopCategories(allProducts, localCategoryOrder).find((c) => c.slug === slug);
}
