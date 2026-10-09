import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const values = [
  "Comunicación",
  "Orientación al cliente",
  "Creatividad",
  "Profesionalismo",
  "Trabajo en equipo",
  "Adaptabilidad",
];

export function QuienesSomos() {
  return (
    <section id="nosotros" className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <Reveal>
          <h2 className="display-title mx-auto max-w-2xl text-3xl sm:text-5xl">
            Acerca de {siteConfig.name}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            {siteConfig.legalName} nace en 2022 en Temuco, con el propósito de vender artículos
            publicitarios y merchandising corporativo personalizado, con trato directo y sin perder
            de vista el detalle y la calidad. Hoy trabajamos con empresas, instituciones y personas
            de toda la Región de La Araucanía y el resto de Chile.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {values.map((v) => (
              <li
                key={v}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                {v}
              </li>
            ))}
          </ul>

          <Link to="/about" className="btn-brand mt-9 inline-flex">
            Conoce más sobre nosotros <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
