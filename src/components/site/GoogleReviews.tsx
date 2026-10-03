import { ExternalLink, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { GoogleIcon } from "./GoogleIcon";
import { siteConfig } from "@/lib/site-config";

const reviews = [
  {
    name: "Javiera Palacios",
    time: "Hace 10 meses",
    text: "Excelente servicio, 100% recomendado. El producto de muy buena calidad.",
  },
  {
    name: "Fernanda Dinamarca",
    time: "Hace 11 meses",
    text: "Excelente servicio, entrega en fecha acordada. Fernando, con quien nos comunicamos, siempre atento a resolver dudas y consultas. Como equipo quedamos enormemente agradecidas con el servicio, excelente calidad y diseño adecuado.",
  },
  {
    name: "Marcela Fuentealba",
    time: "Hace 9 meses",
    text: "Excelente servicio, muy profesional, detallista, rápido en la entrega de sus productos, responsable, y muy amable al realizar consultas. Responde al instante, con mucha paciencia… muy conforme con el trabajo realizado, 100% recomendable.",
  },
  {
    name: "Claudia Arriagada Fuentes",
    time: "Hace 10 meses",
    text: "Excelente servicio, muy responsables en la entrega de sus productos, además de la rapidez con que llegan siempre puntuales. Hemos trabajado en varias ocasiones con esta empresa y sus productos siempre llegan hermosos tal y como se solicitaron.",
  },
  {
    name: "Giselle Quelme Barra",
    time: "Hace 8 meses",
    text: "Excelente atención al cliente y productos de excelente calidad, tal cual se promocionan en el catálogo. Poco tiempo de espera y atención constante a las solicitudes del cliente. Sin duda volveremos a adquirir productos de la empresa.",
  },
  {
    name: "OMIL Melipeuco",
    time: "Hace 8 meses",
    text: "Queremos manifestar nuestra total satisfacción con la calidad de los productos entregados. Destacamos especialmente la rapidez en la ejecución, la excelente gestión y la comunicación permanente que mantuvieron con nosotros.",
  },
  {
    name: "Yohanina Muñoz",
    time: "Hace 7 meses",
    text: "Muy amables, claros y trabajan muy bien. Mi pedido quedó muy lindo.",
  },
  {
    name: "Isabel Valenzuela",
    time: "Hace 5 meses",
    text: "Excelente atención, su trabajo es de muy buena calidad y bonito.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-title max-w-2xl text-3xl sm:text-5xl">
              Lo que dicen en Google
            </h2>
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 transition-colors hover:border-magenta/40"
            >
              <GoogleIcon className="size-7 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-ink">5,0</span>
                  <Stars />
                </div>
                <span className="text-xs text-ink/55">57 reseñas en Google</span>
              </div>
              <ExternalLink size={16} className="text-ink/40" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 4) * 80}>
              <div className="card-lift flex h-full flex-col rounded-3xl border border-border bg-card p-6">
                <Stars />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">“{r.text}”</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  <p className="text-xs text-ink/45">{r.time} · Google</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
