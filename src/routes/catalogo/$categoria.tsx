import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { categories, products } from "@/data/products";
import { buildTopCategories } from "@/lib/catalog-categories";
import { safeFetchImblascoProducts } from "@/lib/imblasco";
import { Navbar } from "@/components/site/Navbar";
import { CatalogCategory } from "@/components/site/CatalogCategory";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";
import { siteConfig } from "@/lib/site-config";

const localCategoryOrder = categories.filter((c) => c !== "Todos");

export const Route = createFileRoute("/catalogo/$categoria")({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  loader: async ({ params }) => {
    const imblascoProducts = await safeFetchImblascoProducts();
    const allProducts = [...products, ...imblascoProducts];
    const topCategories = buildTopCategories(allProducts, localCategoryOrder);
    const topCategory = topCategories.find((c) => c.slug === params.categoria);
    if (!topCategory) throw notFound();
    const categoryProducts = allProducts.filter((p) => p.topCategory === topCategory.name);
    return { categoryName: topCategory.name, categoryProducts, topCategories };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { categoryName } = loaderData;
    const title = `${categoryName} | Catálogo | ${siteConfig.name}`;
    const description = `Catálogo de ${categoryName.toLowerCase()} personalizados con tu logo. Cotiza directo por WhatsApp.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: CatalogCategoryPage,
});

function CatalogCategoryPage() {
  const { categoryName, categoryProducts, topCategories } = Route.useLoaderData();

  return (
    <>
      <Navbar />
      <main className="pt-8 lg:pt-10">
        <CatalogCategory
          categoryName={categoryName}
          products={categoryProducts}
          topCategories={topCategories}
        />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
