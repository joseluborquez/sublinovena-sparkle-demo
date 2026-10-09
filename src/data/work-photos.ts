const photoModules = import.meta.glob("../assets/trabajos/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const captions: Record<string, string> = {
  "bolsas-que-nadie-se-quede": "Pines y llaveros personalizados",
  "botellas-vidrio-souvenir": "Botellas de vidrio souvenir",
  "labiales-personalizados": "Labiales promocionales",
  "lanyards-aiep": "Lanyards con credencial",
  "lapices-personalizados": "Lápices publicitarios",
  "llaveros-botella-azul": "Llaveros personalizados",
  "pines-orsocom-seguridad": "Pines para campaña de seguridad",
  "pines-redondos": "Pines redondos personalizados",
  "set-regalo-eusebio-hernandez": "Set de regalo: bolsa, tazón y llaveros",
  "tarjetas-getch": "Tarjetas PVC con QR",
  "tarjetas-novenagas": "Tarjetas de presentación",
  "libretas-palahueque-cesfam": "Libretas ecológicas con bolígrafo",
  "libretas-barrio-los-sauces": "Libretas corporativas para programa municipal",
  "folletos-seminario-pesca-carahue": "Folletos para seminario municipal",
  "poleron-taller-artes-escenicas": "Polerón bordado para taller artístico",
  "polera-polo-astro-ufro": "Poleras polo para grupo universitario",
  "polera-temuco-municipio-ciudadano": "Poleras para municipio",
  "tarjetas-novenagas-2": "Tarjetas de presentación corporativas",
  "banners-nacimiento-reciclaje": "Banners informativos para municipalidad",
  "gorro-temuco-municipio-ciudadano": "Gorro trucker para municipio",
  "bolsas-escuela-adventista-trovolhue": "Bolsas de cordón para colegio",
  "tumbler-maqui-botanico": "Tumbler térmico con diseño botánico",
  "mate-lago-ranco-vinculos": "Mate personalizado para programa social",
  "soporte-celular-viraliza-malleco": "Soporte de celular en bambú",
  "calendarios-iglesia-galvarino": "Calendarios de bolsillo para iglesia",
  "llaveros-espacio-amigable": "Llaveros redondos personalizados",
  "pulseras-espacio-amigable-rauco": "Pulseras de silicona personalizadas",
  "shaker-desafio-fitness-vilcun": "Shaker deportivo para evento municipal",
  "tote-omil-melipeuco": "Bolsa tote para oficina municipal",
  "tote-temuco-artesanos-mapuche": "Bolsa tote para agrupación de artesanos",
  "letrero-sernatur-araucania": "Letrero institucional para oficina regional",
  "lapices-fica-ufro": "Lápices publicitarios para facultad universitaria",
  "botella-vinculos-los-lagos-negra": "Botella térmica para programa municipal",
  "botella-vinculos-los-lagos-azul": "Botella térmica para programa municipal",
  "lanyards-hospital-lautaro": "Lanyards para unidad hospitalaria",
  "carpetas-umag-docencia": "Carpetas corporativas para universidad",
  "botellas-espacio-amigable": "Botellas deportivas personalizadas",
  "bolsas-senda-previene-renaico-1": "Bolsas para campaña de prevención",
  "bolsas-senda-previene-renaico-2": "Bolsas para campaña de prevención",
  "pines-trashumantes-teatro-sur": "Pines personalizados para compañía de teatro",
};

export type WorkPhoto = { slug: string; src: string; caption: string };

// Estas quedan primero en la grilla (home y /trabajos); el resto sigue en orden alfabético.
const FEATURED_SLUGS = [
  "lanyards-hospital-lautaro",
  "lapices-fica-ufro",
  "lapices-personalizados",
  "letrero-sernatur-araucania",
  "libretas-barrio-los-sauces",
  "libretas-palahueque-cesfam",
  "llaveros-botella-azul",
  "llaveros-espacio-amigable",
];

const allPhotos: WorkPhoto[] = Object.entries(photoModules)
  .map(([path, src]) => {
    const slug = path.split("/").pop()!.replace(".jpg", "");
    return { slug, src, caption: captions[slug] ?? slug.replace(/-/g, " ") };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const featured = FEATURED_SLUGS.map((slug) => allPhotos.find((p) => p.slug === slug)).filter(
  (p): p is WorkPhoto => !!p,
);
const rest = allPhotos.filter((p) => !FEATURED_SLUGS.includes(p.slug));

export const workPhotos: WorkPhoto[] = [...featured, ...rest];
