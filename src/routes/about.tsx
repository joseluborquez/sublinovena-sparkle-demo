import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { siteConfig } from "@/lib/site-config";

const title = `Quiénes somos | ${siteConfig.name}`;
const description =
  "Sublinovena SpA: fábrica de merchandising corporativo fundada en 2022 en Temuco. Conoce nuestra historia, misión, visión y valores.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteConfig.url}/about` },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.url}/about` }],
  }),
  component: AboutPage,
});

const values = [
  "Comunicación",
  "Orientación al cliente",
  "Creatividad",
  "Profesionalismo",
  "Trabajo en equipo",
  "Adaptabilidad",
];

function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <p className="eyebrow">Quiénes somos</p>
        <h1 className="display-title mt-3 text-3xl sm:text-5xl">Sobre {siteConfig.name}</h1>

        <p className="mt-6 leading-relaxed text-muted-foreground">
          {siteConfig.legalName} fue fundada en el año 2022 en la ciudad de Temuco por el ingeniero
          comercial Fernando Tabie Negue. Nos especializamos en la venta de artículos publicitarios
          y merchandising corporativo personalizado para empresas, instituciones y público en
          general de toda la Región de La Araucanía y el resto de Chile.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Desde nuestros inicios nos hemos posicionado como un actor importante en la industria del
          merchandising en el sur de Chile, con un catálogo de más de 150 productos (lanyards,
          tazones, botellas, vestuario corporativo, chapitas, pendones, bolsas y mochilas, entre
          otros) y una cartera de clientes que incluye empresas, colegios, universidades, clínicas y
          organismos públicos de la región.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Misión</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Nuestro propósito es entregar un servicio de personalización de primer nivel, a través de
          artículos publicitarios de calidad y con un férreo enfoque en los tiempos de respuesta, la
          comunicación y la atención al cliente.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Visión</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Posicionarnos como una empresa líder en soluciones publicitarias en la zona sur y sur
          austral de Chile, desde y para las personas.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Valores</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {values.map((v) => (
            <li
              key={v}
              className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
            >
              {v}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Dónde estamos</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Operamos desde Temuco, con dos direcciones en la ciudad:{" "}
          {siteConfig.addresses.map((a) => a.street).join(" y ")}. Trabajamos directo por WhatsApp,
          sin intermediarios, y despachamos a todo Chile.
        </p>
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
