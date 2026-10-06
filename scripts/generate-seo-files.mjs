// Regenera public/sitemap.xml y public/llms.txt desde las fuentes de verdad
// (src/data/products.ts y src/data/blog-posts.ts) para que nunca queden desactualizados
// respecto al catálogo o al blog. Se ejecuta automáticamente antes de cada build
// ("prebuild" en package.json); también se puede correr a mano con `npm run seo:generate`.
import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const vite = await createServer({
  configFile: false,
  root: rootDir,
  resolve: { alias: { "@": path.resolve(rootDir, "src") } },
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: "custom",
  logLevel: "warn",
});

let siteConfig, products, categories, blogPosts;
try {
  ({ siteConfig } = await vite.ssrLoadModule("/src/lib/site-config.ts"));
  ({ products, categories } = await vite.ssrLoadModule("/src/data/products.ts"));
  ({ blogPosts } = await vite.ssrLoadModule("/src/data/blog-posts.ts"));
} finally {
  await vite.close();
}

const clp = (n) => n.toLocaleString("es-CL");
const fromPrice = (tiers) =>
  tiers.reduce((min, t) => (t.price < min ? t.price : min), tiers[0]?.price ?? 0);
const today = new Date().toISOString().slice(0, 10);

// ---- sitemap.xml ----
function urlEntry(loc, { changefreq, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const sitemapUrls = [
  urlEntry(`${siteConfig.url}/`, { changefreq: "weekly", priority: "1.0" }),
  urlEntry(`${siteConfig.url}/blog`, { changefreq: "weekly", priority: "0.8" }),
  ...blogPosts.map((p) =>
    urlEntry(`${siteConfig.url}/blog/${p.slug}`, { changefreq: "monthly", priority: "0.6" }),
  ),
  ...products.map((p) =>
    urlEntry(`${siteConfig.url}/productos/${p.id}`, { changefreq: "monthly", priority: "0.7" }),
  ),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`;

// ---- llms.txt ----
// Teléfono +56956542568 -> "+56 9 5654 2568"
const phoneDigits = siteConfig.phone.replace("+56", "");
const phonePretty = `+56 ${phoneDigits.slice(0, 1)} ${phoneDigits.slice(1, 5)} ${phoneDigits.slice(5)}`;

// Direcciones: si todas comparten ciudad, se agrupan con la ciudad al final (como "Av. X y Av. Y, Temuco")
const sameCity = siteConfig.addresses.every((a) => a.city === siteConfig.addresses[0].city);
const addressesLine = sameCity
  ? `${siteConfig.addresses.map((a) => a.street).join(" y ")}, ${siteConfig.addresses[0].city}`
  : siteConfig.addresses.map((a) => `${a.street}, ${a.city}`).join(" y ");

const instagramHandle = siteConfig.instagram.replace("https://instagram.com/", "@");

const lines = [];
lines.push(`# ${siteConfig.name}`);
lines.push("");
lines.push(
  `> Fábrica de merchandising corporativo en Temuco, Chile. Personalizamos ${products.length} productos (lanyards, tazones, botellas, vestuario, chapitas, pendones, bolsas y mochilas) con logo de empresas, desde pocas unidades y con precios por tramo de cantidad. Fundada en 2022 por Fernando Tabie Negue.`,
);
lines.push("");
lines.push(
  `Contacto: ${siteConfig.email} · WhatsApp ${phonePretty} · ${addressesLine} · Instagram ${instagramHandle}`,
);
lines.push("");
lines.push("## Catálogo");

for (const category of categories) {
  if (category === "Todos") continue;
  const inCategory = products.filter((p) => p.category === category);
  if (inCategory.length === 0) continue;
  lines.push("");
  lines.push(`### ${category}`);
  for (const p of inCategory) {
    const price =
      p.tiers.length > 0 ? `desde $${clp(fromPrice(p.tiers))} c/u + IVA` : "consultar precio";
    lines.push(`- [${p.name}](${siteConfig.url}/productos/${p.id}) — ${price}`);
  }
}

lines.push("");
lines.push("## Blog");
lines.push("");
for (const post of blogPosts) {
  lines.push(`- [${post.title}](${siteConfig.url}/blog/${post.slug})`);
}
lines.push("");

const llmsTxt = lines.join("\n");

await writeFile(path.join(rootDir, "public/sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(rootDir, "public/llms.txt"), llmsTxt, "utf8");

console.log(
  `✓ sitemap.xml (${sitemapUrls.length} URLs) y llms.txt (${products.length} productos, ${blogPosts.length} posts) regenerados.`,
);
process.exit(0);
