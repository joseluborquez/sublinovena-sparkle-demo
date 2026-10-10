import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { Product } from "@/data/products";
import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";
import { BackButton } from "./BackButton";

export function CatalogCategory({
  categoryName,
  products: categoryProducts,
}: {
  categoryName: string;
  products: Product[];
}) {
  const navigate = useNavigate({ from: "/catalogo/$categoria" });
  const urlSearch = useSearch({ from: "/catalogo/$categoria" });

  // Subcategorías reales dentro de esta categoría grande (ej. Imblasco). Si
  // todos los productos comparten el mismo valor que la categoría grande, no
  // hay nada que filtrar y se omite el selector.
  const subcategories = useMemo(() => {
    const unique = Array.from(new Set(categoryProducts.map((p) => p.category)));
    return unique.length > 1 || unique[0] !== categoryName
      ? unique.sort((a, b) => a.localeCompare(b))
      : [];
  }, [categoryProducts, categoryName]);

  const [query, setQuery] = useState(urlSearch.q ?? "");
  const [subcat, setSubcat] = useState<string>(
    urlSearch.sub && subcategories.includes(urlSearch.sub) ? urlSearch.sub : "Todas",
  );

  useEffect(() => {
    if (urlSearch.q !== undefined) setQuery(urlSearch.q);
  }, [urlSearch.q]);

  useEffect(() => {
    if (urlSearch.sub !== undefined) setSubcat(urlSearch.sub);
  }, [urlSearch.sub]);

  function selectSubcat(c: string) {
    setSubcat(c);
    navigate({
      search: (prev) => ({ ...prev, sub: c === "Todas" ? undefined : c }),
      replace: true,
    });
  }

  function updateQuery(value: string) {
    setQuery(value);
    navigate({
      search: (prev) => ({ ...prev, q: value.trim() === "" ? undefined : value }),
      replace: true,
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categoryProducts.filter(
      (p) =>
        (subcat === "Todas" || p.category === subcat) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.sku?.toLowerCase().includes(q) ?? false)),
    );
  }, [categoryProducts, query, subcat]);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <BackButton />

        <Reveal>
          <h2 className="display-title mt-6 text-center text-3xl sm:text-5xl">{categoryName}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            {categoryProducts.length} {categoryProducts.length === 1 ? "producto" : "productos"} en
            esta categoría.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xs">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder="Buscar producto…"
                className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-ring"
              />
            </div>

            {subcategories.length > 0 && (
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0">
                {["Todas", ...subcategories].map((c) => (
                  <button
                    key={c}
                    onClick={() => selectSubcat(c)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                      subcat === c
                        ? "bg-brand-gradient-slide border-transparent font-semibold text-ink shadow-[var(--shadow-brand)]"
                        : "border-border bg-card text-muted-foreground hover:border-cyan hover:text-foreground hover:shadow-[var(--shadow-brand)]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={(i % 4) * 90} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No encontramos productos con ese criterio.
          </p>
        )}
      </div>
    </section>
  );
}
