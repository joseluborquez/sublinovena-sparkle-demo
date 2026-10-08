import { useEffect, useRef, type ReactNode } from "react";

// Inclinación 3D sutil que sigue el mouse, con un par de tarjetas de sombra
// apiladas detrás para dar sensación de profundidad a una imagen plana.

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: number;
  smoothing?: number;
};

export function TiltCard({ children, className = "", tilt = 10, smoothing = 0.12 }: TiltCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner || typeof window === "undefined") return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const canTrackPointer = finePointer && !reducedMotion;

    if (reducedMotion) return undefined;

    let frameId = 0;
    let active = false;
    const startTime = performance.now();
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const apply = () => {
      inner.style.transform = `rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg) translateZ(0)`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      active = true;
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.6), -1, 1);
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.6), -1, 1);
      target.x = -y * tilt;
      target.y = x * tilt;
    };

    const handlePointerLeave = () => {
      active = false;
      target.x = 0;
      target.y = 0;
    };

    if (canTrackPointer) {
      root.addEventListener("pointermove", handlePointerMove);
      root.addEventListener("pointerleave", handlePointerLeave);
    }

    const tick = (now: number) => {
      if (!active) {
        const elapsed = (now - startTime) / 1000;
        target.x = Math.sin(elapsed * 0.6) * tilt * 0.28;
        target.y = Math.cos(elapsed * 0.5) * tilt * 0.28;
      }
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      apply();
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (canTrackPointer) {
        root.removeEventListener("pointermove", handlePointerMove);
        root.removeEventListener("pointerleave", handlePointerLeave);
      }
      cancelAnimationFrame(frameId);
    };
  }, [tilt, smoothing]);

  return (
    <div ref={rootRef} className={`relative ${className}`} style={{ perspective: 900 }}>
      <div className="absolute inset-0 rotate-6 rounded-2xl bg-magenta/25 blur-[2px]" />
      <div className="absolute inset-0 -rotate-3 rounded-2xl bg-cyan/25 blur-[2px]" />
      <div
        ref={innerRef}
        className="relative size-full"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
