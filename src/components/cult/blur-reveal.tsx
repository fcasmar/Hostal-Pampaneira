"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.25, 0.4, 0.25, 1] },
  },
};

type Segment = {
  text: string;
  className?: string;
};

/**
 * Revela un titular palabra a palabra con un fundido suave y un ligero
 * deslizamiento, como quien descorre una cortina. Acepta segmentos con
 * estilos propios para resaltar partes del texto.
 */
export function BlurReveal({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn("inline-block", className)}
    >
      {segments.map((segment, i) =>
        segment.text.split(" ").map((w, j) => (
          // El espacio separador va fuera del span: dentro de un
          // inline-block el espacio final colapsa y las palabras se pegan.
          <Fragment key={`${i}-${j}`}>
            <motion.span
              variants={word}
              className={cn(
                "inline-block will-change-transform",
                segment.className
              )}
            >
              {w}
            </motion.span>{" "}
          </Fragment>
        ))
      )}
    </motion.span>
  );
}
