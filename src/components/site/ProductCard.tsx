import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { waLink } from "@/lib/site-config";
import { Reveal } from "./Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const clp = (n: number) => n.toLocaleString("es-CL");

export function ProductCard({ product: p, delay = 0 }: { product: Product; delay?: number }) {
  const fromPrice = p.tiers.reduce(
    (min, t) => (t.price < min ? t.price : min),
    p.tiers[0]?.price ?? 0,
  );

  return (
    <Reveal delay={delay}>
      <article
        id={p.id}
        className="card-lift group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-border bg-card"
      >
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
          <p className="font-brand text-xs font-bold uppercase tracking-[0.2em] text-cyan">
            {p.category}
          </p>
          <Link to="/productos/$id" params={{ id: p.id }} className="hover:text-cyan">
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

          <a
            href={waLink(
              `Hola, vengo de la página web y quiero cotizar ${p.name}${p.sku ? ` (${p.sku})` : ""}`,
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-brand w-full"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </article>
    </Reveal>
  );
}
