import { Reveal } from "./Reveal";
import { WorkPhotoCard } from "./WorkPhotoCard";
import { BackButton } from "./BackButton";
import { workPhotos } from "@/data/work-photos";

export function TrabajosRealizados() {
  return (
    <section id="trabajos" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <BackButton />

        <Reveal>
          <h2 className="display-title mx-auto mt-6 max-w-2xl text-center text-3xl sm:text-5xl">
            Trabajos realizados
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-ink/65">
            Así quedaron algunos pedidos que ya entregamos a empresas, colegios, clínicas y
            emprendimientos de Temuco y la región.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {workPhotos.map((p, i) => (
            <WorkPhotoCard key={p.slug} photo={p} delay={(i % 8) * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
