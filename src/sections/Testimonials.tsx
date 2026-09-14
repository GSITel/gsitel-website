"use client";

import avatar1 from "@/assets/avatars/avatar-1.png";
import avatar2 from "@/assets/avatars/avatar-2.png";
import avatar3 from "@/assets/avatars/avatar-3.png";
import avatar4 from "@/assets/avatars/avatar-4.png";
import avatar6 from "@/assets/avatars/avatar-6.png";
import avatar7 from "@/assets/avatars/avatar-7.png";
import avatar8 from "@/assets/avatars/avatar-8.png";
import avatar9 from "@/assets/avatars/avatar-9.png";
import { staggerContainer, staggerItem } from "@/components/MotionInView";
import type { SiteMode } from "@/lib/siteMode";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

type TestimonialTag = "Telecom" | "Software";

type Testimonial = {
  text: string;
  imageSrc: string;
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
    text: "El dashboard centralizó operaciones dispersas. Hoy el equipo decide con la información correcta, sin perseguir hojas sueltas.",
    imageSrc: avatar9.src,
    name: "Andre Salas",
    role: "Jefe de Operaciones · Servicios empresariales",
    tag: "Software",
  },
  {
    text: "Automatizar reportes y alertas nos dio trazabilidad real y mucho menos trabajo manual en cada cierre.",
    imageSrc: avatar8.src,
    name: "Juliana P.",
    role: "Analista de Procesos · Servicios TI",
    tag: "Software",
  },
  {
    text: "La plataforma ordenó aprobaciones, responsables y tiempos. Ahora el flujo se entiende de punta a punta.",
    imageSrc: avatar7.src,
    name: "Renzo Vidal",
    role: "PMO · Integrador TI",
    tag: "Software",
  },
  {
    text: "La app móvil mejoró el registro de avances y evidencias sin agregar fricción al trabajo de campo.",
    imageSrc: avatar6.src,
    name: "Fiorella S.",
    role: "Coordinadora de Campo · Infraestructura",
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
            <p className="section-eyebrow-light">Testimonios</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#06111f] sm:text-4xl lg:text-5xl">
              {isTelecom
                ? "Confianza que se sostiene en cada despliegue"
                : "Cuando la tecnología funciona, se nota en el equipo"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#0b1d3a]/62 sm:text-base">
              {isTelecom
                ? "Orden, seguimiento y continuidad para operaciones de red exigentes."
                : "Experiencias de equipos que hoy trabajan con más claridad, trazabilidad y control."}
            </p>
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0b1d3a]/38">
            Experiencias de operación
          </p>
        </div>

        <motion.div
          className="mt-8 grid gap-4 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map(({ text, imageSrc, name, role, tag }) => (
            <motion.article
              key={`${name}-${role}`}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="quiet-card group relative flex min-h-[230px] flex-col overflow-hidden rounded-[1.5rem] p-6 sm:p-7"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 text-[#2f9edb]/[0.04] transition-colors duration-500 group-hover:text-[#2f9edb]/[0.075]">
                <Quote className="h-28 w-28 fill-current" strokeWidth={1} />
              </div>
              <div className="relative flex items-center justify-between gap-3">
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${tagStyles[tag]}`}>
                  {tag}
                </span>
                <Quote className="h-4 w-4 text-[#2f9edb]/45" aria-hidden="true" />
              </div>
              <blockquote className="relative mt-5 max-w-2xl text-base font-medium leading-7 tracking-[-0.01em] text-[#0b1d3a]/82 sm:text-lg">
                “{text}”
              </blockquote>
              <div className="relative mt-auto flex items-center gap-3 pt-6">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={42}
                  height={42}
                  className="h-10 w-10 rounded-full border border-white shadow-sm"
                />
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
