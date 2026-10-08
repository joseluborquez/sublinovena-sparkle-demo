// Contenido del blog. Cifras y mínimos citados aquí vienen de src/data/products.ts
// (extraídas del catálogo real) — al actualizar precios del catálogo, revisar si algún
// post cita un número que cambió.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  tag: string;
  publishedAt: string;
  readingMinutes: number;
  relatedCategories: string[];
  image: string;
  blocks: BlogBlock[];
};

type RawBlogPost = Omit<BlogPost, "image"> & { imageFile: string };

const imageModules = import.meta.glob("../assets/blog/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function resolveImage(filename: string): string {
  const match = Object.entries(imageModules).find(([path]) => path.endsWith(`/${filename}`));
  if (!match) throw new Error(`Imagen de blog no encontrada: ${filename}`);
  return match[1];
}

const rawBlogPosts: RawBlogPost[] = [
  {
    slug: "kits-de-identificacion-cual-elegir",
    imageFile: "kits-de-identificacion-cual-elegir.jpg",
    title: "Kits de identificación: diferencias entre el N°1, N°2 y N°3",
    description:
      "Comparamos los 3 kits de identificación de Sublinovena (lanyard + portacredencial + credencial): qué trae cada uno, las diferencias reales y cuál conviene según tu evento y presupuesto.",
    keywords: [
      "kit de identificación con logo",
      "kit credencial y lanyard precio",
      "diferencias kits de identificación",
    ],
    tag: "Producto",
    publishedAt: "2026-10-06",
    readingMinutes: 4,
    relatedCategories: ["Lanyards y Credenciales"],
    blocks: [
      {
        type: "p",
        text: "Si necesitas acreditar personal o asistentes a un evento, un kit de identificación te ahorra cotizar el lanyard, el portacredencial y la credencial por separado, y además sale más barato que comprar cada pieza por su lado. Pero tenemos 3 kits distintos en el catálogo y la pregunta que más nos hacen es cuál elegir. Esta es la diferencia real entre los tres.",
      },
      { type: "h2", text: "Lo que no cambia entre los tres kits" },
      {
        type: "p",
        text: "Los tres incluyen portacredencial + credencial impresa a una cara. El diseño de la credencial no está incluido en el precio, y si necesitas que se imprima a dos caras, se cobra $1.000 + IVA adicional por cada kit.",
      },
      { type: "h2", text: "Kit de identificación N°1: el estándar" },
      {
        type: "p",
        text: "Lanyard sublimado full color, cinta de poliéster de 2.5 cm de ancho x 50 cm de largo, con mosquetón metálico (sin broche de seguridad). Es la opción más simple: diseño sin límite de colores, para eventos corporativos y congresos donde no hace falta soltar el lanyard rápido. Desde 6 unidades, $5.900 c/u + IVA (6 a 99) bajando hasta $5.400 c/u + IVA (500 o más).",
      },
      { type: "h2", text: "Kit de identificación N°2: con broche de seguridad" },
      {
        type: "p",
        text: "Igual al N°1, pero con cinta de 55 cm y un broche tip top plástico que permite soltar el lanyard rápido si queda enganchado, un detalle que piden colegios, hospitales y plantas industriales. Desde 6 unidades, $6.900 c/u + IVA (6 a 99) bajando hasta $6.400 c/u + IVA (500 o más).",
      },
      { type: "h2", text: "Kit de identificación N°3: el más económico" },
      {
        type: "p",
        text: "Acá cambia el lanyard: es texturizado (no sublimado), estampado a un solo color en vez de full color, con broche tip top incluido y disponible en 14 colores de cinta para elegir. Es la opción para pedidos grandes con diseño simple, por ejemplo, solo el logo en un color. El mínimo es más alto que los otros dos: 50 unidades. Desde $4.000 c/u + IVA (50 a 99) bajando hasta $3.500 c/u + IVA (500 o más).",
      },
      { type: "h2", text: "Cuadro comparativo rápido" },
      {
        type: "ul",
        items: [
          "Diseño del lanyard: N°1 y N°2 son full color, sin límite de personalización; N°3 es a un color, con 14 colores de cinta para elegir.",
          "Broche de seguridad (tip top): lo incluyen el N°2 y el N°3; el N°1 no.",
          "Cantidad mínima: N°1 y N°2 desde 6 unidades; N°3 desde 50 unidades.",
          "Precio desde (pedidos de 500 o más unidades): N°3 $3.500 c/u, N°1 $5.400 c/u, N°2 $6.400 c/u, todos + IVA.",
        ],
      },
      { type: "h2", text: "¿Cuál elegir?" },
      {
        type: "p",
        text: "Pocas unidades y diseño full color: el N°1. Lo mismo pero con broche de seguridad: el N°2. Pedido grande con diseño simple: el N°3, de lejos el más conveniente en ese escenario. Y si igual quedaste con dudas, mándanos el tipo de evento y cuántas personas acreditas — en dos minutos te decimos cuál te conviene más.",
      },
    ],
  },
  {
    slug: "regalos-corporativos-temuco-guia",
    imageFile: "regalos-corporativos-temuco-guia.jpg",
    title: "Regalos corporativos en Temuco: guía completa para elegir merchandising que funcione",
    description:
      "Cómo elegir merchandising corporativo en Temuco y La Araucanía: qué productos rinden mejor, cuánto pedir y qué preguntar antes de cotizar.",
    keywords: [
      "regalos corporativos Temuco",
      "merchandising Temuco",
      "artículos publicitarios La Araucanía",
    ],
    tag: "Local",
    publishedAt: "2026-09-25",
    readingMinutes: 6,
    relatedCategories: ["Lanyards y Credenciales", "Tazones y Mugs", "Botellas y Termos"],
    blocks: [
      {
        type: "p",
        text: "La mayoría de las tiendas de regalos corporativos grandes están en Santiago: cotizas por formulario, esperas días de respuesta y el despacho a la Región de La Araucanía suma tiempo y costo de flete. Para una empresa en Temuco, Padre Las Casas, Villarrica o cualquier comuna de la región, trabajar con un proveedor local cambia los tiempos de entrega y la conversación: puedes coordinar por WhatsApp y, si hace falta, pasar a ver muestras.",
      },
      {
        type: "p",
        text: "Somos Sublinovena SpA, fábrica de merchandising corporativo fundada en 2022 acá en Temuco, con dos direcciones en la ciudad (Av. Los Fundadores #180 y Dinamarca #723). Llevamos un buen tiempo viendo qué funciona y qué no en pedidos de la región, así que va directo: lo que te conviene tener claro antes de cotizar.",
      },
      { type: "h2", text: "1. Define el objetivo antes que el producto" },
      {
        type: "p",
        text: 'El error más común es elegir el producto "bonito" antes de definir para qué se va a usar. No es lo mismo un regalo de bienvenida para un colaborador nuevo (algo que se usa a diario: taza, botella, libreta) que un obsequio para un cliente en una reunión puntual (algo con más percepción de valor: botella térmica, kit de identificación) o merchandising para un evento masivo (lo que se entrega en volumen: lanyards, chapitas, bolsas).',
      },
      { type: "h2", text: "2. Los productos que más se piden en la región" },
      {
        type: "ul",
        items: [
          "Lanyards y credenciales: para congresos, ferias y eventos institucionales, muy pedidos por universidades e instituciones públicas de la zona.",
          "Tazones y mugs personalizados: el clásico regalo de bienvenida u onboarding, con estampado full color.",
          "Botellas y termos corporativos: buena rotación entre empresas agrícolas, forestales y de servicios con equipos que trabajan en terreno.",
          "Vestuario corporativo (poleras, polerones, chalecos reflectantes, overoles): clave para rubros con personal en faena, como construcción, forestal o agro.",
        ],
      },
      { type: "h2", text: "3. No necesitas pedir 1.000 unidades" },
      {
        type: "p",
        text: "Muchos proveedores grandes trabajan con mínimos de 500 o 1.000 unidades, lo que deja afuera a pymes y equipos chicos. En nuestro catálogo, la mayoría de los productos parte desde cantidades bajas: poleras y polerones desde 4 unidades, tazones y botellas desde 10-12 unidades, chapitas y llaveros desde 10 unidades. Esto importa especialmente para empresas de la región con equipos de 10 a 50 personas, que no necesitan (ni quieren pagar) un mínimo pensado para una multinacional.",
      },
      { type: "h2", text: "4. Qué preguntar antes de cotizar" },
      {
        type: "ul",
        items: [
          "¿El precio incluye diseño y estampado, o se cobra aparte?",
          "¿Cuál es el tiempo de producción real (no el de despacho)?",
          "¿Hay recargo por tallas grandes o por impresión a dos caras/colores?",
          "¿Los precios son + IVA o con IVA incluido?",
        ],
      },
      {
        type: "p",
        text: 'Dato que sirve: si ya tienes algo en mente, salta directo al catálogo por categoría. Y si prefieres que te orientemos nosotros, escríbenos por WhatsApp con el producto y la cantidad. Nada de "a consultar" — cotizamos con el precio real, al tiro.',
      },
    ],
  },
  {
    slug: "cantidad-minima-regalos-corporativos-mitos-y-realidades",
    imageFile: "cantidad-minima-regalos-corporativos-mitos-y-realidades.jpg",
    title: "Cantidad mínima para regalos corporativos: mitos y realidades",
    description:
      "¿Es verdad que siempre hay que pedir mínimo 500 o 1.000 unidades? Revisamos mínimos reales por tipo de producto de merchandising en Chile.",
    keywords: [
      "cantidad mínima regalos corporativos",
      "mínimo de compra merchandising",
      "pedidos chicos artículos publicitarios",
    ],
    tag: "Guía de compra",
    publishedAt: "2026-09-18",
    readingMinutes: 5,
    relatedCategories: ["Vestuario y Ropa de Trabajo", "Tazones y Mugs", "Chapitas y Pulseras"],
    blocks: [
      {
        type: "p",
        text: 'Nos escriben seguido equipos chicos pidiendo disculpas de antemano por lo "poco" que necesitan: 20 poleras, 15 tazones. Y la verdad es que no hay nada que disculpar — la idea de que el merchandising corporativo siempre exige pedidos gigantes es uno de los mitos que más frena a pymes a la hora de personalizar algo con su marca.',
      },
      { type: "h2", text: 'Mito: "siempre hay que pedir cientos de unidades"' },
      {
        type: "p",
        text: "Es cierto para algunos productos (una tela publicitaria o un pendón se cotiza distinto, por metro cuadrado o por pieza, sin mínimo de cantidad). Pero para los productos personalizados con logo, que es donde suele estar la confusión, el mínimo real es mucho más bajo de lo que la mayoría asume.",
      },
      { type: "h2", text: "Mínimos reales por categoría (catálogo Sublinovena)" },
      {
        type: "ul",
        items: [
          "Poleras y polerones con logo: desde 4 unidades.",
          "Tazones y mugs personalizados: desde 10 unidades.",
          "Botellas y termos corporativos: desde 10-12 unidades.",
          "Chapitas, llaveros e imanes: desde 10 unidades.",
          "Libretas ecológicas con bolígrafo: desde 25 unidades.",
          "Mochilas y bolsos tipo morral: desde 50 unidades.",
          "Pendones y telas PVC: sin mínimo, se cotizan por pieza o metro cuadrado.",
        ],
      },
      { type: "h2", text: "¿Por qué existe mínimo en algunos productos y en otros no?" },
      {
        type: "p",
        text: "El mínimo depende de la técnica de personalización, no de un capricho comercial. El bordado o el estampado DTF en tela tiene un costo de preparación (matriz, calibración) que solo se justifica desde cierta cantidad; por eso el vestuario suele partir en 4-10 unidades y no en 1. En cambio, un pendón o una tela PVC se imprime pieza por pieza, así que no hay mínimo: puedes pedir uno solo.",
      },
      { type: "h2", text: "Qué hacer si necesitas menos que el mínimo" },
      {
        type: "p",
        text: 'Si tu cantidad quedó justo debajo del mínimo de algún producto, pregunta antes de resignarte. A veces se puede ajustar el precio unitario en vez de subir la cantidad, y otras veces hay una alternativa que calza mejor igual (chapitas o pines en vez de bordado en tela, por ejemplo). Mándanos el número exacto de personas o piezas y vemos qué opciones tienes — sin "redondear" el pedido para arriba porque sí.',
      },
    ],
  },
  {
    slug: "lanyards-personalizados-con-logo-guia",
    imageFile: "lanyards-personalizados-con-logo-guia.jpg",
    title: "Lanyards personalizados con logo: materiales, precios y para qué sirve cada tipo",
    description:
      "Sublimado, texturizado, con broche tip top: guía para elegir el lanyard correcto según tu evento o credencial, con precios reales desde 10 unidades.",
    keywords: [
      "lanyards personalizados con logo",
      "cordones porta credencial personalizados",
      "lanyard sublimado precio",
    ],
    tag: "Producto",
    publishedAt: "2026-09-11",
    readingMinutes: 5,
    relatedCategories: ["Lanyards y Credenciales"],
    blocks: [
      {
        type: "p",
        text: "El lanyard (cordón porta-credencial) es probablemente el artículo publicitario más pedido para eventos, congresos, ferias e instituciones: se ve todo el día, en el cuello de cada asistente, y su costo por unidad es bajo comparado con el resto del merchandising. Pero no todos los lanyards son iguales, y elegir el tipo correcto cambia tanto la durabilidad como el precio.",
      },
      { type: "h2", text: "Lanyard sublimado (el más usado)" },
      {
        type: "p",
        text: "Cinta de poliéster suave al tacto, con el diseño sublimado (no pegado ni impreso encima, sino integrado a la tela) y bordado con hilo de alta resistencia en los extremos. Incluye mosquetón metálico. Es la opción estándar para eventos corporativos, congresos y credenciales de personal. Precio desde $2.750 c/u + IVA para pedidos de 500 o más unidades, y desde 10 unidades como mínimo.",
      },
      { type: "h2", text: "Lanyard sublimado con broche tip top" },
      {
        type: "p",
        text: "Igual al anterior, pero con un broche de seguridad plástico (tip top) que permite soltar el lanyard rápido si queda enganchado, un detalle de seguridad que piden colegios, hospitales y plantas industriales. Precio desde $3.750 c/u + IVA en volumen.",
      },
      { type: "h2", text: "Lanyard texturizado" },
      {
        type: "p",
        text: "Cinta de poliéster grueso texturado, más económica, con estampado DTF textil a un color. Es la opción cuando el pedido es grande (mínimo 100 unidades, con tramos hasta 2.000+) y el diseño es simple, por ejemplo, solo el logo en un color. Precio desde $900 c/u + IVA en los tramos más altos.",
      },
      { type: "h2", text: "¿Con o sin credencial impresa?" },
      {
        type: "p",
        text: "Si además necesitas la credencial (no solo el cordón), existen kits de identificación que incluyen lanyard + portacredencial + credencial impresa en un solo precio, evitando cotizar cada pieza por separado. Es la opción más práctica para congresos y acreditación de eventos.",
      },
      {
        type: "p",
        text: "El diseño y el estampado van incluidos en el precio en los tres casos, así que no es un costo extra que aparece después. Dinos cuántas unidades necesitas y te confirmamos al toque en qué tramo de precio caes.",
      },
    ],
  },
  {
    slug: "tazones-mugs-publicitarios-para-empresas",
    imageFile: "tazones-mugs-publicitarios-para-empresas.jpg",
    title: "Tazones y mugs publicitarios: por qué siguen siendo el regalo corporativo más pedido",
    description:
      "Tazones cerámicos, con mango de color, térmicos o de bamboo: comparación de opciones y precios para elegir el mug publicitario correcto.",
    keywords: [
      "tazones publicitarios para empresas",
      "mugs personalizados con logo",
      "regalo corporativo taza",
    ],
    tag: "Producto",
    publishedAt: "2026-09-04",
    readingMinutes: 5,
    relatedCategories: ["Tazones y Mugs"],
    blocks: [
      {
        type: "p",
        text: "De los más de 120 productos de nuestro catálogo, la categoría de tazones y mugs es la más grande: más de 25 variantes distintas. Hay una razón simple: es el regalo corporativo con mejor relación entre costo, percepción de valor y uso diario. Una taza con el logo bien impreso se usa todos los días, en la oficina o en la casa, y eso es exposición de marca gratis y constante.",
      },
      { type: "h2", text: "Tazón cerámico blanco clásico" },
      {
        type: "p",
        text: "Capacidad 325cc, estampado en sublimación full color, incluye caja individual. La opción más económica y versátil, ideal para pedidos grandes de bienvenida o eventos internos. Desde $2.500 c/u + IVA en volumen (500+), desde 10 unidades como mínimo.",
      },
      { type: "h2", text: "Tazón con mango o interior de color" },
      {
        type: "p",
        text: 'Mismo formato, pero con el mango, el borde o el interior en un color a elección (más de 10 colores disponibles), útil para diferenciar equipos o áreas dentro de la misma empresa, o simplemente para que el regalo no se vea "genérico".',
      },
      { type: "h2", text: "Opciones premium: bamboo, cerámica enlozada, glass empavonado" },
      {
        type: "p",
        text: "Para regalos a clientes o directorio, donde el precio por unidad importa menos que la percepción de calidad, conviene subir a mugs de bamboo, cerámica enlozada o vidrio empavonado: mismo estampado full color, pero un acabado que se siente distinto al abrir la caja.",
      },
      { type: "h2", text: "Mugs térmicos de acero inoxidable" },
      {
        type: "p",
        text: "Para equipos que trabajan en terreno o pasan tiempo fuera de oficina, los mugs térmicos en acero inoxidable (desde 250cc hasta 1.200cc) mantienen la temperatura mucho más tiempo que la cerámica: un regalo que efectivamente se usa a diario, no que termina en un cajón.",
      },
      {
        type: "p",
        text: "Todos llevan tu logo en sublimación o DTF full color, así que la decisión real pasa por presupuesto y uso, no por técnica de impresión. Si te cuesta decidir, dinos cuántas unidades necesitas y para qué son, y te decimos cuál rinde más para ese caso puntual.",
      },
    ],
  },
  {
    slug: "botellas-termos-corporativos-cual-elegir",
    imageFile: "botellas-termos-corporativos-cual-elegir.jpg",
    title: "Botellas y termos corporativos: cuál elegir según tu presupuesto y uso",
    description:
      "Comparamos botellas de aluminio, acero inoxidable, plástico y vidrio para merchandising corporativo, con precios reales por tramo de cantidad.",
    keywords: [
      "botellas corporativas con logo",
      "termos personalizados para empresas",
      "botellas publicitarias Chile",
    ],
    tag: "Producto",
    publishedAt: "2026-08-28",
    readingMinutes: 5,
    relatedCategories: ["Botellas y Termos"],
    blocks: [
      {
        type: "p",
        text: "Después de los tazones, las botellas y termos son la categoría más grande de nuestro catálogo: casi 40 variantes entre aluminio, acero inoxidable, plástico y vidrio. Y casi nunca nos preguntan cuál se ve mejor — lo que realmente quieren saber es cuánto conviene gastar según para qué la va a usar la gente.",
      },
      { type: "h2", text: "Presupuesto ajustado, volumen alto: aluminio o plástico" },
      {
        type: "p",
        text: "Las botellas de aluminio (600-850cc) y las plásticas (700-800cc) son la opción más económica para pedidos grandes: eventos, ferias, regalos masivos de fin de año. Se personalizan en DTF UV full color y parten desde cantidades bajas (10-20 unidades según el modelo).",
      },
      { type: "h2", text: "Uso diario en oficina: acero inoxidable" },
      {
        type: "p",
        text: "Para un regalo que la persona realmente va a usar todos los días (de bienvenida, aniversario, o como parte de un kit ejecutivo), el acero inoxidable con doble pared aislante mantiene frío o caliente por horas. Hay opciones desde 450cc hasta termos grandes de 1.200cc, con distintos sistemas de tapa (click, rosca, bombilla para mate o té).",
      },
      { type: "h2", text: "Rubros con personal en terreno: deportivas y con bombilla" },
      {
        type: "p",
        text: "Para empresas agrícolas, forestales, de construcción o servicios en terreno, las botellas deportivas (tapa flip, boquilla) y las de bombilla (para mate, muy pedidas en el sur de Chile) tienen mejor recepción que una botella de escritorio: se ajustan a cómo la gente realmente las usa en el día a día.",
      },
      { type: "h2", text: "Un detalle que se nota: el color de la tapa" },
      {
        type: "p",
        text: "Varias de nuestras botellas de aluminio permiten elegir el color de la tapa por separado del cuerpo, un recurso simple para diferenciar áreas, sedes o simplemente para que el regalo combine con la paleta de tu marca sin subir el precio.",
      },
      {
        type: "p",
        text: "Si tienes un presupuesto por persona definido, dinos el número y el rubro de tu empresa y te proponemos 2-3 opciones concretas del catálogo, no una lista genérica.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-personalizar-poleras-con-logo",
    imageFile: "cuanto-cuesta-personalizar-poleras-con-logo.jpg",
    title: "¿Cuánto cuesta personalizar poleras y polerones con logo en Chile?",
    description:
      "Precios reales de poleras, polerones y vestuario corporativo con logo por tramo de cantidad, y qué factores suben o bajan el costo.",
    keywords: [
      "cuánto cuesta personalizar poleras con logo",
      "precio poleras corporativas con logo",
      "polerones con logo de empresa precio",
    ],
    tag: "Precios",
    publishedAt: "2026-08-21",
    readingMinutes: 5,
    relatedCategories: ["Vestuario y Ropa de Trabajo"],
    blocks: [
      {
        type: "p",
        text: "Es la pregunta más frecuente que recibimos y, a la vez, la más difícil de responder con un solo número, porque el precio de una polera o polerón con logo depende de varios factores, no solo de la cantidad. Aquí va el desglose real, con cifras de nuestro catálogo.",
      },
      { type: "h2", text: "El factor que más pesa: la cantidad" },
      {
        type: "p",
        text: "En poleras 100% algodón unisex, el precio parte en $9.500 c/u + IVA para pedidos de 4 a 19 unidades y baja a $7.600 c/u desde 300 unidades. En polerones de algodón felpa, el rango va de $16.000 c/u (4-19 unidades) a $13.900 c/u (300+). La curva no es lineal: los mayores saltos de precio ocurren entre los primeros tramos, así que si estás justo en el límite de un tramo (por ejemplo, 18 o 19 unidades), vale la pena preguntar si conviene subir a 20.",
      },
      { type: "h2", text: "Otros factores que cambian el precio" },
      {
        type: "ul",
        items: [
          "Tallas extendidas: 2XL y 3XL suelen tener un recargo de aprox. $1.000 + IVA por unidad.",
          "Número de colores del diseño: un diseño a un color es más barato que uno full color.",
          "Técnica de estampado: DTF textil full color (la más común hoy) vs. bordado. El bordado tiene un costo de matriz aparte (~$10.000 + IVA una vez).",
          "Tipo de prenda: polera básica vs. polera piqué (con cuello) vs. polar bordado vs. ropa técnica (dry-fit, softshell, parka impermeable). Cada una tiene su propia estructura de precio.",
        ],
      },
      { type: "h2", text: "Ropa de trabajo: un caso aparte" },
      {
        type: "p",
        text: 'Si lo que necesitas es vestuario para personal en terreno (chalecos reflectantes, overoles, chaquetas geólogo), el precio no compite con una polera de algodón: son prendas técnicas con norma de seguridad, tela más gruesa y cinta reflectiva, y el precio parte más arriba en consecuencia. Vale la pena separar mentalmente "merchandising" de "ropa de trabajo con norma": son necesidades distintas aunque ambas lleven tu logo.',
      },
      {
        type: "p",
        text: "Para una cotización exacta, lo más rápido es decirnos: prenda, cantidad aproximada, número de colores del diseño y si hay tallas extra grandes en el pedido. Con eso te damos el precio real, no un rango.",
      },
    ],
  },
  {
    slug: "ideas-regalos-corporativos-fin-de-ano",
    imageFile: "ideas-regalos-corporativos-fin-de-ano.jpg",
    title: "Ideas de regalos corporativos de fin de año para empresas en Chile",
    description:
      "Ideas de regalos de fin de año y Navidad para colaboradores y clientes, organizadas por presupuesto, con precios reales del catálogo.",
    keywords: [
      "regalos corporativos fin de año",
      "regalos de navidad para empresas",
      "ideas regalos empresariales Chile",
    ],
    tag: "Ideas",
    publishedAt: "2026-08-14",
    readingMinutes: 5,
    relatedCategories: ["Botellas y Termos", "Tazones y Mugs", "Vestuario y Ropa de Trabajo"],
    blocks: [
      {
        type: "p",
        text: 'Entre octubre y noviembre empiezan a llegar las primeras consultas de fin de año, y con ellas los primeros cuellos de botella de producción. Te dejamos esto ordenado por presupuesto aproximado por persona, para que lo lleves directo a la reunión donde te pidan "algo para el equipo" y no te pille en blanco.',
      },
      { type: "h2", text: "Presupuesto bajo (menos de $3.000 por persona)" },
      {
        type: "ul",
        items: [
          "Tazón cerámico blanco personalizado: desde $2.500 c/u en volumen.",
          "Chapitas o pines corporativos: desde $420 c/u en volumen, funcionan bien como detalle adicional dentro de un kit.",
          'Libreta ecológica con bolígrafo: desde $2.100 c/u en volumen, buena opción si además quieres algo "útil" y no solo decorativo.',
        ],
      },
      { type: "h2", text: "Presupuesto medio ($3.000 - $8.000 por persona)" },
      {
        type: "ul",
        items: [
          "Botella térmica de acero inoxidable: se percibe como un regalo real, no un souvenir.",
          "Polera o polerón con logo: desde $7.600 c/u en volumen, buena opción si el regalo se entrega en un evento donde la gente se lo puede poner ese mismo día.",
          "Kit combinado (taza + libreta, o botella + llavero): sube la percepción de valor sin subir tanto el costo por persona.",
        ],
      },
      { type: "h2", text: "Presupuesto alto / regalos a clientes clave" },
      {
        type: "ul",
        items: [
          "Termo o mug premium (bamboo, acero inoxidable grande, vidrio empavonado).",
          "Chaqueta softshell o polar bordado: para directorio o clientes estratégicos.",
          "Set armado a medida combinando 2-3 productos del catálogo con empaque conjunto.",
        ],
      },
      { type: "h2", text: "El error más caro de esta época: cotizar tarde" },
      {
        type: "p",
        text: "Diciembre es temporada alta para toda la industria del merchandising en Chile, y los tiempos de producción se alargan cuando todos piden al mismo tiempo. Si el regalo es para una fecha fija (fiesta de fin de año, aguinaldo, evento con clientes), lo ideal es cotizar y confirmar cantidad durante octubre, no la primera semana de diciembre.",
      },
      {
        type: "p",
        text: "Danos un número: presupuesto por persona y cuántas personas son. Con eso te armamos 2 o 3 combinaciones reales del catálogo, no una lista para que sigas buscando tú solo.",
      },
    ],
  },
  {
    slug: "articulos-publicitarios-para-eventos-y-ferias",
    imageFile: "articulos-publicitarios-para-eventos-y-ferias.jpg",
    title: "Artículos publicitarios para eventos y ferias: lo que no puede faltar",
    description:
      "Guía práctica de merchandising para congresos, ferias y activaciones: acreditación, entrega masiva y qué llevarse a la memoria del asistente.",
    keywords: [
      "artículos publicitarios para eventos y ferias",
      "merchandising para congresos",
      "credenciales y lanyards para eventos",
    ],
    tag: "Producto",
    publishedAt: "2026-08-07",
    readingMinutes: 5,
    relatedCategories: [
      "Lanyards y Credenciales",
      "Bolsas y Basureros para Auto",
      "Pendones y Telas PVC",
    ],
    blocks: [
      {
        type: "p",
        text: "Organizar un evento (congreso, feria, seminario, activación de marca) trae varias decisiones de merchandising que conviene pensar juntas desde el inicio, no ir cotizando pieza por pieza a última hora. Lo dividimos en tres momentos, que es como realmente se vive un evento: antes (señalética), durante (acreditación) y lo que la gente se lleva puesto o en la mano.",
      },
      { type: "h2", text: "Antes: señalética del lugar" },
      {
        type: "p",
        text: "Pendones roller (papel sintético o tela PVC, en formatos 80x200, 90x200 o 100x200 cm) y telas PVC con sellado perimetral y ojetillos para colgar o tensar. A diferencia del resto del merchandising, esto se cotiza por pieza o por metro cuadrado, sin mínimo de cantidad, así que puedes pedir solo lo que necesitas para el lugar del evento.",
      },
      { type: "h2", text: "Durante: acreditación" },
      {
        type: "p",
        text: "Esta es la parte donde más se nota si un evento está bien organizado. El kit típico es: lanyard sublimado + portacredencial + credencial impresa. Se puede cotizar como kit combinado en vez de tres cotizaciones separadas, lo que además sale más barato que comprar cada pieza por su lado. Si el evento requiere control de acceso por zonas (staff, prensa, VIP), los lanyards de distintos colores son la forma más simple de diferenciar sin imprimir credenciales distintas.",
      },
      { type: "h2", text: "Lo que se lleva el asistente" },
      {
        type: "ul",
        items: [
          "Bolsa reutilizable o tote bag: para juntar folletos, catálogos y cualquier material físico que se entregue.",
          "Libreta con bolígrafo: sigue funcionando bien en formatos donde la gente toma notas (seminarios, capacitaciones).",
          "Botella o mug: si el evento dura todo el día, es de los ítems con mejor recepción real (se usa ahí mismo, no solo en la casa después).",
        ],
      },
      { type: "h2", text: "Un detalle que se olvida: el tiempo de producción" },
      {
        type: "p",
        text: "A diferencia de un regalo corporativo con fecha flexible, un evento tiene fecha fija e innegociable. Define la cantidad de acreditaciones y el merchandising de entrega con al menos 3-4 semanas de anticipación, especialmente si el diseño necesita ajustes o hay más de un color de lanyard por tipo de acceso.",
      },
      {
        type: "p",
        text: "¿Estás armando el kit completo — señalética, acreditación y lo que se entrega? Pásanos la fecha y el número de asistentes. Eso basta para dejarte la cotización combinada lista.",
      },
    ],
  },
];

export const blogPosts: BlogPost[] = rawBlogPosts.map(({ imageFile, ...post }) => ({
  ...post,
  image: resolveImage(imageFile),
}));
