import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useQuote } from "./QuoteProvider";
import { Reveal } from "./Reveal";
import DriftWall from "./DriftWall";

// Solo productos con foto real de proveedor (900px+), no las extraídas del
// PDF en baja resolución — esta lista se debe mantener sincronizada a mano
// con las rondas de reemplazo de fotos en src/assets/products.
const bgIds = [
  "lanyard-texturizado",
  "porta-credencial-de-acrilico",
  "yo-yo-portacredencial",
  "credencial-horizontal-o-vertical",
  "llavero-huincha-1-metro",
  "llavero-con-porta-foto-acrilico",
  "boligrafo-plastico-wind-stella",
  "tazon-de-bamboo-350cc",
  "tazon-mango-y-borde-de-color-325cc",
  "tazon-glass-empavonado-325cc",
  "tazon-ceramico-de-color-350-cc",
  "tazon-ceramico-330cc-fluorescente",
  "mug-de-bamboo-con-asa-plastica-400cc",
  "mug-termico-plastico-400cc",
  "mug-de-acero-inoxidable-400cc",
  "mug-metalico-plastico-synna-350cc",
  "mug-termico-big-800cc",
  "mug-shaker",
  "botella-bs-nino-aluminio-500cc",
  "botella-deportiva-aluminio-600cc",
  "botella-deportiva-aluminio-750cc",
  "botella-vidrio-borosilicato-tapa-bamboo-500cc",
  "botella-pet-600cc",
  "caramayola-deportiva-acero-inoxidable-800cc",
  "polera-algodon-unisex-variedad-de-colores",
  "polera-pique-unisex",
  "gorro-jockey-malla-ajustable",
  "gorro-jockey-algodon-full-color",
  "chapita-con-iman-y-destapador",
  "chapita-espejo-56-mm",
  "mochila-tipo-morral-sublimado",
  "mochila-tipo-morral-de-tnt",
  "bolsa-tnt-reutilizable-36-x-40-x-10-cm",
  "shopero-premium-empavonado-473cc",
];

const bgItems = bgIds
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
  .map((p) => ({ image: p.image }));

export function Hero() {
  const { open } = useQuote();

  return (
    <section id="top" className="relative overflow-hidden bg-ink pb-28 pt-36 sm:pb-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <DriftWall
          items={bgItems}
          columns={7}
          tileWidth={170}
          tileHeight={115}
          gap={14}
          tilt={12}
          turn={-10}
          perspective={1000}
          depth={100}
          speed={16}
          direction="up"
          variance={0.4}
          parallax={0}
          lift={0}
          fade={0.7}
          dim={0.3}
          overlayColor="#0F0D26"
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob animate-drift-a left-[-10%] top-[-15%] size-[38rem] bg-[var(--brand-violet)]" />
        <div className="blob animate-drift-b right-[-12%] top-[-5%] size-[30rem] bg-[var(--brand-cyan)]" />
        <div className="blob animate-drift-c bottom-[-25%] left-[25%] size-[34rem] bg-[var(--brand-magenta)]" />
        <div className="blob animate-drift-b bottom-[-10%] right-[10%] size-[18rem] bg-[var(--brand-lime)] opacity-30" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--ink)_92%)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
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
                ["+150", "productos en catálogo"],
                ["4", "unidades mínimas desde"],
                ["13", "categorías de productos"],
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
      </div>
    </section>
  );
}
