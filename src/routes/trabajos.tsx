import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { TrabajosRealizados } from "@/components/site/TrabajosRealizados";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { siteConfig } from "@/lib/site-config";

const title = `Trabajos realizados | ${siteConfig.name}`;
const description =
  "Muestra real de pedidos de merchandising corporativo entregados a empresas, colegios, clínicas, municipalidades y emprendimientos en Temuco y la Región de La Araucanía.";

export const Route = createFileRoute("/trabajos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteConfig.url}/trabajos` },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.url}/trabajos` }],
  }),
  component: TrabajosPage,
});

function TrabajosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8 lg:pt-10">
        <TrabajosRealizados />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
