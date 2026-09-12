import { Boxes, MessageCircle, Palette, RefreshCw } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: Palette,
    color: "text-magenta",
    t: "Personalización real",
    d: "Sublimación, serigrafía, bordado y grabado láser: elegimos la técnica que mejor rinde para tu logo.",
  },
  {
    icon: Boxes,
    color: "text-cyan",
    t: "Pedidos de gran volumen",
    d: "Producción estable desde 1.000 unidades, con control de calidad y plazos comprometidos.",
  },
  {
    icon: MessageCircle,
    color: "text-leaf",
    t: "Atención directa por WhatsApp",
    d: "Hablas con una persona, no con un formulario. Respuesta rápida durante todo el proceso.",
  },
  {
    icon: RefreshCw,
    color: "text-lavender",
    t: "Catálogo siempre actualizado",
    d: "Incorporamos nuevos productos cada temporada para que tu regalo corporativo no se repita.",
  },
];

export function ValueProps() {
  return (
    <section id="nosotros" className="bg-background pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow text-leaf">Por qué elegirnos</p>
          <h2 className="display-title mt-3 max-w-2xl text-3xl sm:text-5xl">
            Un socio de merchandising, no solo un proveedor
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 110}>
              <div className="card-lift h-full rounded-3xl border border-border bg-card p-7">
                <it.icon size={26} className={it.color} />
                <h3 className="mt-5 font-semibold">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
