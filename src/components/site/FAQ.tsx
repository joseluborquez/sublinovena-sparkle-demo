import { Reveal } from "./Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "¿Cuál es la cantidad mínima de pedido?",
    answer:
      "Depende del producto: poleras y polerones desde 4 unidades, tazones y botellas desde 10-12 unidades, chapitas y llaveros desde 10 unidades, libretas ecológicas desde 25 unidades, mochilas desde 50 unidades. Pendones y telas PVC no tienen mínimo, se cotizan por pieza.",
  },
  {
    question: "¿Los precios del catálogo incluyen IVA?",
    answer: "No, todos los precios publicados son + IVA.",
  },
  {
    question: "¿El precio incluye el diseño y el estampado del logo?",
    answer:
      "En la mayoría de los productos sí, pero varía según el artículo — algunos como las credenciales no lo incluyen. Te confirmamos el detalle exacto al cotizar tu producto por WhatsApp.",
  },
  {
    question: "¿Hacen despacho a todo Chile?",
    answer: "Sí. Fabricamos tu pedido y coordinamos la entrega en todo Chile.",
  },
  {
    question: "¿Puedo pedir una muestra antes de producir todo el pedido?",
    answer:
      "En los productos que lo permiten, te mostramos primero un mockup con tu logo aplicado y, si lo necesitas, una muestra física antes de producir el pedido completo.",
  },
  {
    question: "¿Cuánto demora la producción?",
    answer:
      "Varía según el producto, la técnica de personalización y la cantidad — se confirma al cotizar. En temporada alta (octubre a diciembre) los plazos se alargan, así que conviene cotizar con anticipación.",
  },
  {
    question: "¿Dónde están ubicados?",
    answer:
      "Somos una fábrica de merchandising corporativo en Temuco, Chile, con dos direcciones: Avenida Los Fundadores #180 y Dinamarca #723.",
  },
  {
    question: "¿Cómo cotizo un producto?",
    answer:
      "Eliges el producto que te interesa en el catálogo y cotizas directo por WhatsApp con la cantidad que necesitas — te respondemos con el precio real, sin formularios ni esperas.",
  },
];

export function FAQ() {
  return (
    <section id="preguntas-frecuentes" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <h2 className="display-title text-3xl sm:text-5xl">Preguntas frecuentes</h2>
          <p className="mt-4 text-muted-foreground">
            Lo que más nos preguntan antes de cotizar. Si tu duda no está aquí, escríbenos por
            WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
