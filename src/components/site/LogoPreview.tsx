import { Sparkles } from "lucide-react";
import taza from "@/assets/prod-taza.jpg";
import { Reveal } from "./Reveal";

export function LogoPreview() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium">
            <Sparkles size={14} className="text-magenta" />
            Próximamente
          </div>
          <h2 className="display-title mt-5 text-3xl sm:text-5xl">
            Previsualiza tu logo antes de cotizar
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Estamos preparando una herramienta para que subas tu logo y veas cómo queda sobre el
            producto en segundos, antes de pedir la cotización. Esta vista es solo ilustrativa.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-muted-foreground">
            {["Sube tu archivo", "Ajusta posición", "Descarga el mockup"].map((x) => (
              <span key={x} className="rounded-full border border-border bg-card px-4 py-2">
                {x}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="rule-brand absolute inset-x-0 top-0" />
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={taza}
                alt="Mockup de taza corporativa con logo de cliente"
                width={800}
                height={800}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="bg-brand-gradient animate-sheen rounded-2xl px-6 py-4 shadow-[var(--shadow-brand)]">
                  <p className="text-lg font-bold uppercase tracking-[0.3em] text-ink">Acme</p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-ink/70">Group</p>
                </div>
              </div>
            </div>
            <p className="px-2 py-4 text-center text-xs text-muted-foreground">
              Vista conceptual · logo de cliente ficticio
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
