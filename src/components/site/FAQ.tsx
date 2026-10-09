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
    question: "¿El precio del producto incluye el estampado o impresión?",
    answer:
      "Sí, el precio considera el estampado o impresión, sin embargo se debe tener en consideración que el precio puede variar si el tipo o tamaño del estampado o impresión varía o excede lo estipulado. Es importante solicitar una cotización con el ejecutivo.",
  },
  {
    question: "¿El precio considera el servicio de diseño?",
    answer:
      "En la gran mayoría de los productos no se considera el servicio de diseño. Es importante solicitar una cotización con el ejecutivo.",
  },
  {
    question: "¿Hacen despacho a todo Chile?",
    answer: "Sí. Fabricamos tu pedido y coordinamos la entrega en todo Chile.",
  },
  {
    question: "¿Cuánto demora la producción?",
    answer:
      "Varía según el producto, la técnica de personalización y la cantidad, y se confirma al cotizar. En temporada alta (octubre a diciembre) los plazos se alargan, así que conviene cotizar con anticipación.",
  },
  {
    question: "¿Dónde están ubicados?",
    answer:
      "Somos una fábrica de merchandising corporativo en Temuco, Chile, con dos direcciones: Avenida Los Fundadores #180 y Dinamarca #723.",
  },
  {
    question: "¿Cómo cotizo un producto?",
    answer:
      "Eliges el producto que te interesa en el catálogo y cotizas directo por WhatsApp con la cantidad que necesitas. Te respondemos con el precio real, sin formularios ni esperas.",
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
