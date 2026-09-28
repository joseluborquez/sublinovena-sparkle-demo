import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useQuote } from "./QuoteProvider";

export type HeroSlideCta =
  | { type: "link"; href: string }
  | { type: "quote"; product?: string };

export type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  cta: HeroSlideCta;
  align: "left" | "right";
};

const AUTOPLAY_MS = 6500;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const { open } = useQuote();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % slides.length) + slides.length) % slides.length;
      setIndex(next);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Destacados de Sublinovena"
      className="relative h-[540px] w-full overflow-hidden sm:h-[600px] lg:h-[660px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.image}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div
              className={`absolute inset-0 ${
                slide.align === "left"
                  ? "bg-gradient-to-r from-ink/95 via-ink/55 to-transparent"
                  : "bg-gradient-to-l from-ink/95 via-ink/55 to-transparent"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />

            <div className="absolute inset-0 mx-auto flex max-w-7xl px-5 lg:px-8">
              <div
                className={`flex w-full flex-col justify-center ${
                  slide.align === "left" ? "items-start text-left" : "items-end text-right sm:ml-auto"
                }`}
              >
                <div className="max-w-lg">
                  <p
                    className={`eyebrow transition-all delay-150 duration-700 ${
                      active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    {slide.eyebrow}
                  </p>
                  <h1
                    className={`display-title mt-5 text-3xl text-white transition-all delay-200 duration-700 sm:text-5xl lg:text-6xl ${
                      active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={`mt-5 text-base leading-relaxed text-white/75 transition-all delay-300 duration-700 sm:text-lg ${
                      active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                  <div
                    className={`mt-8 flex flex-wrap gap-3 transition-all delay-500 duration-700 ${
                      slide.align === "right" ? "justify-end" : ""
                    } ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  >
                    {slide.cta.type === "link" ? (
                      <a href={slide.cta.href} className="btn-brand">
                        {slide.ctaLabel} <ArrowRight size={17} />
                      </a>
                    ) : (
                      <button onClick={() => open(slide.cta.type === "quote" ? slide.cta.product : undefined)} className="btn-brand">
                        {slide.ctaLabel} <ArrowRight size={17} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            onClick={() => goTo(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
