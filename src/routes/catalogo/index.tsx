import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Navbar } from "@/components/site/Navbar";
import { CatalogHome } from "@/components/site/CatalogHome";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { siteConfig } from "@/lib/site-config";
import { safeFetchExternalProducts } from "@/lib/external-products";

const title = `Catálogo de merchandising corporativo | ${siteConfig.name}`;
const description =
  "Catálogo completo de merchandising corporativo con precios reales por cantidad: lanyards, tazones, botellas, vestuario y más de 150 productos personalizables con tu logo.";

export const Route = createFileRoute("/catalogo/")({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  loader: async () => {
    const externalProducts = await safeFetchExternalProducts();
    return { externalProducts };
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
  const { externalProducts } = Route.useLoaderData();

  return (
    <>
      <Navbar />
      <main className="pt-8 lg:pt-10">
        <CatalogHome externalProducts={externalProducts} />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
