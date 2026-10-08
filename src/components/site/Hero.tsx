import { HeroCarousel, type HeroSlide } from "./HeroCarousel";
import heroOficina from "@/assets/hero/hero-oficina.jpg";
import heroFinDeAno from "@/assets/hero/hero-fin-de-ano.jpg";
import heroFeria from "@/assets/hero/hero-feria.jpg";

const slides: HeroSlide[] = [
  {
    image: heroOficina,
    eyebrow: "Merchandising corporativo",
    title: "Tu marca, presente todos los días",
    subtitle:
      "Lanyards, tazones y libretas con tu logo. Calidad real, trato cercano y sin mínimos gigantes.",
    ctaLabel: "Ver catálogo",
    cta: { type: "link", href: "/catalogo" },
    align: "left",
  },
  {
    image: heroFinDeAno,
    eyebrow: "Regalos corporativos de fin de año",
    title: "Cierra el año agradeciendo a tu equipo",
    subtitle:
      "Sets de regalo con tu logo, pensados para que tu equipo se sienta valorado, listos antes de Navidad.",
    ctaLabel: "Ver regalos de fin de año",
    cta: { type: "link", href: "/catalogo" },
    align: "right",
  },
  {
    image: heroFeria,
    eyebrow: "Ferias y eventos corporativos",
    title: "Que tu marca destaque en cada evento",
    subtitle: "Credenciales, mochilas y pendones personalizados para tu próximo stand.",
    ctaLabel: "Ver catálogo",
    cta: { type: "link", href: "/catalogo" },
    align: "left",
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink">
      <HeroCarousel slides={slides} />
    </section>
  );
}
