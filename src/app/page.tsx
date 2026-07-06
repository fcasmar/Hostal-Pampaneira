"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  AirVent,
  ArrowRight,
  ArrowUpRight,
  Baby,
  Bath,
  BedDouble,
  BedSingle,
  Car,
  Church,
  Clock3,
  DoorOpen,
  Flame,
  Handshake,
  Home as HomeIcon,
  Landmark,
  Leaf,
  MapPin,
  MessageCircle,
  Minus,
  Mountain,
  Plus,
  Quote,
  Ruler,
  ShieldCheck,
  Snowflake,
  Star,
  User,
  Users,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { BlurReveal } from "@/components/cult/blur-reveal";
import { Marquee } from "@/components/cult/marquee";
import { Reveal } from "@/components/cult/reveal";
import { WarmCard } from "@/components/cult/warm-card";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Configuración                                                             */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ NÚMERO DE WHATSAPP (placeholder — cámbialo por el real).
 * Formato: código de país + número, sin espacios, sin guiones y sin "+".
 * Ejemplo España: "34600000000"
 */
const WHATSAPP_PHONE = "34600000000";

/* -------------------------------------------------------------------------- */
/*  Datos reales del negocio                                                  */
/* -------------------------------------------------------------------------- */

const RATINGS = [
  { label: "Ubicación", score: 9.8 },
  { label: "Personal", score: 9.5 },
  { label: "Limpieza", score: 9.5 },
  { label: "WiFi gratis", score: 10 },
];

const REVIEWS = [
  {
    name: "Eva",
    text: "Habitación muy amplia, limpia y aunque fuera hacía mucho frío dentro se estaba súper calentito…",
  },
  {
    name: "Almudena",
    text: "Habitación con encanto, vistas del balcón a la plaza e iglesia, limpieza y orden en todo.",
  },
  {
    name: "Lorena",
    text: "Limpio, ordenado y acogedor. Muy tranquilo por la noche. Genial.",
  },
  {
    name: "José",
    text: "El personal muy atento desde que llegamos… la comida muy buena.",
  },
];

const AMENITIES = [
  { icon: Ruler, label: "15 m²" },
  { icon: DoorOpen, label: "Balcón a la plaza e iglesia" },
  { icon: AirVent, label: "Aire acondicionado" },
  { icon: Flame, label: "Calefacción potente" },
  { icon: Bath, label: "Baño privado" },
  { icon: Wifi, label: "WiFi 10/10" },
];

/* -------------------------------------------------------------------------- */
/*  Piezas pequeñas reutilizables                                             */
/* -------------------------------------------------------------------------- */

function SoftBadge({
  icon: Icon,
  children,
  tone = "clay",
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  tone?: "clay" | "olive" | "sand";
}) {
  const tones = {
    clay: "border-primary/25 bg-primary/10 text-primary",
    olive: "border-secondary/25 bg-secondary/10 text-secondary",
    sand: "border-border bg-muted text-muted-foreground",
  };
  return (
    <motion.span
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "inline-flex cursor-default items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium",
        tones[tone]
      )}
    >
      <Icon className="size-4" />
      {children}
    </motion.span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-sm font-medium tracking-[0.22em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Marco artesanal tipo paspartú para las fotos flotantes. */
function MatFrame({
  className,
  rotate = "",
  children,
  caption,
}: {
  className?: string;
  rotate?: string;
  children: React.ReactNode;
  caption?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card p-2",
        "shadow-[0_2px_6px_hsl(30_20%_20%/0.06),0_18px_44px_hsl(30_20%_20%/0.14)]",
        "transition-transform duration-500 hover:rotate-0",
        rotate,
        className
      )}
    >
      <div className="overflow-hidden rounded-xl">{children}</div>
      {caption ? (
        <p className="flex items-center gap-1.5 px-2 pt-2 pb-1 text-xs text-muted-foreground">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navegación flotante                                                       */
/* -------------------------------------------------------------------------- */

function SiteNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border bg-background/80 py-2 pr-2 pl-5 shadow-[0_4px_24px_hsl(30_20%_20%/0.08)] backdrop-blur-xl">
        <a href="#" className="flex items-center gap-2 text-sm font-semibold">
          <Mountain className="size-4 text-primary" />
          Hostal Pampaneira
        </a>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#experiencias" className="transition-colors hover:text-foreground">
            Experiencias
          </a>
          <a href="#habitaciones" className="transition-colors hover:text-foreground">
            Habitaciones
          </a>
          <a href="#opiniones" className="transition-colors hover:text-foreground">
            Opiniones
          </a>
        </div>
        <a
          href="#reservar"
          className={cn(
            buttonVariants({ size: "sm" }),
            "rounded-full px-4 shadow-[0_4px_16px_hsl(var(--primary)/0.3)]"
          )}
        >
          Reservar
        </a>
      </nav>
    </motion.header>
  );
}

/* -------------------------------------------------------------------------- */
/*  1 · Hero asimétrico                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-36 pb-24 sm:px-6 lg:pt-44">
      {/* Atmósfera: luz cálida de la mañana, sin neones */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute top-52 -right-48 size-[32rem] rounded-full bg-secondary/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-accent/60 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-12">
        {/* Texto evocador — columna izquierda (7/12) */}
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground shadow-[0_2px_8px_hsl(30_20%_20%/0.05)]">
              <MapPin className="size-3.5 text-primary" />
              Pampaneira · uno de los pueblos más bonitos de España · La
              Alpujarra, Granada
            </p>
          </Reveal>

          <h1 className="font-serif text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <BlurReveal
              segments={[
                { text: "Fuera, el frío de" },
                { text: "Sierra Nevada.", className: "italic text-secondary" },
                { text: "Dentro, el" },
                { text: "calor de casa.", className: "italic text-primary" },
              ]}
            />
          </h1>

          <Reveal delay={0.35} className="mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Pioneros del turismo rural en La Alpujarra desde los años 70. La
              familia Martín Cifuentes lleva más de 30 años al frente del
              Hostal · Restaurante Casa Alfonso: chimenea, cocina de pueblo y
              un balcón a la plaza para verlo todo pasar.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SoftBadge icon={MapPin} tone="olive">
                Ubicación Excelente · 9.8
              </SoftBadge>
              <SoftBadge icon={Wifi} tone="clay">
                WiFi · 10/10
              </SoftBadge>
              <SoftBadge icon={Star} tone="sand">
                9.1 Fantástico · +315 opiniones
              </SoftBadge>
            </div>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#reservar"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group h-12 rounded-full px-7 text-base shadow-[0_8px_28px_hsl(var(--primary)/0.3)]"
                )}
              >
                Reservar ahora
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
              <a
                href="#experiencias"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "h-12 rounded-full px-6 text-base text-muted-foreground hover:text-foreground"
                )}
              >
                Descubrir el hostal
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Imagen principal con marcos artesanales — columna derecha (5/12) */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/15 via-transparent to-secondary/15 blur-3xl" />

            {/* Marco principal tipo paspartú */}
            <div className="rounded-[calc(var(--radius)*2)] border border-border bg-card p-2.5 shadow-[0_2px_8px_hsl(30_20%_20%/0.06),0_24px_60px_hsl(30_20%_20%/0.16)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius)*2-10px)] sm:aspect-[4/4.4]">
                <Image
                  src="/images/fachada.jpg"
                  alt="Fachada del Hostal Pampaneira · Restaurante Casa Alfonso bajo la parra"
                  fill
                  preload
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Tarjeta flotante: nota de Booking */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[0_12px_36px_hsl(30_20%_20%/0.14)] sm:-right-8"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
                9.1
              </span>
              <span className="text-sm leading-tight">
                <strong className="block font-semibold">Fantástico</strong>
                <span className="text-muted-foreground">+315 opiniones</span>
              </span>
            </motion.div>

            {/* Foto flotante: desayuno en la terraza */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-4 w-44 sm:-left-10 sm:w-52"
            >
              <MatFrame
                rotate="-rotate-3"
                caption={
                  <>
                    <UtensilsCrossed className="size-3.5 text-primary" />
                    Desayuno sobre el valle
                  </>
                }
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/desayuno-terraza.jpg"
                    alt="Desayuno en la terraza con vistas al valle del Poqueira"
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                </div>
              </MatFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · Bento Grid de detalles y experiencias                                 */
/* -------------------------------------------------------------------------- */

function BentoSection() {
  return (
    <section id="experiencias" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-accent/50 blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="El hostal, pieza a pieza"
          title="Medio siglo haciendo que quieras volver"
          subtitle="Nada de servicios en lista: cada rincón de Casa Alfonso tiene su propia historia."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Historia — panorámica con foto y velo cálido */}
          <WarmCard className="min-h-72 md:col-span-2 lg:col-span-4">
            <div className="relative flex h-full flex-col justify-end">
              <div className="absolute inset-0">
                <Image
                  src="/images/plaza.jpg"
                  alt="El hostal en la plaza de Pampaneira, con las parras en la fachada"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(25_25%_12%/0.85)] via-[hsl(25_25%_12%/0.45)] to-transparent" />
              </div>
              <div className="relative p-7 text-[hsl(40_60%_97%)] sm:p-9">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] uppercase text-[hsl(28_60%_78%)]">
                  <Landmark className="size-3.5" /> Desde los años 70
                </p>
                <h3 className="max-w-md font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                  Pioneros del turismo rural en La Alpujarra
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[hsl(40_40%_88%)] sm:text-base">
                  Cuando casi nadie subía a estos pueblos, Casa Alfonso ya
                  abría sus puertas. Hoy, la familia Martín Cifuentes suma más
                  de 30 años al servicio del viajero, recibiendo como se
                  recibe en un pueblo: por el nombre y con la mesa puesta.
                </p>
              </div>
            </div>
          </WarmCard>

          {/* Agroturismo — columna alta, fondo crema */}
          <WarmCard delay={0.1} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="relative h-48 shrink-0 overflow-hidden">
              <Image
                src="/images/huerto.jpg"
                alt="Verduras recién cogidas del huerto propio del hostal"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-secondary uppercase">
                <Leaf className="size-3.5" /> Agroturismo de verdad
              </p>
              <h3 className="font-serif text-2xl font-medium tracking-tight">
                Del huerto a la copa
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Baja con nosotros al huerto, súmate a la recogida de la
                aceituna en su temporada y brinda con el vino tinto que la
                casa elabora cada año.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Huerto propio", "Recogida de aceituna", "Vino de la casa"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs text-secondary"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-border min-h-40">
                <Image
                  src="/images/vino.jpg"
                  alt="Vino tinto y aceite de oliva virgen de elaboración propia de Casa Alfonso"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs backdrop-blur-md">
                  <Wine className="size-3.5 text-primary" /> Cosecha propia
                </span>
              </div>
            </div>
          </WarmCard>

          {/* Restaurante */}
          <WarmCard delay={0.15} className="min-h-64 lg:col-span-2">
            <div className="relative flex h-full flex-col justify-end">
              <div className="absolute inset-0">
                <Image
                  src="/images/terraza-restaurante.jpg"
                  alt="Terraza del restaurante Casa Alfonso bajo la parra"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(25_25%_12%/0.85)] via-[hsl(25_25%_12%/0.4)] to-transparent" />
              </div>
              <div className="relative p-7 text-[hsl(40_60%_97%)]">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] uppercase text-[hsl(28_60%_78%)]">
                  <UtensilsCrossed className="size-3.5" /> Restaurante
                </p>
                <h3 className="font-serif text-xl font-medium tracking-tight">
                  Casa Alfonso
                </h3>
                <p className="mt-2 text-sm text-[hsl(40_40%_88%)]">
                  Cocina local, tradicional y familiar, servida bajo la parra
                  de la terraza.
                </p>
              </div>
            </div>
          </WarmCard>

          {/* WiFi 10 */}
          <WarmCard delay={0.2} className="lg:col-span-1">
            <div className="flex h-full flex-col justify-between p-6">
              <Wifi className="size-6 text-secondary" />
              <div>
                <p className="font-serif text-5xl font-medium text-primary">10</p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">
                  WiFi gratis con puntuación perfecta
                </p>
              </div>
            </div>
          </WarmCard>

          {/* Parking */}
          <WarmCard delay={0.25} className="lg:col-span-1">
            <div className="flex h-full flex-col justify-between p-6">
              <Car className="size-6 text-primary" />
              <div>
                <p className="font-serif text-2xl font-medium tracking-tight">
                  Gratis
                </p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">
                  Parking público en las inmediaciones
                </p>
              </div>
            </div>
          </WarmCard>

          {/* Entorno natural */}
          <WarmCard delay={0.3} className="min-h-64 lg:col-span-3">
            <div className="relative flex h-full flex-col justify-end">
              <div className="absolute inset-0">
                <Image
                  src="/images/cascada.jpg"
                  alt="Cascada en el entorno natural del barranco de Poqueira"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(25_25%_12%/0.85)] via-[hsl(25_25%_12%/0.4)] to-transparent" />
              </div>
              <div className="relative p-7 text-[hsl(40_60%_97%)]">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] uppercase text-[hsl(28_60%_78%)]">
                  <Waves className="size-3.5" /> El entorno
                </p>
                <h3 className="font-serif text-xl font-medium tracking-tight">
                  Ríos, cascadas y senderos del Poqueira
                </h3>
                <p className="mt-2 max-w-md text-sm text-[hsl(40_40%_88%)]">
                  Sal andando del hostal y piérdete por el barranco: agua de
                  deshielo, castaños y los tejados planos de la Alpujarra.
                </p>
              </div>
            </div>
          </WarmCard>

          {/* Puntuaciones Booking */}
          <WarmCard delay={0.35} className="lg:col-span-3">
            <div className="flex h-full flex-col p-7">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-serif text-4xl font-medium tracking-tight">
                    9.1{" "}
                    <span className="text-xl font-medium text-primary italic">
                      Fantástico
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    +315 comentarios verificados en Booking.com
                  </p>
                </div>
                <a
                  href="#opiniones"
                  className="group/link inline-flex items-center gap-1 text-sm text-secondary transition-colors hover:text-foreground"
                >
                  Ver opiniones
                  <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
              <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
                {RATINGS.map((r, i) => (
                  <div key={r.label} className="flex items-center gap-3 text-sm">
                    <span className="w-24 shrink-0 text-muted-foreground">
                      {r.label}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${r.score * 10}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.2 + i * 0.12,
                          ease: [0.25, 0.4, 0.25, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                    <span className="w-8 text-right font-semibold">
                      {r.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </WarmCard>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · Habitación con tarjeta interactiva                                    */
/* -------------------------------------------------------------------------- */

function RoomSection() {
  return (
    <section id="habitaciones" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute top-1/4 -right-40 -z-10 size-[28rem] rounded-full bg-secondary/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Dormir en Pampaneira"
          title="Habitación Doble · 1 o 2 camas"
          subtitle="Abre el balcón y ahí está: la plaza, la iglesia y la Sierra de fondo."
        />

        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Imágenes con marcos artesanales — columna izquierda (7/12) */}
          <Reveal className="relative lg:col-span-7">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-bl from-secondary/10 via-transparent to-primary/15 blur-3xl" />
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              className="rounded-[calc(var(--radius)*2)] border border-border bg-card p-2.5 shadow-[0_2px_8px_hsl(30_20%_20%/0.06),0_24px_60px_hsl(30_20%_20%/0.14)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*2-10px)]">
                <Image
                  src="/images/habitacion.jpg"
                  alt="Habitación doble con textiles alpujarreños tradicionales"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 -bottom-10 w-44 sm:-right-6 sm:w-56"
            >
              <MatFrame
                rotate="rotate-2"
                caption={
                  <>
                    <Church className="size-3.5 text-secondary" />
                    Vistas reales desde la habitación
                  </>
                }
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/vistas-ventana.jpg"
                    alt="Vistas reales al pueblo y la sierra desde la ventana de la habitación"
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
              </MatFrame>
            </motion.div>
          </Reveal>

          {/* Tarjeta de detalles — columna derecha (5/12) */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-border bg-card p-7 shadow-[0_2px_8px_hsl(30_20%_20%/0.05),0_16px_44px_hsl(30_20%_20%/0.08)] sm:p-9">
              <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-accent/70 blur-[80px]" />

              <p className="relative inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Star className="size-3.5" />
                La favorita de nuestros huéspedes
              </p>

              <h3 className="relative mt-5 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                Habitación Doble
              </h3>
              <p className="relative mt-1 text-sm text-muted-foreground">
                1 o 2 camas · balcón sobre la plaza y la iglesia
              </p>

              <ul className="relative mt-6 grid grid-cols-2 gap-2.5">
                {AMENITIES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    <Icon className="size-4 shrink-0 text-secondary" />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="relative mt-7 flex items-end justify-between gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-xs text-muted-foreground">desde</p>
                  <p className="font-serif text-4xl font-medium tracking-tight">
                    130 €
                    <span className="ml-1.5 font-sans text-sm font-normal text-muted-foreground">
                      / 2 noches
                    </span>
                  </p>
                </div>
                <p className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary">
                  <ShieldCheck className="size-4" />
                  Cancelación gratuita
                </p>
              </div>

              <a
                href="#reservar"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group relative mt-6 h-12 w-full rounded-full text-base shadow-[0_8px_28px_hsl(var(--primary)/0.3)]"
                )}
              >
                Reservar esta habitación
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · Reserva directa por WhatsApp                                          */
/* -------------------------------------------------------------------------- */

function formatDateEs(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function GuestStepper({
  icon: Icon,
  label,
  value,
  onChange,
  min,
  max,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-input bg-background px-3.5 py-2.5">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4 text-secondary" />
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Quitar ${label.toLowerCase()}`}
          className="grid size-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <Minus className="size-3.5" />
        </motion.button>
        <span className="w-6 text-center text-sm font-semibold">{value}</span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.88 }}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Añadir ${label.toLowerCase()}`}
          className="grid size-7 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <Plus className="size-3.5" />
        </motion.button>
      </div>
    </div>
  );
}

type BedChoice = "" | "doble" | "individuales";
type BookingErrors = Partial<
  Record<"name" | "checkIn" | "checkOut" | "bed", string>
>;

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass =
  "mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground";

function BookingForm() {
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [bed, setBed] = useState<BedChoice>("");
  const [errors, setErrors] = useState<BookingErrors>({});

  function clearError(field: keyof BookingErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const next: BookingErrors = {};
    if (!name.trim()) next.name = "Escribe tu nombre completo.";
    if (!checkIn) next.checkIn = "Elige la fecha de entrada.";
    if (!checkOut) next.checkOut = "Elige la fecha de salida.";
    if (checkIn && checkOut && checkOut <= checkIn)
      next.checkOut = "La salida debe ser posterior a la entrada.";
    if (!bed) next.bed = "Elige el tipo de cama que prefieres.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const guests =
      `${adults} ${adults === 1 ? "adulto" : "adultos"}` +
      (children > 0
        ? ` y ${children} ${children === 1 ? "niño" : "niños"}`
        : "");
    const bedLabel =
      bed === "doble" ? "1 cama doble" : "2 camas individuales";

    const message = [
      "¡Hola, familia Martín Cifuentes! 😊",
      "Me gustaría solicitar una reserva en el Hostal Pampaneira.",
      "",
      `👤 Nombre: ${name.trim()}`,
      `📅 Entrada: ${formatDateEs(checkIn)}`,
      `📅 Salida: ${formatDateEs(checkOut)}`,
      `👥 Huéspedes: ${guests}`,
      `🛏️ Cama: ${bedLabel}`,
      "",
      "¿Podrían confirmarme disponibilidad y precio? ¡Muchas gracias!",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const bedOptions: { value: BedChoice; icon: React.ElementType; label: string }[] =
    [
      { value: "doble", icon: BedDouble, label: "1 cama doble" },
      { value: "individuales", icon: BedSingle, label: "2 camas individuales" },
    ];

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Nombre */}
      <div>
        <label htmlFor="booking-name" className={labelClass}>
          <User className="size-3.5 text-secondary" />
          Nombre completo
        </label>
        <input
          id="booking-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError("name");
          }}
          placeholder="María García López"
          className={cn(inputClass, errors.name && "border-destructive")}
        />
        {errors.name ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
        ) : null}
      </div>

      {/* Fechas */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-checkin" className={labelClass}>
            <ArrowRight className="size-3.5 text-secondary" />
            Fecha de entrada
          </label>
          <input
            id="booking-checkin"
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              clearError("checkIn");
              clearError("checkOut");
            }}
            className={cn(inputClass, errors.checkIn && "border-destructive")}
          />
          {errors.checkIn ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.checkIn}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="booking-checkout" className={labelClass}>
            <ArrowUpRight className="size-3.5 text-secondary" />
            Fecha de salida
          </label>
          <input
            id="booking-checkout"
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              clearError("checkOut");
            }}
            className={cn(inputClass, errors.checkOut && "border-destructive")}
          />
          {errors.checkOut ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.checkOut}</p>
          ) : null}
        </div>
      </div>

      {/* Huéspedes */}
      <div>
        <p className={labelClass}>
          <Users className="size-3.5 text-secondary" />
          Huéspedes
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <GuestStepper
            icon={Users}
            label="Adultos"
            value={adults}
            onChange={setAdults}
            min={1}
            max={6}
          />
          <GuestStepper
            icon={Baby}
            label="Niños"
            value={children}
            onChange={setChildren}
            min={0}
            max={4}
          />
        </div>
      </div>

      {/* Tipo de cama */}
      <div>
        <p className={labelClass}>
          <BedDouble className="size-3.5 text-secondary" />
          Tipo de cama preferido
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {bedOptions.map(({ value, icon: Icon, label }) => (
            <motion.button
              key={value}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setBed(value);
                clearError("bed");
              }}
              aria-pressed={bed === value}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors",
                bed === value
                  ? "border-primary bg-primary/10 font-medium text-primary"
                  : "border-input bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              {label}
            </motion.button>
          ))}
        </div>
        {errors.bed ? (
          <p className="mt-1.5 text-xs text-destructive">{errors.bed}</p>
        ) : null}
      </div>

      {/* Envío */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        className={cn(
          buttonVariants({ size: "lg" }),
          "group h-13 w-full rounded-full text-base shadow-[0_8px_28px_hsl(var(--primary)/0.3)]"
        )}
      >
        <MessageCircle className="size-5" />
        Solicitar Reserva por WhatsApp
        <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
      </motion.button>
      <p className="-mt-1 text-center text-xs text-muted-foreground">
        Se abrirá WhatsApp con tu solicitud ya redactada, lista para enviar.
        No se envía nada automáticamente.
      </p>
    </form>
  );
}

function BookingSection() {
  return (
    <section id="reservar" className="relative scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute top-1/3 -left-40 -z-10 size-[30rem] rounded-full bg-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Reserva directa"
          title="Cuéntanos tu plan y te respondemos al momento"
          subtitle="Sin intermediarios ni pasarelas de pago: hablas por WhatsApp directamente con la casa."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Contexto y confianza — columna izquierda (5/12) */}
          <WarmCard lift={false} className="lg:col-span-5">
            <div className="relative h-52 shrink-0 overflow-hidden">
              <Image
                src="/images/pueblo.jpg"
                alt="Pampaneira encaramada al barranco de Poqueira, bajo Sierra Nevada"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
              <h3 className="font-serif text-2xl font-medium tracking-tight">
                Reservar aquí tiene premio
              </h3>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <Handshake className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>
                    <strong className="font-medium">
                      Trato directo con la familia.
                    </strong>{" "}
                    <span className="text-muted-foreground">
                      Te responde quien te va a recibir, no un call center.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>
                    <strong className="font-medium">Respuesta rápida.</strong>{" "}
                    <span className="text-muted-foreground">
                      Confirmamos disponibilidad por WhatsApp en cuanto lo
                      leemos.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>
                    <strong className="font-medium">
                      Cancelación gratuita.
                    </strong>{" "}
                    <span className="text-muted-foreground">
                      Los planes cambian; lo entendemos.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <BedDouble className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>
                    <strong className="font-medium">
                      Desde 130 € / 2 noches.
                    </strong>{" "}
                    <span className="text-muted-foreground">
                      Habitación doble con balcón a la plaza.
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </WarmCard>

          {/* Formulario — columna derecha (7/12) */}
          <WarmCard lift={false} delay={0.12} className="lg:col-span-7">
            <div className="p-7 sm:p-9">
              <div className="mb-7 flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-medium tracking-tight">
                    Solicitud de reserva
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Un minuto y listo: nosotros nos encargamos del resto.
                  </p>
                </div>
              </div>
              <BookingForm />
            </div>
          </WarmCard>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5 · Marquee de reseñas reales                                             */
/* -------------------------------------------------------------------------- */

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <figure className="flex w-[330px] shrink-0 flex-col justify-between rounded-[calc(var(--radius)+8px)] border border-border bg-card p-6 shadow-[0_2px_8px_hsl(30_20%_20%/0.05)] transition-shadow duration-300 hover:shadow-[0_10px_30px_hsl(30_20%_20%/0.1)] sm:w-[380px]">
      <div>
        <Quote className="size-5 text-primary" />
        <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
          “{text}”
        </blockquote>
      </div>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
          {name.charAt(0)}
        </span>
        <span className="text-sm leading-tight">
          <strong className="block font-medium">{name}</strong>
          <span className="text-xs text-muted-foreground">
            Reseña verificada · Booking.com
          </span>
        </span>
        <span className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3 fill-primary text-primary" />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

function ReviewsSection() {
  return (
    <section id="opiniones" className="relative scroll-mt-24 py-24">
      <div className="pointer-events-none absolute bottom-0 -left-40 -z-10 size-[30rem] rounded-full bg-accent/50 blur-[140px]" />

      <div className="px-4 sm:px-6">
        <SectionHeading
          eyebrow="9.1 · Fantástico en Booking.com"
          title="Lo que se cuenta al volver de Pampaneira"
          subtitle="Más de 315 huéspedes han puesto nota. Estas son sus palabras, tal cual."
        />
      </div>

      <div className="space-y-6">
        <Marquee baseVelocity={38}>
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee baseVelocity={30} reverse>
          {[...REVIEWS].reverse().map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6 · Footer con mapa de distancias                                         */
/* -------------------------------------------------------------------------- */

function DistanceNode({
  icon: Icon,
  title,
  subtitle,
  highlight = false,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span
        className={cn(
          "relative grid size-14 place-items-center rounded-2xl border backdrop-blur-md",
          highlight
            ? "border-primary/40 bg-primary text-primary-foreground shadow-[0_8px_28px_hsl(var(--primary)/0.35)]"
            : "border-border bg-card"
        )}
      >
        {highlight ? (
          <span className="absolute inset-0 rounded-2xl border border-primary/50 animate-ping-slow" />
        ) : null}
        <Icon
          className={cn(
            "size-6",
            highlight ? "text-primary-foreground" : "text-secondary"
          )}
        />
      </span>
      <span className="text-sm leading-tight">
        <strong className="block font-semibold">{title}</strong>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </span>
    </div>
  );
}

function FooterSection() {
  return (
    <footer id="contacto" className="scroll-mt-24 px-4 pt-8 pb-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[calc(var(--radius)*2.5)] border border-border shadow-[0_2px_8px_hsl(30_20%_20%/0.05),0_24px_60px_hsl(30_20%_20%/0.1)]">
            {/* Fondo: el pueblo bajo la sierra, velado en crema */}
            <div className="absolute inset-0">
              <Image
                src="/images/pueblo.jpg"
                alt="Pampaneira encaramada al barranco de Poqueira, bajo Sierra Nevada"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-background/85" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
            </div>

            <div className="relative px-6 py-16 sm:px-12 sm:py-20">
              <div className="mx-auto max-w-3xl text-center">
                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground shadow-[0_2px_8px_hsl(30_20%_20%/0.05)]">
                  <MapPin className="size-3.5 text-primary" />
                  Avenida de la Alpujarra, 1 · 18411 Pampaneira, Granada
                </p>
                <h2 className="mt-6 font-serif text-3xl font-medium tracking-tight text-balance sm:text-5xl">
                  Tu base en el corazón de{" "}
                  <span className="text-primary italic">La Alpujarra</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
                  A un paso de todo lo que vienes buscando: la Granada
                  monumental, la nieve de la Sierra y el silencio del barranco
                  de Poqueira.
                </p>
              </div>

              {/* Mapa estilizado de distancias */}
              <div className="mx-auto mt-12 flex max-w-2xl items-start justify-center gap-3 sm:gap-6">
                <DistanceNode icon={Landmark} title="Granada" subtitle="a 34 km" />
                <div className="mt-7 h-px flex-1 bg-gradient-to-r from-secondary/50 via-border to-primary/50" />
                <DistanceNode
                  icon={HomeIcon}
                  title="Hostal Pampaneira"
                  subtitle="Casa Alfonso"
                  highlight
                />
                <div className="mt-7 h-px flex-1 bg-gradient-to-r from-primary/50 via-border to-secondary/50" />
                <DistanceNode
                  icon={Snowflake}
                  title="Sierra Nevada"
                  subtitle="a 18 km"
                />
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#reservar"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group h-12 rounded-full px-8 text-base shadow-[0_8px_28px_hsl(var(--primary)/0.3)]"
                  )}
                >
                  Reservar por WhatsApp
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </a>
                <a
                  href="#opiniones"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-full px-6 text-base"
                  )}
                >
                  <Star className="size-4 fill-primary text-primary" />
                  9.1 Fantástico
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 px-2 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Hostal Pampaneira · Restaurante Casa Alfonso</p>
          <p className="flex items-center gap-1.5">
            <Mountain className="size-3.5 text-secondary" />
            Familia Martín Cifuentes · Pioneros del turismo rural desde los
            años 70
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Página                                                                    */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="relative flex-1 overflow-x-clip">
      <SiteNav />
      <main>
        <Hero />
        <BentoSection />
        <RoomSection />
        <BookingSection />
        <ReviewsSection />
      </main>
      <FooterSection />
    </div>
  );
}
