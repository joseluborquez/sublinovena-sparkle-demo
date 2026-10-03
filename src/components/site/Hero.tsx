import { Reveal } from "./Reveal";
import { HeroCarousel, type HeroSlide } from "./HeroCarousel";
import heroOficina from "@/assets/hero/hero-oficina.jpg";
import heroFinDeAno from "@/assets/hero/hero-fin-de-ano.jpg";
import heroFeria from "@/assets/hero/hero-feria.jpg";

const slides: HeroSlide[] = [
  {
    image: heroOficina,
    eyebrow: "Merchandising corporativo · Chile",
    title: "Tu marca, presente todos los días",
    subtitle:
      "Lanyards, tazones y libretas con tu logo — personalización real, sin mínimos gigantes.",
    ctaLabel: "Ver catálogo",
    cta: { type: "link", href: "#catalogo" },
    align: "left",
  },
  {
    image: heroFinDeAno,
    eyebrow: "Regalos corporativos de fin de año",
    title: "Cierra el año agradeciendo a tu equipo",
    subtitle: "Sets de regalo personalizados con tu logo, listos antes de Navidad.",
    ctaLabel: "Cotizar regalos de fin de año",
    cta: { type: "quote", product: "Regalos corporativos de fin de año" },
    align: "right",
  },
  {
    image: heroFeria,
    eyebrow: "Ferias y eventos corporativos",
    title: "Que tu marca destaque en cada evento",
    subtitle: "Credenciales, mochilas y pendones personalizados para tu próximo stand.",
    ctaLabel: "Ver catálogo",
    cta: { type: "link", href: "#catalogo" },
    align: "left",
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink pb-16 sm:pb-20">
      <HeroCarousel slides={slides} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal delay={200}>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4 lg:max-w-none">
            {[
              ["+150", "productos en catálogo"],
              ["13", "categorías de productos"],
              ["100%", "personalizable"],
              ["+50", "clientes nos califican con 5 estrellas en Google"],
            ].map(([big, small]) => (
              <div key={small}>
                <dt className="text-brand-gradient text-3xl font-bold sm:text-5xl">{big}</dt>
                <dd className="mt-2 text-sm uppercase tracking-wide text-white/65">{small}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
