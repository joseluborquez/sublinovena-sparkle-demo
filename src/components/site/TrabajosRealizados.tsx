import { Reveal } from "./Reveal";

const photoModules = import.meta.glob("../../assets/trabajos/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const captions: Record<string, string> = {
  "banner-sabor-en-movimiento": "Banner roller para restaurante",
  "bloqueador-hermano-pascual": "Set de regalo corporativo",
  "bolsas-que-nadie-se-quede": "Pines y llaveros personalizados",
  "botellas-que-nadie-se-quede": "Botellas deportivas personalizadas",
  "botellas-vidrio-souvenir": "Botellas de vidrio souvenir",
  "chaleco-constructora-chiloe": "Chaleco corporativo bordado",
  "credenciales-doradas-bar": "Credenciales metálicas para personal",
  "gorro-corporacion-kutral": "Gorro trucker personalizado",
  "labiales-personalizados": "Labiales promocionales",
  "lanyards-aiep": "Lanyards con credencial",
  "lanyards-centros-negocios": "Lanyards con credencial",
  "lanyards-getch": "Lanyards personalizados",
  "lapices-personalizados": "Lápices publicitarios",
  "latas-souvenir-construccion": "Latas souvenir para constructora",
  "llaveros-botella-azul": "Llaveros personalizados",
  "mochilas-escuela-adventista": "Mochilas para colegio",
  "pines-orsocom-seguridad": "Pines para campaña de seguridad",
  "pines-redondos": "Pines redondos personalizados",
  "set-regalo-eusebio-hernandez": "Set de regalo: bolsa, tazón y llaveros",
  "tarjetas-getch": "Tarjetas PVC con QR",
  "tarjetas-novenagas": "Tarjetas de presentación",
  "tazones-universidad-frontera": "Tazones cerámicos personalizados",
  "tubos-serfoher": "Tubos souvenir personalizados",
};

const photos = Object.entries(photoModules)
  .map(([path, src]) => {
    const slug = path.split("/").pop()!.replace(".jpg", "");
    return { slug, src, caption: captions[slug] ?? slug.replace(/-/g, " ") };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function TrabajosRealizados() {
  return (
    <section id="trabajos" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow text-magenta">Nuestros trabajos</p>
          <h2 className="display-title mt-3 max-w-2xl text-3xl sm:text-5xl">
            Trabajos realizados
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65">
            Una muestra real de pedidos entregados a empresas, colegios, clínicas y
            emprendimientos en Temuco y la región.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 8) * 60}>
              <div className="card-lift group relative aspect-square overflow-hidden rounded-2xl border border-border bg-white">
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
