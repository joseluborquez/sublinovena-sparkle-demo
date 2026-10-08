import { Reveal } from "./Reveal";
import type { WorkPhoto } from "@/data/work-photos";

export function WorkPhotoCard({ photo, delay = 0 }: { photo: WorkPhoto; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="card-lift group relative aspect-square overflow-hidden rounded-2xl border border-border bg-white">
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </Reveal>
  );
}
