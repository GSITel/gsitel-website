"use client";

import { MotionInView } from "@/components/MotionInView";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import type { SiteMode } from "@/lib/siteMode";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Check, Mail } from "lucide-react";

const meetingUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdfgHkDApUgxqeuqpwoaJPVWo6nQjS7NI9wtpB_W7f0RCddpQ/viewform?usp=publish-editor";

export const Contact = ({ mode }: { mode: SiteMode }) => {
  const isTelecom = mode === "telecom";
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section
      id="contacto"
      className="quiet-section quiet-section-dark relative bg-transparent px-4 section-shell scroll-mt-24 sm:px-6 md:scroll-mt-28"
    >
      <MotionInView className="mx-auto max-w-6xl">
        <div className="quiet-card-dark relative isolate overflow-hidden rounded-[2rem] border-white/15 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.035),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-0 grid-fine opacity-20" />
          <motion.div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full blur-3xl ${isTelecom ? "bg-[#f39c36]/15" : "bg-[#2f9edb]/20"}`}
            animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, 16, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-[#79e4f2]/10 blur-3xl"
            animate={reduceMotion ? undefined : { x: [0, 24, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#79e4f2]/70 to-transparent" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <motion.span
                  className={`h-2 w-2 rounded-full ${isTelecom ? "bg-[#f39c36]" : "bg-[#79e4f2]"}`}
                  animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.9, 1.15, 0.9] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/55">
                  {isTelecom ? "Operación de red" : "Conversemos"}
                </p>
              </div>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.3rem]">
                {isTelecom
                  ? "Una red exigente necesita decisiones claras."
                  : "La próxima mejora de tu negocio puede empezar aquí."}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
                {isTelecom
                  ? "Cuéntanos el escenario. Te ayudamos a definir el alcance técnico y la mejor ruta de ejecución."
                  : "Cuéntanos qué quieres resolver. Ordenamos la idea, definimos prioridades y te proponemos un siguiente paso concreto."}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
              <a
                href={meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-w-[210px] items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.17em] text-[#071b38] shadow-[0_14px_36px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.3)]"
              >
                <CalendarDays className="h-4 w-4" />
                Agendar conversación
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:soporte@gsitel-solutions.com"
                className="group inline-flex min-w-[210px] items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.045] px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.17em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
              >
                <Mail className="h-4 w-4 text-[#79e4f2]" />
                Escribir por correo
              </a>
            </div>
          </div>

          <div className="relative z-10 mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6">
            {["Primera conversación", "Alcance claro", "Siguiente paso concreto"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-[10px] font-semibold text-white/45">
                <Check className="h-3.5 w-3.5 text-[#79e4f2]" strokeWidth={2.4} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </MotionInView>
    </section>
  );
};
