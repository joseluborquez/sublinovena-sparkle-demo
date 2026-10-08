import { useEffect, useMemo, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { categories, products } from "@/data/products";
import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";

export function Catalog() {
  const urlSearch = useSearch({ from: "/catalogo" });
  const [query, setQuery] = useState(urlSearch.q ?? "");
  const [cat, setCat] = useState<string>(
    urlSearch.cat && (categories as readonly string[]).includes(urlSearch.cat)
      ? urlSearch.cat
      : "Todos",
  );

  // La navbar busca o filtra por categoría navegando a /catalogo?q=...&cat=... —
  // sincronizamos el estado local cuando esos parámetros cambian.
  useEffect(() => {
    if (urlSearch.q !== undefined) setQuery(urlSearch.q);
  }, [urlSearch.q]);

  useEffect(() => {
    if (urlSearch.cat !== undefined) setCat(urlSearch.cat);
  }, [urlSearch.cat]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "Todos" || p.category === cat) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.sku?.toLowerCase().includes(q) ?? false)),
    );
  }, [query, cat]);

  return (
    <section id="catalogo" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="display-title text-center text-3xl sm:text-5xl">
            Catálogo de merchandising corporativo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Una selección de nuestro catálogo. Cada pieza se produce con tu logo, tus colores y tu
            acabado.
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar producto…"
                className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                    cat === c
                      ? "bg-brand-gradient-slide border-transparent font-semibold text-ink shadow-[var(--shadow-brand)]"
                      : "border-border bg-card text-muted-foreground hover:border-magenta hover:text-foreground hover:shadow-[var(--shadow-brand)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
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
