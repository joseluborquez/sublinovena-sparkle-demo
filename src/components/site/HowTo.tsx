import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, PackageCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { useQuote } from "./QuoteProvider";
import tazonBlanco from "@/assets/products/tazon-blanco-325cc.png";
import sublinovenaLogo from "@/assets/sublinovena-logo-full.png";
import mockupTazaLogo from "@/assets/howto/mockup-taza-logo.jpg";

type Step = {
  title: string;
  description: string;
} & ({ image: string; alt: string } | { icon: typeof PackageCheck });

const steps: Step[] = [
  {
    title: "Elige tu producto",
    description:
      "Revisa la vitrina y elige lo que te interesa — tazones, lanyards, botellas y más, desde pocas unidades.",
    image: tazonBlanco,
    alt: "Tazón blanco sin personalizar",
  },
  {
    title: "Sube tu logo",
    description:
      "Nos envías tu archivo y preparamos una propuesta gráfica con la técnica de impresión ideal para cada producto.",
    image: sublinovenaLogo,
    alt: "Logo de Sublinovena",
  },
  {
    title: "Aprobamos el muestrario",
    description:
      "Te mostramos el mockup con tu logo aplicado y, si lo necesitas, una muestra física antes de producir todo el pedido.",
    image: mockupTazaLogo,
    alt: "Tazón con el logo aplicado, mockup de aprobación",
  },
  {
    title: "Producción y entrega",
    description: "Fabricamos tu pedido y coordinamos la entrega en todo Chile.",
    icon: PackageCheck,
  },
];

export function HowTo() {
  const [active, setActive] = useState(0);
  const { open } = useQuote();
  const step = steps[active];
  const isLast = active === steps.length - 1;

  if (!step) return null;

  return (
    <section id="como-cotizar" className="relative overflow-hidden bg-ink py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob animate-drift-b left-[60%] top-[-20%] size-[26rem] bg-[var(--brand-violet)] opacity-40" />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow">Cómo cotizar</p>
          <h2 className="display-title mt-3 max-w-2xl text-3xl text-white sm:text-5xl">
            Cuatro pasos, sin vueltas
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mt-14 flex items-center">
            {steps.map((s, i) => {
              const state = i < active ? "done" : i === active ? "active" : "upcoming";
              return (
                <li key={s.title} className="flex flex-1 items-center last:flex-none">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={state === "active"}
                    aria-label={`Paso ${i + 1}: ${s.title}`}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors sm:size-12 ${
                        state === "upcoming"
                          ? "border-white/20 text-white/40 group-hover:border-white/40"
                          : "border-transparent bg-[image:var(--gradient-brand)] text-ink"
                      }`}
                    >
                      {state === "done" ? <Check size={18} /> : i + 1}
                    </span>
                    <span
                      className={`hidden max-w-[7rem] text-center text-xs font-medium sm:block ${
                        state === "upcoming" ? "text-white/40" : "text-white/85"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                  {i < steps.length - 1 && (
                    <span
                      className={`mx-2 h-0.5 flex-1 rounded-full transition-colors sm:mx-3 ${
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
          <div className="card-lift mt-10 grid gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:grid-cols-[220px_1fr] sm:items-center sm:p-10">
            <div className="mx-auto flex size-[180px] shrink-0 items-center justify-center rounded-2xl bg-white p-6 sm:size-[220px]">
              {"image" in step ? (
                <img src={step.image} alt={step.alt} className="size-full object-contain" />
              ) : (
                <step.icon size={88} className="text-magenta" strokeWidth={1.4} />
              )}
            </div>

            <div>
              <span className="text-brand-gradient text-sm font-bold uppercase tracking-widest">
                Paso {active + 1} de {steps.length}
              </span>
              <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/65">{step.description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="btn-ghost-brand disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={17} /> Atrás
                </button>
                {isLast ? (
                  <button type="button" onClick={() => open()} className="btn-brand">
                    Cotizar ahora <ArrowRight size={17} />
                  </button>
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
