"use client";

import avatar1 from "@/assets/avatars/avatar-1.png";
import avatar2 from "@/assets/avatars/avatar-2.png";
import avatar3 from "@/assets/avatars/avatar-3.png";
import avatar4 from "@/assets/avatars/avatar-4.png";
import type { SiteMode } from "@/lib/siteMode";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

type TestimonialTag = "Telecom" | "Software";

type Testimonial = {
  text?: string;
  summary?: string;
  imageSrc?: string;
  name: string;
  role: string;
  tag: TestimonialTag;
};

const tagStyles: Record<TestimonialTag, string> = {
  Telecom: "bg-[#f39c36]/12 text-[#8a4d00] border-[#f39c36]/15",
  Software: "bg-[#1d4ed8]/[0.07] text-[#1d4ed8] border-[#1d4ed8]/10",
};

const softwareTestimonials: Testimonial[] = [
  {
    name: "Martín Tenemas",
    role: "VSF · Villas Sin Fronteras",
    summary: "Una web que dio mayor visibilidad a los proyectos de su ONG y facilitó que más personas conocieran su trabajo.",
    tag: "Software",
  },
  {
    name: "Henry Valladares",
    role: "V&A Profesionales",
    summary: "Automatizamos la carga de comprobantes de las 13 empresas que gestiona: un trabajo de dos semanas pasó a resolverse en una hora. También desarrollamos su página web.",
    tag: "Software",
  },
  {
    name: "Fernando",
    role: "Xtreme Fitness Sport",
    summary: "La página web apoyó la campaña de apertura de su nuevo gimnasio en Pucallpa. Ahora desarrollamos un backoffice para la gestión de su empresa de gimnasios.",
    tag: "Software",
  },
  {
    name: "Aaron Lezma",
    role: "Publicidad · CuadrAI",
    summary: "Publicista de CuadrAI, un proyecto que conecta la experiencia móvil con la operación de las reservas deportivas.",
    tag: "Software",
  },
];

const telecomTestimonials: Testimonial[] = [
  {
    text: "La integración RAN/TX se ejecutó con orden y sin reprocesos. Las MOP estuvieron claras para todo el equipo.",
    imageSrc: avatar1.src,
    name: "Daniela Torres",
    role: "PM RAN · Operador móvil",
    tag: "Telecom",
  },
  {
    text: "En refarming 850/1900 mantuvimos continuidad del servicio gracias al seguimiento diario del plan.",
    imageSrc: avatar2.src,
    name: "Carlos M.",
    role: "Jefe de Refarming · Telefónica Perú",
    tag: "Telecom",
  },
  {
    text: "La validación de rutas TX y los eventos RAN salieron a tiempo, con reportes claros al cierre de cada jornada.",
    imageSrc: avatar3.src,
    name: "Paul Rojas",
    role: "Coordinador de Eventos · Entel Perú",
    tag: "Telecom",
  },
  {
    text: "El soporte OyM/NOC redujo tiempos de atención y nos dio visibilidad continua del estado de la red.",
    imageSrc: avatar4.src,
    name: "Luis Herrera",
    role: "NOC Manager · Operador móvil",
    tag: "Telecom",
  },
];

export const Testimonials = ({ mode }: { mode: SiteMode }) => {
  const isTelecom = mode === "telecom";
  const testimonials = isTelecom ? telecomTestimonials : softwareTestimonials;

  return (
    <section
      id="clientes"
      className="quiet-section quiet-surface relative overflow-hidden px-4 section-shell scroll-mt-24 sm:px-6 md:scroll-mt-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-[#2f9edb]/[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-[#0b1d3a]/10 pb-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-eyebrow-light">{isTelecom ? "Testimonios" : "Clientes"}</p>
            <h2 className="section-title-light max-w-3xl">
              {isTelecom
                ? "Confianza que se sostiene en cada despliegue"
                : "La experiencia de trabajar juntos"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#0b1d3a]/62 sm:text-base">
              {isTelecom
                ? "Orden, seguimiento y continuidad para operaciones de red exigentes."
                : "Proyectos compartidos y mejoras concretas en la operación de nuestros clientes."}
            </p>
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0b1d3a]/38">
            {isTelecom ? "Experiencias de operación" : "Proyectos compartidos"}
          </p>
        </div>

        <motion.div
          className={`mt-8 grid gap-4 ${isTelecom ? "md:grid-cols-2" : "md:grid-cols-2"}`}
        >
          {testimonials.map(({ text, summary, imageSrc, name, role, tag }) => (
            <motion.article
              key={`${name}-${role}`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="quiet-card group relative flex min-h-[230px] flex-col overflow-hidden rounded-[1.5rem] p-6 sm:p-7"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 text-[#2f9edb]/[0.04] transition-colors duration-500 group-hover:text-[#2f9edb]/[0.075]">
                {text && <Quote className="h-28 w-28 fill-current" strokeWidth={1} />}
              </div>
              <div className="relative flex items-center justify-between gap-3">
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${tagStyles[tag]}`}>
                  {tag}
                </span>
                {text && <Quote className="h-4 w-4 text-[#2f9edb]/45" aria-hidden="true" />}
              </div>
              {text ? <blockquote className="relative mt-5 max-w-2xl text-base font-medium leading-7 tracking-[-0.01em] text-[#0b1d3a]/82 sm:text-lg">
                “{text}”
              </blockquote> : <p className="relative mt-5 text-base leading-7 text-[#0b1d3a]/75">{summary}</p>}
              <div className="relative mt-auto flex items-center gap-3 pt-6">
                {imageSrc ? <Image
                  src={imageSrc}
                  alt={name}
                  width={42}
                  height={42}
                  className="h-10 w-10 rounded-full border border-white shadow-sm"
                /> : <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1b5aa6]/15 bg-[#1b5aa6]/[0.06] text-xs font-semibold text-[#1b5aa6]" aria-hidden="true">{name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>}
                <div className="min-w-0">
                  <p className="truncate text-xs font-black tracking-tight text-[#0b1d3a]">{name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[#0b1d3a]/48">{role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
