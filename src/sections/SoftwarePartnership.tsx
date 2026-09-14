"use client";

import { MotionInView } from "@/components/MotionInView";
import { scrollToSection } from "@/lib/smoothSectionScroll";
import { motion } from "framer-motion";
import {
  Apple,
  ArrowRight,
  ArrowUpRight,
  Check,
  Play,
} from "lucide-react";
import Image from "next/image";
import cuadraiWebHome from "@/assets/projects/cuadrai/webapp-home.png";
import cuadraiWebProblem from "@/assets/projects/cuadrai/web-problematica.png";
import cuadraiWebPayments from "@/assets/projects/cuadrai/web-pagos.png";
import cuadraiWebTwoSides from "@/assets/projects/cuadrai/web-dosfrentes.png";
import cuadraiWebDiscover from "@/assets/projects/cuadrai/web-descubre.png";

const trustPoints = [
  "Equipo senior, de principio a fin",
  "Avances visibles, sin cajas negras",
  "Continuidad después del lanzamiento",
];
const googlePlayUrl = "https://play.google.com/store/apps/details?id=com.cuadraipe.cuadrai&pcampaignid=web_share";
const appStoreUrl = "https://apps.apple.com/us/app/cuadrai/id6793684461";

export const SoftwarePartnership = () => {
  const goTo = (sectionId: string) => scrollToSection(sectionId);

  return (
    <section
      id="alianzas-software"
      aria-labelledby="partnership-title"
      className="software-partnership quiet-section relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-56 top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#79e4f2]/[0.06] blur-3xl" />
      <div className="software-partnership-watermark" aria-hidden="true">
        PARTNER
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 flex items-center justify-between border-b border-white/10 pb-5 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#79e4f2]" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#79e4f2]">
              Partner estratégico
            </p>
          </div>
          <p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 sm:block">
            Software con dirección
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
          <MotionInView>
            <div className="max-w-xl">
              <h2
                id="partnership-title"
                className="text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl md:text-[2.7rem]"
              >
                Decisiones claras. Software que{" "}
                <span className="text-[#79e4f2]">responde.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Nos involucramos en el negocio, no solo en el código. Diseñamos, construimos y acompañamos el producto cuando entra en operación.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href="#contacto"
                  onClick={(event) => {
                    event.preventDefault();
                    goTo("contacto");
                  }}
                  className="group inline-flex items-center gap-2 border-b border-[#79e4f2] pb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:text-[#79e4f2]"
                >
                  Conversar con el equipo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#proyectos"
                  onClick={(event) => {
                    event.preventDefault();
                    goTo("proyectos");
                  }}
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
                >
                  Ver casos
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="mt-12 space-y-3 border-t border-white/10 pt-6">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-xs font-semibold text-white/55">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#79e4f2]/35 text-[#79e4f2]">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </MotionInView>

          <MotionInView delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="rounded-[1.75rem] border border-white/12 bg-white/[0.035] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:p-4"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-2 pb-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#79e4f2]">Caso real</p>
                  <h3 className="mt-1 text-base font-black tracking-tight text-white sm:text-lg">CUADRAI PE</h3>
                </div>
                <span className="text-right text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                  Plataforma + app
                </span>
              </div>

              <div className="relative mt-3 aspect-[16/8.6] overflow-hidden rounded-xl border border-white/10 bg-white">
                <Image
                  src={cuadraiWebHome}
                  alt="Panel principal de CUADRAI PE"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover object-top transition duration-700 hover:scale-[1.015]"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  [cuadraiWebProblem, "Problema"],
                  [cuadraiWebPayments, "Pagos"],
                  [cuadraiWebTwoSides, "Dos frentes"],
                  [cuadraiWebDiscover, "Descubre"],
                ].map(([image, label]) => (
                  <motion.div
                    key={label as string}
                    whileHover={{ scale: 1.025 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="group relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-white"
                  >
                    <Image
                      src={image}
                      alt={String(label) + " de CUADRAI PE"}
                      fill
                      sizes="(min-width: 1024px) 15vw, 50vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-2 left-2 rounded bg-black/75 px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
                      {label as string}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-4 px-2 pb-1 pt-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-md text-xs leading-5 text-white/45">
                  Una plataforma para conectar jugadores, reservas, pagos y operación en una sola experiencia.
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={googlePlayUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Descargar CUADRAI en Google Play"
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-[9px] font-bold text-white/70 transition hover:border-[#79e4f2]/45 hover:text-white"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    Google Play
                  </a>
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Descargar CUADRAI en App Store"
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-[9px] font-bold text-white/70 transition hover:border-[#79e4f2]/45 hover:text-white"
                  >
                    <Apple className="h-3.5 w-3.5" aria-hidden="true" />
                    App Store
                  </a>
                </div>
              </div>
            </motion.div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
};
