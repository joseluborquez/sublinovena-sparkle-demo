import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type { Product } from "@/data/products";
import type { TopCategory } from "@/lib/catalog-categories";
import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";
import { BackButton } from "./BackButton";

export function CatalogCategory({
  categoryName,
  products: categoryProducts,
  topCategories,
}: {
  categoryName: string;
  products: Product[];
  topCategories: TopCategory[];
}) {
  const navigate = useNavigate({ from: "/catalogo/$categoria" });
  const urlSearch = useSearch({ from: "/catalogo/$categoria" });

  const [query, setQuery] = useState(urlSearch.q ?? "");

  useEffect(() => {
    if (urlSearch.q !== undefined) setQuery(urlSearch.q);
  }, [urlSearch.q]);

  function updateQuery(value: string) {
    setQuery(value);
    navigate({
      search: (prev) => ({ ...prev, q: value.trim() === "" ? undefined : value }),
      replace: true,
    });
  }

  function goToCategory(slug: string) {
    navigate({ to: "/catalogo/$categoria", params: { categoria: slug } });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categoryProducts.filter(
      (p) =>
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.sku?.toLowerCase().includes(q) ?? false),
    );
  }, [categoryProducts, query]);

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

        <div className="mt-10 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          {/* Desktop: listado fijo de todas las categorías, siempre visible */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 max-h-[calc(100vh-8rem)] space-y-1 overflow-y-auto pr-1">
              {topCategories.map((c) => (
                <Link
                  key={c.slug}
                  to="/catalogo/$categoria"
                  params={{ categoria: c.slug }}
                  className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                    c.name === categoryName
                      ? "bg-brand-gradient-slide font-semibold text-ink shadow-[var(--shadow-brand)]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </aside>

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

                {/* Mobile/tablet: dropdown para saltar a otra categoría */}
                <select
                  value={topCategories.find((c) => c.name === categoryName)?.slug ?? ""}
                  onChange={(e) => goToCategory(e.target.value)}
                  className="w-full rounded-full border border-input bg-card px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-ring lg:hidden"
                >
                  {topCategories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
