"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Marquee infinito impulsado por motion (useAnimationFrame + MotionValue).
 * Al pasar el ratón por encima desacelera suavemente en lugar de pararse
 * en seco: la velocidad interpola hacia su objetivo en cada frame.
 */
export function Marquee({
  children,
  baseVelocity = 55,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  reverse?: boolean;
  className?: string;
}) {
  const x = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const velocity = useRef(baseVelocity);

  useAnimationFrame((_, delta) => {
    const width = contentRef.current?.offsetWidth ?? 0;
    if (!width) return;

    const target = hovering.current ? baseVelocity * 0.15 : baseVelocity;
    velocity.current += (target - velocity.current) * 0.06;

    const direction = reverse ? 1 : -1;
    let next = x.get() + (direction * velocity.current * delta) / 1000;

    if (next <= -width) next += width;
    if (next > 0) next -= width;
    x.set(next);
  });

  return (
    <div
      className={cn("flex overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <motion.div style={{ x }} className="flex shrink-0">
        <div ref={contentRef} className="flex shrink-0 items-stretch gap-6 pr-6">
          {children}
        </div>
        <div className="flex shrink-0 items-stretch gap-6 pr-6" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
