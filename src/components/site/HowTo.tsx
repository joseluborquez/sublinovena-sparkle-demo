import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import tazonBlanco from "@/assets/products/tazon-blanco-325cc.png";
import sublinovenaLogo from "@/assets/sublinovena-logo-full.png";
import mockupTazaLogo from "@/assets/howto/mockup-taza-logo.jpg";
import entregaCamion from "@/assets/howto/entrega-camion.jpg";

type Step = {
  title: string;
  description: string;
  image: string;
  alt: string;
  fill?: boolean;
};

export const steps: Step[] = [
  {
    title: "Elige tu producto",
    description:
      "Revisa el catálogo y elige lo que te interesa: tazones, lanyards, botellas y más, desde pocas unidades.",
    image: tazonBlanco,
    alt: "Tazón blanco sin personalizar",
  },
  {
    title: "Sube tu logo",
    description:
      "Nos envías tu archivo y preparamos una propuesta gráfica con la técnica de impresión ideal para cada producto.",
    image: sublinovenaLogo,
    alt: "Logo de Sublinovena",
    fill: true,
  },
  {
    title: "Aprobamos el muestrario",
    description:
      "Te mostramos el mockup con tu logo aplicado y, si lo necesitas, una muestra física antes de producir todo el pedido.",
    image: mockupTazaLogo,
    alt: "Tazón con el logo aplicado, mockup de aprobación",
    fill: true,
  },
  {
    title: "Producción y entrega",
    description: "Fabricamos tu pedido y coordinamos la entrega en todo Chile.",
    image: entregaCamion,
    alt: "Caja de despacho con el logo de Sublinovena y un furgón de reparto",
    fill: true,
  },
];

export function HowTo() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const isLast = active === steps.length - 1;

  if (!step) return null;

  return (
    <section id="como-cotizar" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <h2 className="display-title mt-3 max-w-2xl text-4xl text-white sm:text-6xl">
            Un proceso de compra simple
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mt-16 flex items-center">
            {steps.map((s, i) => {
              const state = i < active ? "done" : i === active ? "active" : "upcoming";
              return (
                <li key={s.title} className="flex flex-1 items-center last:flex-none">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={state === "active"}
                    aria-label={`Paso ${i + 1}: ${s.title}`}
                    className="group flex flex-col items-center gap-3"
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-full border-2 text-base font-bold sm:size-16 sm:text-lg ${
                        state === "upcoming"
                          ? "border-white/20 text-white/40 transition-colors group-hover:border-white/40"
                          : "border-transparent bg-[image:var(--gradient-brand)] bg-[length:180%_100%] bg-[position:0%_50%] text-ink shadow-[var(--shadow-brand)] transition-[background-position,transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[position:100%_50%] group-hover:-translate-y-0.5 group-hover:shadow-[0_22px_55px_-18px_color-mix(in_oklab,var(--brand-magenta)_70%,transparent)]"
                      }`}
                    >
                      {state === "done" ? <Check size={22} /> : i + 1}
                    </span>
                    <span
                      className={`hidden max-w-[9rem] text-center text-sm font-medium sm:block ${
                        state === "upcoming" ? "text-white/40" : "text-white/85"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                  {i < steps.length - 1 && (
                    <span
                      className={`mx-2 h-0.5 flex-1 rounded-full transition-colors sm:mx-4 ${
                        i < active ? "bg-[image:var(--gradient-brand)]" : "bg-white/15"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={200}>
          <div className="card-lift mt-12 grid gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur sm:grid-cols-[280px_1fr] sm:items-center sm:p-12">
            <div
              className={`mx-auto flex size-[220px] shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:size-[280px] ${
                step.fill ? "bg-ink" : "bg-white p-7"
              }`}
            >
              <img src={step.image} alt={step.alt} className="size-full object-contain" />
            </div>

            <div>
              <span className="text-brand-gradient text-sm font-bold uppercase tracking-widest">
                Paso {active + 1} de {steps.length}
              </span>
              <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{step.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/65">{step.description}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="btn-ghost-brand disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowLeft size={17} /> Atrás
                </button>
                {isLast ? (
                  <a href="#catalogo" className="btn-brand">
                    Ver catálogo <ArrowRight size={17} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                    className="btn-brand"
                  >
                    Siguiente <ArrowRight size={17} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
