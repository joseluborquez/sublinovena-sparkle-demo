import { Reveal } from "./Reveal";
import MagicBento, { type BentoCardProps } from "./MagicBento";

const cards: BentoCardProps[] = [
  {
    color: "#1A1625",
    label: "Técnica",
    title: "Personalización real",
    description: "Sublimación, serigrafía, bordado y grabado láser: elegimos la técnica que mejor rinde para tu logo.",
  },
  {
    color: "#1A1625",
    label: "Cantidad",
    title: "Sin mínimos gigantes",
    description: "Pedidos desde 4 a 10 unidades según el producto, no desde 1.000 como otros proveedores.",
  },
  {
    color: "#1A1625",
    label: "Catálogo",
    title: "+150 productos con precio real",
    description: "Cada producto tiene su tabla de precios por tramo de cantidad, sin \"cotizar para saber\".",
  },
  {
    color: "#1A1625",
    label: "Ubicación",
    title: "Fábrica en Temuco",
    description: "Atención directa, sin intermediarios, y despacho más rápido para el sur de Chile.",
  },
  {
    color: "#1A1625",
    label: "Contacto",
    title: "Atención por WhatsApp",
    description: "Hablas con una persona, no con un formulario. Respuesta rápida durante todo el proceso.",
  },
  {
    color: "#1A1625",
    label: "Novedades",
    title: "Catálogo siempre actualizado",
    description: "Incorporamos productos nuevos cada temporada para que tu regalo corporativo no se repita.",
  },
];

export function ValueProps() {
  return (
    <section id="nosotros" className="bg-background pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow text-leaf">Por qué elegirnos</p>
          <h2 className="display-title mt-3 max-w-2xl text-3xl sm:text-5xl">
            Un socio de merchandising, no solo un proveedor
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <MagicBento cards={cards} glowColor="199, 65, 149" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
