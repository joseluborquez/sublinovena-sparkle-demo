// Datos reales del negocio (Catálogo Sublinovena 2026). Única fuente de verdad:
// usar estos valores en vez de hardcodear teléfono/dirección/email en componentes.
export const siteConfig = {
  url: "https://sublinovena-sparkle-demo.lovable.app",
  name: "Sublinovena",
  legalName: "Sublinovena SpA",
  description:
    "Merchandising corporativo personalizado en Chile: lanyards, tazones, botellas, vestuario y más, desde 10 unidades con tu logo.",
  email: "sublinovena@gmail.com",
  phone: "+56956542568",
  whatsapp: "56956542568",
  instagram: "https://instagram.com/sublinovena",
  addresses: [
    { street: "Avenida Los Fundadores #180", city: "Temuco" },
    { street: "Dinamarca #723", city: "Temuco" },
  ],
} as const;

export function waLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
