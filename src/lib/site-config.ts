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
  googleReviewsUrl:
    "https://www.google.com/maps/place/Sublinovena/@-38.7411471,-72.5912481,17z/data=!3m1!4b1!4m6!3m5!1s0x9614d5581028c809:0x47ab4f7f9408c95a!8m2!3d-38.7411471!4d-72.5912481!16s%2Fg%2F11t_khksz0",
  addresses: [
    { street: "Avenida Los Fundadores #180", city: "Temuco" },
    { street: "Dinamarca #723", city: "Temuco" },
  ],
} as const;

export function waLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
