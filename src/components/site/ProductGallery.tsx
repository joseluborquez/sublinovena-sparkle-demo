import { useState } from "react";

export function ProductGallery({
  main,
  gallery,
  alt,
}: {
  main: string;
  gallery: string[];
  alt: string;
}) {
  const images = [main, ...gallery];
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-white">
        <img src={images[selected] ?? main} alt={alt} className="size-full object-contain p-2" />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Ver foto ${i + 1} de ${alt}`}
              className={`size-16 shrink-0 overflow-hidden rounded-xl border bg-white transition-colors ${
                i === selected ? "border-cyan" : "border-border hover:border-cyan/50"
              }`}
            >
              <img src={img} alt="" loading="lazy" className="size-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
