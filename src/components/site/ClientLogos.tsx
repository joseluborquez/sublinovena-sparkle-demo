import { Reveal } from "./Reveal";

const logoModules = import.meta.glob("../../assets/clients/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const names: Record<string, string> = {
  "a-c-servicios": "A&C Servicios",
  aiep: "AIEP",
  "ambulancias-araucania": "Ambulancias Araucanía",
  "ambulancias-asa": "Ambulancias ASA",
  "cb-crest": "Colegio CB",
  "clinica-icos": "Clínica ICOS",
  "colegio-centenario-temuco": "Colegio Centenario de Temuco",
  colmevet: "COLMEVET",
  "cubamed-loncoche": "Cubamed Loncoche",
  duovet: "DUOVET",
  "escuela-adventista-trovolhue": "Escuela Adventista Trovolhue",
  "escuela-futbol-loncoche-huachipato": "Escuela de Fútbol Loncoche Huachipato",
  "escuela-futbol-palestino": "Escuela de Fútbol Oficial Temuco Palestino",
  "escuela-padre-bartolome-las-casas": "Escuela Padre Bartolomé de las Casas",
  fitnesslife: "Fitnesslife",
  "for-life": "For Life",
  "fundacion-caritas-temuco": "Fundación Caritas Temuco",
  getnet: "Getnet",
  "golden-school-temuco": "Golden School Temuco",
  "green-house-school": "Green House School",
  "grupo-fep": "Grupo FEP",
  "lions-international": "Lions International",
  "marticorena-laboratorio": "Marticorena Laboratorio Clínico",
  "molino-viejo": "Molino Viejo",
  "moneda-cambios": "Moneda Cambios",
  "pizarro-constructora": "Pizarro Constructora",
  "ram-motors": "RAM Motors",
  rayssa: "Rayssa",
  "redsalud-mayor-temuco": "Clínica RedSalud Mayor de Temuco",
  "saint-patrick-school": "Saint Patrick School",
  siresa: "SIRESA",
  "universidad-autonoma-chile": "Universidad Autónoma de Chile",
  "universidad-catolica-temuco": "Universidad Católica de Temuco",
  ust: "UST",
  volcom: "Volcom",
  "volkanica-outdoors": "Volkanica Outdoors",
};

const logos = Object.entries(logoModules)
  .map(([path, src]) => {
    const slug = path.split("/").pop()!.replace(".png", "");
    return { slug, src, name: names[slug] ?? slug };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function ClientLogos() {
  const loop = [...logos, ...logos];

  return (
    <section className="border-y border-border bg-white py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-center text-base font-semibold uppercase tracking-[0.2em] text-ink/60">
            Empresas e instituciones que ya confían en nosotros
          </p>
        </Reveal>
      </div>

      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee-slow gap-14 group-hover:[animation-play-state:paused]">
          {loop.map((logo, i) => (
            <div
              key={`${logo.slug}-${i}`}
              className="flex h-16 w-40 shrink-0 items-center justify-center sm:h-20 sm:w-48"
            >
              <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
