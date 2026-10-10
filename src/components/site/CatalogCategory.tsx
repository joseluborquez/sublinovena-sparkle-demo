import { useEffect, useMemo, useRef, useState } from "react";
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
  const gridRef = useRef<HTMLDivElement>(null);

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

  // Hace scroll hasta la grilla cuando cambia la subcategoría — en un rAF para
  // que corra después de que el router termine su propio manejo de scroll de
  // la navegación (que si no, lo pisa y deja la página "estática").
  const isFirstSubcat = useRef(true);
  useEffect(() => {
    if (isFirstSubcat.current) {
      isFirstSubcat.current = false;
      return;
    }
    const id = requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [subcat]);

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

  const hasSubcategories = subcategories.length > 0;

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

        <div
          className={`mt-10 ${hasSubcategories ? "lg:grid lg:grid-cols-[220px_1fr] lg:gap-8" : ""}`}
        >
          {/* Desktop: lista lateral de subcategorías */}
          {hasSubcategories && (
            <aside className="hidden lg:block">
              <nav className="sticky top-28 max-h-[calc(100vh-8rem)] space-y-1 overflow-y-auto pr-1">
                {["Todas", ...subcategories].map((c) => (
                  <button
                    key={c}
                    onClick={() => selectSubcat(c)}
                    className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
                      subcat === c
                        ? "bg-brand-gradient-slide font-semibold text-ink shadow-[var(--shadow-brand)]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </nav>
            </aside>
          )}

          <div>
            <Reveal delay={120}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
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

                {/* Mobile/tablet: dropdown de subcategorías */}
                {hasSubcategories && (
                  <select
                    value={subcat}
                    onChange={(e) => selectSubcat(e.target.value)}
                    className="w-full rounded-full border border-input bg-card px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-ring lg:hidden"
                  >
                    {["Todas", ...subcategories].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </Reveal>

            <div
              ref={gridRef}
              className={`mt-10 scroll-mt-28 grid grid-cols-1 gap-6 sm:grid-cols-2 ${
                hasSubcategories ? "lg:grid-cols-3" : "lg:grid-cols-4"
              }`}
            >
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
        </div>
      </div>
    </section>
  );
}
