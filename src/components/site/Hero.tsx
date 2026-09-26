import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useQuote } from "./QuoteProvider";
import { Reveal } from "./Reveal";
import DepthCarousel from "./DepthCarousel";

const showcaseIds = [
  "s-002",
  "s-022",
  "s-067",
  "s-091",
  "chapita-con-alfiler-metalico-de-37-56-o-58-mm",
  "mochila-tipo-morral-de-tnt",
];

const showcaseItems = showcaseIds
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
  .map((p) => ({ image: p.image, alt: p.name }));

export function Hero() {
  const { open } = useQuote();

  return (
    <section id="top" className="relative overflow-hidden bg-ink pb-28 pt-36 sm:pb-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob animate-drift-a left-[-10%] top-[-15%] size-[38rem] bg-[var(--brand-violet)]" />
        <div className="blob animate-drift-b right-[-12%] top-[-5%] size-[30rem] bg-[var(--brand-cyan)]" />
        <div className="blob animate-drift-c bottom-[-25%] left-[25%] size-[34rem] bg-[var(--brand-magenta)]" />
        <div className="blob animate-drift-b bottom-[-10%] right-[10%] size-[18rem] bg-[var(--brand-lime)] opacity-30" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--ink)_92%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:px-8">
        <div>
          <Reveal>
            <p className="eyebrow">Merchandising corporativo · Chile</p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="display-title mt-6 max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl">
              Merchandising corporativo que{" "}
              <span className="text-brand-gradient animate-sheen">representa tu marca</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Personalización real y control de calidad pieza por pieza, desde pocas unidades y sin
              mínimos gigantes. Tu logo, impecable, en manos de tu equipo y tus clientes.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#catalogo" className="btn-brand">
                Ver catálogo <ArrowRight size={17} />
              </a>
              <button onClick={() => open()} className="btn-ghost-brand">
                Cotizar ahora
              </button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4 lg:max-w-none">
              {[
                ["+120", "productos en catálogo"],
                ["4", "unidades mínimas desde"],
                ["11", "categorías de productos"],
                ["100%", "personalizable"],
              ].map(([big, small]) => (
                <div key={small}>
                  <dt className="text-brand-gradient text-2xl font-bold sm:text-3xl">{big}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-white/50">{small}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={250} className="lg:pl-4">
          <div className="h-[420px] sm:h-[480px] lg:h-[520px]">
            <DepthCarousel
              items={showcaseItems}
              cardWidth={240}
              cardHeight={300}
              autoplay
              autoplayDelay={3400}
              tint="#151029"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
