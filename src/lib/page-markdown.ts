import { siteConfig, waLink } from "./site-config";
import { products, categories, type Product } from "@/data/products";
import { blogPosts, type BlogBlock, type BlogPost } from "@/data/blog-posts";

// Markdown representations of the real pages, served instead of HTML when a client
// asks for `Accept: text/markdown` (agents/crawlers). Reuses the exact same data as
// the HTML routes so the two never drift apart.

const clp = (n: number) => n.toLocaleString("es-CL");
const fromPrice = (tiers: Product["tiers"]) =>
  tiers.reduce((min, t) => (t.price < min ? t.price : min), tiers[0]?.price ?? 0);

export function renderHomeMarkdown(): string {
  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    `Fábrica de merchandising corporativo en Temuco, Chile, fundada en 2022. Catálogo con ${products.length} productos personalizables con logo, desde pocas unidades, con precios reales por tramo de cantidad.`,
  );
  lines.push("");
  lines.push("## Categorías del catálogo");
  lines.push("");
  for (const category of categories) {
    if (category === "Todos") continue;
    const count = products.filter((p) => p.category === category).length;
    if (count === 0) continue;
    lines.push(`- ${category} (${count} productos)`);
  }
  lines.push("");
  lines.push("## Cómo cotizar");
  lines.push("");
  lines.push(
    "Elige un producto del catálogo y cotiza directo por WhatsApp con la cantidad que necesitas. No hay formulario: se responde con el precio real según el tramo de cantidad que corresponda.",
  );
  lines.push("");
  lines.push("## Recursos");
  lines.push("");
  lines.push(`- Catálogo completo: ${siteConfig.url}/catalogo`);
  lines.push(`- Catálogo con precios (para agentes): ${siteConfig.url}/llms.txt`);
  lines.push(`- Mapa del sitio: ${siteConfig.url}/sitemap.xml`);
  lines.push(`- Blog: ${siteConfig.url}/blog`);
  lines.push(`- Quiénes somos: ${siteConfig.url}/about`);
  lines.push(`- Contacto: ${siteConfig.url}/contact`);
  lines.push(`- Política de privacidad: ${siteConfig.url}/privacy`);
  lines.push("");
  lines.push("## Contacto");
  lines.push("");
  lines.push(`- WhatsApp: ${siteConfig.phone}`);
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(
    `- Direcciones: ${siteConfig.addresses.map((a) => `${a.street}, ${a.city}`).join(" · ")}`,
  );
  lines.push("");
  return lines.join("\n");
}

export function renderProductMarkdown(product: Product): string {
  const lines: string[] = [];
  lines.push(`# ${product.name}`);
  lines.push("");
  lines.push(`Categoría: ${product.category}`);
  lines.push("");
  lines.push(product.description);
  lines.push("");
  if (product.tiers.length > 0) {
    lines.push("## Precios por cantidad (+ IVA)");
    lines.push("");
    for (const t of product.tiers) {
      lines.push(`- ${t.label}: $${clp(t.price)} c/u`);
    }
    lines.push("");
  }
  if (product.notes.length > 0) {
    lines.push("## Notas");
    lines.push("");
    for (const n of product.notes) lines.push(`- ${n}`);
    lines.push("");
  }
  lines.push("## Cotizar");
  lines.push("");
  const message = `Hola, vengo de la página web y quiero cotizar ${product.name}${product.sku ? ` (${product.sku})` : ""}`;
  lines.push(`WhatsApp: ${waLink(message)}`);
  lines.push("");
  return lines.join("\n");
}

function blockToMarkdown(b: BlogBlock): string {
  switch (b.type) {
    case "h2":
      return `## ${b.text}`;
    case "h3":
      return `### ${b.text}`;
    case "ul":
      return b.items.map((i) => `- ${i}`).join("\n");
    case "quote":
      return `> ${b.text}`;
    case "p":
    default:
      return b.text;
  }
}

export function renderBlogPostMarkdown(post: BlogPost): string {
  const lines: string[] = [
    `# ${post.title}`,
    "",
    post.description,
    "",
    `Publicado: ${post.publishedAt}`,
    "",
  ];
  for (const b of post.blocks) {
    lines.push(blockToMarkdown(b));
    lines.push("");
  }
  return lines.join("\n");
}

export function renderBlogIndexMarkdown(): string {
  const lines: string[] = [`# Blog de ${siteConfig.name}`, "", siteConfig.description, ""];
  for (const post of blogPosts) {
    lines.push(`- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`);
  }
  lines.push("");
  return lines.join("\n");
}

export function renderMarkdownForPath(pathname: string): { body: string; status: number } | null {
  if (pathname === "/") return { body: renderHomeMarkdown(), status: 200 };
  if (pathname === "/blog" || pathname === "/blog/") {
    return { body: renderBlogIndexMarkdown(), status: 200 };
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const post = blogPosts.find((p) => p.slug === blogMatch[1]);
    return post ? { body: renderBlogPostMarkdown(post), status: 200 } : null;
  }

  const productMatch = pathname.match(/^\/productos\/([^/]+)\/?$/);
  if (productMatch) {
    const product = products.find((p) => p.id === productMatch[1]);
    return product ? { body: renderProductMarkdown(product), status: 200 } : null;
  }

  return null;
}
