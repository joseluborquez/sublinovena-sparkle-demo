import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Navbar } from "@/components/site/Navbar";
import { CatalogHome } from "@/components/site/CatalogHome";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { siteConfig } from "@/lib/site-config";
import { fetchImblascoProducts } from "@/lib/imblasco";

const title = `Catálogo de merchandising corporativo | ${siteConfig.name}`;
const description =
  "Catálogo completo de merchandising corporativo con precios reales por cantidad: lanyards, tazones, botellas, vestuario y más de 150 productos personalizables con tu logo.";

export const Route = createFileRoute("/catalogo/")({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  loader: async () => {
    const imblascoProducts = await fetchImblascoProducts();
    return { imblascoProducts };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteConfig.url}/catalogo` },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.url}/catalogo` }],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  const { imblascoProducts } = Route.useLoaderData();

  return (
    <>
      <Navbar />
      <main className="pt-8 lg:pt-10">
        <CatalogHome imblascoProducts={imblascoProducts} />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
