import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    t: "Eliges los productos",
    d: "Revisa la vitrina y marca lo que te interesa. Te asesoramos según tu presupuesto y ocasión.",
  },
  {
    n: "02",
    t: "Nos envías tu logo",
    d: "Recibimos tu archivo y preparamos una propuesta gráfica con las técnicas de impresión ideales.",
  },
  {
    n: "03",
    t: "Aprobamos el muestrario",
    d: "Te mostramos el mockup y, si lo necesitas, una muestra física antes de producir el pedido completo.",
  },
  {
    n: "04",
    t: "Producción y entrega",
    d: "Fabricamos tu pedido de 1.000+ unidades y coordinamos la entrega en todo Chile.",
  },
];

export function HowTo() {
  return (
    <section id="como-cotizar" className="relative overflow-hidden bg-ink py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob animate-drift-b left-[60%] top-[-20%] size-[26rem] bg-[var(--brand-violet)] opacity-40" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow">Cómo cotizar</p>
          <h2 className="display-title mt-3 max-w-2xl text-3xl text-white sm:text-5xl">
            Cuatro pasos, sin vueltas
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="card-lift h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
                <span className="text-brand-gradient text-3xl font-bold">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
