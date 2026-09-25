import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { blogPosts, type BlogBlock } from "@/data/blog-posts";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site-config";
import { QuoteProvider } from "@/components/site/QuoteProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsappFab } from "@/components/site/WhatsappFab";

const dateFmt = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const post = loaderData;
    const canonical = `${siteConfig.url}/blog/${post.slug}`;

    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: post.title,
      description: post.description,
      keywords: post.keywords.join(", "),
      url: canonical,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      inLanguage: "es-CL",
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: { "@type": "ImageObject", url: `${siteConfig.url}/favicon.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    };

    return {
      meta: [
        { title: `${post.title} | ${siteConfig.name}` },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        { property: "article:published_time", content: post.publishedAt },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      ],
    };
  },
  component: BlogPostPage,
});

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-semibold tracking-tight">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 text-lg font-semibold">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground marker:text-magenta">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-4 border-magenta pl-4 italic text-foreground">
          {block.text}
        </blockquote>
      );
    case "p":
    default:
      return <p className="mt-4 leading-relaxed text-muted-foreground">{block.text}</p>;
  }
}

function BlogPostPage() {
  const post = Route.useLoaderData();
  const related = products
    .filter((p) => (post.relatedCategories as string[]).includes(p.category))
    .slice(0, 4);

  return (
    <QuoteProvider>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-10 lg:px-8 lg:py-16">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
        >
          <Link to="/" className="hover:text-foreground">
            Inicio
          </Link>
          <ChevronRight size={12} />
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{post.title}</span>
        </nav>

        <article className="mt-6">
          <span className="w-fit rounded-full bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-lavender">
            {post.tag}
          </span>
          <h1 className="display-title mt-4 text-3xl sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {dateFmt(post.publishedAt)} · {post.readingMinutes} min de lectura
          </p>

          <div className="mt-2">
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="display-title text-xl">Productos relacionados</h2>
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

        <div className="mt-12">
          <Link to="/blog" className="text-sm font-semibold text-magenta hover:underline">
            ← Volver al blog
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsappFab />
    </QuoteProvider>
  );
}
