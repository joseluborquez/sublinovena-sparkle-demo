import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/blog-posts";
import { siteConfig } from "@/lib/site-config";
import { QuoteProvider } from "@/components/site/QuoteProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";

const title = "Blog | Sublinovena";
const description =
  "Guías sobre merchandising corporativo, precios reales por producto y recomendaciones para empresas en Temuco y todo Chile.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${siteConfig.url}/blog` },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.url}/blog` }],
  }),
  component: BlogIndex,
});

const dateFmt = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function BlogIndex() {
  const posts = [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <QuoteProvider>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <p className="eyebrow text-magenta">Recursos</p>
        <h1 className="display-title mt-3 text-3xl sm:text-5xl">Blog Sublinovena</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Guías con precios reales de nuestro catálogo: qué producto conviene según tu presupuesto,
          cantidades mínimas y recomendaciones para empresas en Temuco y el resto de Chile.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="card-lift group flex h-full flex-col gap-3 rounded-3xl border border-border bg-card p-6"
            >
              <span className="w-fit rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-lavender">
                {post.tag}
              </span>
              <h2 className="text-lg font-semibold leading-snug group-hover:text-magenta">
                {post.title}
              </h2>
              <p className="line-clamp-3 text-sm text-muted-foreground">{post.description}</p>
              <p className="mt-auto pt-2 text-xs text-muted-foreground">
                {dateFmt(post.publishedAt)} · {post.readingMinutes} min de lectura
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsappFab />
    </QuoteProvider>
  );
}
