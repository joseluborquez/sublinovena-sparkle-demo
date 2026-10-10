import { useMemo, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { categories, products, type Product } from "@/data/products";
import { buildTopCategories } from "@/lib/catalog-categories";
import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";
import { BackButton } from "./BackButton";

export function CatalogHome({ imblascoProducts }: { imblascoProducts: Product[] }) {
  const navigate = useNavigate({ from: "/catalogo/" });
  const urlSearch = useSearch({ from: "/catalogo/" });
  const [query, setQuery] = useState(urlSearch.q ?? "");

  const allProducts = useMemo(() => [...products, ...imblascoProducts], [imblascoProducts]);

  const topCategories = useMemo(
    () =>
      buildTopCategories(
        allProducts,
        categories.filter((c) => c !== "Todos"),
      ),
    [allProducts],
  );

  function updateQuery(value: string) {
    setQuery(value);
    navigate({
      search: (prev) => ({ ...prev, q: value.trim() === "" ? undefined : value }),
      replace: true,
    });
  }

  const trimmedQuery = query.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!trimmedQuery) return [];
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmedQuery) ||
        p.category.toLowerCase().includes(trimmedQuery) ||
        p.topCategory.toLowerCase().includes(trimmedQuery) ||
        (p.sku?.toLowerCase().includes(trimmedQuery) ?? false),
    );
  }, [allProducts, trimmedQuery]);

  return (
    <section id="catalogo" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <BackButton />

        <Reveal>
          <h2 className="display-title mt-6 text-center text-3xl sm:text-5xl">
            Catálogo de merchandising corporativo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Elige una categoría o busca directamente el producto que necesitas.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto mt-10 max-w-md">
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
        </Reveal>

        {trimmedQuery ? (
          <>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {searchResults.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={(i % 4) * 90} />
              ))}
            </div>
            {searchResults.length === 0 && (
              <p className="mt-16 text-center text-muted-foreground">
                No encontramos productos con ese criterio.
              </p>
            )}
          </>
        ) : (
          <Reveal delay={160}>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {topCategories.map((c) => (
                <Link
                  key={c.slug}
                  to="/catalogo/$categoria"
                  params={{ categoria: c.slug }}
                  className="card-lift group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    {c.image && (
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="size-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <span className="font-semibold leading-snug">{c.name}</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.count} {c.count === 1 ? "producto" : "productos"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
