"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Wrapper de entrada al hacer scroll: fundido + deslizamiento suave y
 * orgánico (sin desenfoques agresivos). `delay` permite escalonar
 * elementos hermanos dentro de una misma sección.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
