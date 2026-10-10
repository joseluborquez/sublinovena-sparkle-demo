import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/data/products";
import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";

const PREVIEW_CATEGORY_COUNT = 8;

// Un producto por categoría (hasta 8 categorías distintas) para que el home
// muestre variedad real en vez de los primeros N productos del mismo rubro.
function buildPreview() {
  const picked: typeof products = [];
  for (const cat of categories) {
    if (cat === "Todos" || picked.length >= PREVIEW_CATEGORY_COUNT) continue;
    const match = products.find((p) => p.category === cat);
    if (match) picked.push(match);
  }
  return picked;
}

export function CatalogPreview() {
  const preview = buildPreview();

  return (
    <section id="catalogo" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="display-title text-center text-3xl sm:text-5xl">
            Catálogo de merchandising corporativo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Una selección de nuestro catálogo. Cada pieza se produce con tu logo, tus colores y tu
            acabado.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={(i % 4) * 90} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex justify-center">
            <Link to="/catalogo" className="btn-brand">
              Ver catálogo completo <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
