import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { products, type Product } from "@/data/products";
import { siteConfig, waLink } from "@/lib/site-config";
import { QuoteProvider } from "@/components/site/QuoteProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";

const clp = (n: number) => n.toLocaleString("es-CL");
const absoluteImage = (image: string) =>
  image.startsWith("http") ? image : `${siteConfig.url}${image}`;

export const Route = createFileRoute("/productos/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const product = loaderData as Product;
    const title = `${product.name}${product.sku ? ` (${product.sku})` : ""} | ${siteConfig.name}`;
    const description = product.description.slice(0, 155);
    const canonical = `${siteConfig.url}/productos/${product.id}`;
    const fromPrice = product.tiers.reduce(
      (min, t) => (t.price < min ? t.price : min),
      product.tiers[0]?.price ?? 0,
    );

    const productJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonical}#product`,
      name: product.name,
      sku: product.sku ?? undefined,
      description: product.description,
      category: product.category,
      image: absoluteImage(product.image),
      url: canonical,
      brand: { "@type": "Brand", name: siteConfig.name },
      offers: {
        "@type": "Offer",
        url: canonical,
        priceCurrency: "CLP",
        price: fromPrice,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: siteConfig.legalName },
      },
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: product.category,
          item: `${siteConfig.url}/#catalogo`,
        },
        { "@type": "ListItem", position: 3, name: product.name, item: canonical },
      ],
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: absoluteImage(product.image) },
        { property: "product:price:amount", content: String(fromPrice) },
        { property: "product:price:currency", content: "CLP" },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(productJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const fromPrice = product.tiers.reduce(
    (min, t) => (t.price < min ? t.price : min),
    product.tiers[0]?.price ?? 0,
  );
  const waMessage = `Hola, quiero cotizar: ${product.name}${product.sku ? ` (${product.sku})` : ""}`;
  const router = useRouter();

  return (
    <QuoteProvider>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 pb-10 pt-28 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.history.back()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-lavender hover:text-foreground"
          >
            <ArrowLeft size={13} /> Volver
          </button>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Inicio
            </Link>
            <ChevronRight size={12} />
            <Link to="/" hash="catalogo" className="hover:text-foreground">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-white">
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="size-full object-contain p-2"
            />
          </div>

          <div>
            <p className="eyebrow text-magenta">{product.category}</p>
            <h1 className="display-title mt-3 text-3xl sm:text-4xl">{product.name}</h1>
            {product.sku && <p className="mt-1 text-sm text-muted-foreground">SKU: {product.sku}</p>}
            <p className="mt-4 text-lg font-semibold">Desde ${clp(fromPrice)} c/u + IVA</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            <a href={waLink(waMessage)} target="_blank" rel="noreferrer" className="btn-brand mt-6 inline-flex">
              Cotizar por WhatsApp
            </a>

            {product.tiers.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-lavender">
                  Precios por cantidad
                </h2>
                <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
                  {product.tiers.map((t) => (
                    <li key={t.label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                      <span className="text-muted-foreground">{t.label}</span>
                      <span className="font-semibold">${clp(t.price)} c/u</span>
                    </li>
                  ))}
                </ul>
                {product.notes.length > 0 && (
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {product.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-xs text-muted-foreground">Valores + IVA.</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="display-title text-2xl">Más en {product.category}</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/productos/$id"
                  params={{ id: p.id }}
                  className="card-lift group overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="size-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="p-3 text-xs font-medium leading-snug">{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <WhatsappFab />
    </QuoteProvider>
  );
}
