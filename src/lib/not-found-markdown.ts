import { siteConfig } from "./site-config";

// Served instead of the HTML 404 page when a client asks for `Accept: text/markdown`
// (agents/crawlers probing for resources) — gives them a real 404 status plus a
// plain-text body pointing at where the real content actually lives.
export function renderNotFoundMarkdown(pathname: string): string {
  return `# 404 — Página no encontrada

La ruta \`${pathname}\` no existe en ${siteConfig.name}.

${siteConfig.description}

## Dónde encontrar lo que buscas

- Inicio y catálogo: ${siteConfig.url}/
- Blog: ${siteConfig.url}/blog
- Mapa del sitio: ${siteConfig.url}/sitemap.xml
- Índice para agentes (catálogo completo + precios): ${siteConfig.url}/llms.txt

## Contacto

- WhatsApp: ${siteConfig.phone}
- Email: ${siteConfig.email}
`;
}
