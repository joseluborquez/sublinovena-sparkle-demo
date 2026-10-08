import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlideCta = { type: "link"; href: string };

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

const SWIPE_THRESHOLD_PX = 40;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % slides.length) + slides.length) % slides.length;
      setIndex(next);
    },
    [slides.length],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    setPaused(false);
    if (startX === null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

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
      className="relative h-[520px] w-full touch-pan-y overflow-hidden sm:h-[600px] lg:h-[660px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
                  slide.align === "left"
                    ? "items-start text-left"
                    : "items-end text-right sm:ml-auto"
                }`}
              >
                <div className="mt-20 max-w-lg sm:mt-20">
                  <p
                    className={`eyebrow font-bold text-magenta transition-all delay-150 duration-700 ${
                      slide.align === "left" ? "text-left" : "text-right"
                    } ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  >
                    {slide.eyebrow}
                  </p>
                  {(() => {
                    const HeadingTag = i === 0 ? "h1" : "h2";
                    return (
                      <HeadingTag
                        className={`display-title mt-3 text-2xl text-white transition-all delay-200 duration-700 sm:mt-5 sm:text-5xl lg:text-6xl ${
                          active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                        style={{ lineHeight: 1.3 }}
                      >
                        {slide.title}
                      </HeadingTag>
                    );
                  })()}
                  <p
                    className={`mt-3 text-sm leading-relaxed text-white/75 transition-all delay-300 duration-700 sm:mt-5 sm:text-lg ${
                      slide.align === "left" ? "text-left" : "text-right"
                    } ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  >
                    {slide.subtitle}
                  </p>
                  <div
                    className={`mt-5 flex flex-wrap gap-3 transition-all delay-500 duration-700 sm:mt-8 ${
                      slide.align === "right" ? "justify-end" : ""
                    } ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  >
                    <a href={slide.cta.href} className="btn-brand">
                      {slide.ctaLabel} <ArrowRight size={17} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Diapositiva anterior"
            className="absolute left-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-ink/60 sm:left-5 sm:flex sm:size-11"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente diapositiva"
            className="absolute right-3 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-ink/60 sm:right-5 sm:flex sm:size-11"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

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
