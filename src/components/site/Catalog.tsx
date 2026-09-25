import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { categories, products } from "@/data/products";
import { useQuote } from "./QuoteProvider";
import { Reveal } from "./Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const clp = (n: number) => n.toLocaleString("es-CL");

export function Catalog() {
  const { open } = useQuote();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Todos");

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
          <p className="eyebrow text-magenta">Vitrina</p>
          <h2 className="display-title mt-3 text-3xl sm:text-5xl">Productos que se personalizan</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
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
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                    cat === c
                      ? "bg-brand-gradient border-transparent font-semibold text-ink"
                      : "border-border bg-card text-muted-foreground hover:border-lavender hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => {
            const fromPrice = p.tiers.reduce(
              (min, t) => (t.price < min ? t.price : min),
              p.tiers[0]?.price ?? 0,
            );
            return (
              <Reveal key={p.id} delay={(i % 4) * 90}>
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                  <Link to="/productos/$id" params={{ id: p.id }} className="contents">
                    <div className="relative aspect-square overflow-hidden bg-white">
                      <img
                        src={p.image}
                        alt={p.name}
                        width={800}
                        height={800}
                        loading="lazy"
                        className="size-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                      />
                      {p.tiers.length > 0 && (
                        <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                          Desde ${clp(fromPrice)} c/u
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-lavender">{p.category}</p>
                    <Link to="/productos/$id" params={{ id: p.id }} className="hover:text-magenta">
                      <h3 className="font-semibold leading-snug">{p.name}</h3>
                    </Link>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{p.description}</p>

                    {p.tiers.length > 0 && (
                      <Accordion type="single" collapsible className="-mb-1 mt-auto">
                        <AccordionItem value="precios" className="border-none">
                          <AccordionTrigger className="rounded-xl bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:no-underline">
                            Precios por cantidad
                          </AccordionTrigger>
                          <AccordionContent className="px-1 pb-2 pt-1">
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {p.tiers.map((t) => (
                                <li key={t.label} className="flex items-center justify-between gap-2">
                                  <span>{t.label}</span>
                                  <span className="font-medium text-foreground">${clp(t.price)} c/u</span>
                                </li>
                              ))}
                            </ul>
                            {p.notes.length > 0 && (
                              <ul className="mt-2 space-y-1 border-t border-border pt-2 text-[11px] text-muted-foreground">
                                {p.notes.map((n) => (
                                  <li key={n}>{n}</li>
                                ))}
                              </ul>
                            )}
                            <p className="mt-2 text-[11px] text-muted-foreground">Valores + IVA.</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    <button
                      onClick={() => open(p.name)}
                      className="w-full rounded-full border border-border py-2.5 text-sm font-semibold transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-gradient group-hover:text-ink"
                    >
                      Cotizar
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
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
