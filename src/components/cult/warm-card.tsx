"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Tarjeta Bento cálida y artesanal: entrada con fundido y deslizamiento
 * suave, y al hover una elevación ligera con sombra tibia — nada de
 * neones ni focos eléctricos.
 */
export function WarmCard({
  children,
  className,
  delay = 0,
  lift = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  lift?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[calc(var(--radius)+8px)]",
        "border border-border bg-card",
        "shadow-[0_1px_2px_hsl(30_20%_20%/0.04),0_10px_28px_hsl(30_20%_20%/0.06)]",
        "transition-shadow duration-500",
        "hover:shadow-[0_2px_4px_hsl(30_20%_20%/0.05),0_18px_44px_hsl(30_20%_20%/0.1)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
