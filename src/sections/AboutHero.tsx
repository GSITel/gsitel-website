"use client";

import type { SiteMode } from "@/lib/siteMode";
import { ClientLogoStrip } from "@/components/ClientLogoStrip";
import { HeroAutomationShowcase } from "@/components/HeroAutomationShowcase";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import styles from "./AboutHero.module.css";

type AboutHeroProps = {
  mode: SiteMode;
};

type HeroConfig = {
  eyebrow: string;
  headline: string;
  description: string;
  chips: string[];
  primary: string;
  secondary: string;
  overlay: string;
  button: string;
  panel: string;
};

const heroCopy: Record<SiteMode, HeroConfig> = {
  software: {
    eyebrow: "",
    headline: "De procesos complejos a software que funciona.",
    description:
      "Entendemos tus sistemas con ingeniería inversa, rediseñamos tus procesos y construimos el producto que tu operación necesita.",
    chips: ["Procesos claros", "Sistemas conectados", "Software a medida"],
    primary: "Hablemos de tu proyecto",
    secondary: "Explorar servicios",
    overlay:
      "bg-[radial-gradient(ellipse_at_18%_48%,rgba(47,158,219,0.16),transparent_42%),radial-gradient(ellipse_at_90%_5%,rgba(29,111,255,0.1),transparent_38%)]",
    button:
      "bg-[#1e63c6] hover:bg-[#1955a8] shadow-[0_14px_36px_rgba(30,99,198,0.22)] hover:shadow-[0_18px_44px_rgba(30,99,198,0.3)]",
    panel:
      "border-cyan-200/20 bg-[linear-gradient(145deg,rgba(5,18,39,0.88),rgba(7,27,58,0.72)_56%,rgba(5,18,39,0.52))] shadow-[0_20px_60px_rgba(0,10,30,0.42)]",
  },
  telecom: {
    eyebrow: "Ingeniería RAN multivendor",
    headline: "Ingeniería RAN para redes que no pueden detenerse.",
    description:
      "Integración y optimización 2G/3G/4G/5G con foco operativo y soporte en campo.",
    chips: ["Integración RAN", "Drive Test", "Soporte OyM"],
    primary: "Coordinar soporte",
    secondary: "Explorar servicios",
    overlay:
      "bg-[radial-gradient(ellipse_at_82%_36%,rgba(243,156,54,0.16),transparent_36%),radial-gradient(ellipse_at_16%_84%,rgba(29,111,255,0.1),transparent_42%)]",
    button:
      "bg-[#e99532] hover:bg-[#d38225] text-white shadow-[0_14px_36px_rgba(243,156,54,0.22)] hover:shadow-[0_18px_44px_rgba(243,156,54,0.3)]",
    panel:
      "border-amber-100/20 bg-[linear-gradient(145deg,rgba(26,13,4,0.86),rgba(9,24,48,0.68)_56%,rgba(5,18,39,0.5))] shadow-[0_20px_60px_rgba(20,8,2,0.4)]",
  },
};

export const AboutHero = ({ mode }: AboutHeroProps) => {
  const copy = heroCopy[mode];
  const isTelecom = mode === "telecom";
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section
      id="acerca"
      className="quiet-section quiet-surface relative flex flex-1 flex-col justify-start overflow-hidden scroll-mt-20 pt-20 sm:pt-24 md:justify-center md:scroll-mt-24 md:pt-28"
    >
      <div className={`pointer-events-none absolute inset-0 ${copy.overlay}`} />
      <div className="quiet-texture pointer-events-none absolute inset-0 opacity-45" />
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.55),transparent_58%)] ${
          isTelecom
            ? "lg:bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,255,255,0.55),transparent_55%)]"
            : "lg:bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,255,255,0.55),transparent_55%)]"
        }`}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12">
        <div
          className="mx-auto grid w-full grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-8 lg:gap-10"
        >
          {true && (
            <motion.div
              className={`relative order-2 flex min-w-0 items-center justify-center px-1 py-2 sm:px-4 sm:py-4 md:px-0 md:py-0 ${isTelecom ? "md:order-2" : "md:order-1"}`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: isTelecom ? 42 : -42, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`pointer-events-none absolute inset-0 rounded-3xl ${isTelecom ? "bg-[radial-gradient(ellipse_at_center,rgba(243,156,54,0.13),transparent_70%)]" : "bg-[radial-gradient(ellipse_at_center,rgba(29,111,255,0.12),transparent_70%)]"}`} />
              <div className="hidden">
                Producto · datos · operación
              </div>
              <div className="relative mx-auto w-full max-w-[620px]">
                <HeroAutomationShowcase variant={isTelecom ? "telecom" : "software"} />
              </div>
            </motion.div>
          )}

          <motion.div
            className={`relative order-1 min-w-0 px-2 py-2 sm:px-4 sm:py-4 md:px-0 md:py-0 ${isTelecom ? "md:order-1" : "md:order-2 md:ml-auto"}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: isTelecom ? -34 : 34, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >

            {isTelecom && <div className="flex flex-wrap items-center gap-2">
              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur ${
                  isTelecom
                    ? "border-[#f39c36]/35 bg-white/50 !text-[#6e4a19]"
                    : "border-[#1d6fff]/25 bg-white/50 !text-[#31547c]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    isTelecom ? "bg-[#f39c36]" : "bg-cyan-300"
                  }`}
                />
                <span className={isTelecom ? "!text-[#6e4a19]" : "!text-[#31547c]"}>{copy.eyebrow}</span>
              </div>
            </div>}

            <h1 className={isTelecom ? "mt-5 max-w-xl text-3xl font-black leading-[1.02] tracking-tight !text-[#0a2f5f] sm:text-4xl md:text-[2.55rem] lg:mt-6 lg:text-[3.35rem]" : styles.headline}>
              {isTelecom ? copy.headline : <>De procesos complejos a <span>software que funciona.</span></>}
            </h1>

            <p className={isTelecom ? "mt-4 max-w-lg text-sm leading-6 !text-[#486481] sm:text-base sm:leading-7 lg:mt-5 lg:text-lg" : styles.intro}>
              {copy.description}
            </p>

            <div className={isTelecom ? "mt-5 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#f39c36]/20 py-4 lg:mt-7" : styles.benefits}>
              {copy.chips.map((chip) => (
                <span
                  key={chip}
                  className={isTelecom ? "border-l border-[#f39c36]/30 pl-3 text-[10px] font-black uppercase tracking-[0.16em] !text-[#6e4a19]" : styles.benefit}
                >
                  {!isTelecom && <Check size={15} strokeWidth={2} aria-hidden="true" />}
                  {chip}
                </span>
              ))}
            </div>

            <div className={isTelecom ? "mt-5 flex flex-wrap items-center gap-3 lg:mt-7" : styles.actions}>
              <a
                href="#contacto"
                className={isTelecom ? `btn relative w-full overflow-hidden rounded-xl px-5 py-3.5 text-sm !text-white transition duration-500 hover:-translate-y-0.5 sm:w-auto sm:text-base ${copy.button}` : styles.primary}
              >
                {copy.primary}
                {!isTelecom && <ArrowRight size={18} aria-hidden="true" />}
              </a>
              <a
                href="#servicios"
                className={isTelecom ? "btn w-full border border-[#f39c36]/35 bg-white/55 px-5 py-3.5 text-sm !text-[#9a5b13] transition hover:bg-white/85 sm:w-auto sm:text-base" : styles.secondary}
              >
                {copy.secondary}
              </a>
            </div>

            <div className={isTelecom ? "mt-5 flex max-w-lg items-start gap-3 text-[10px] font-semibold leading-4 text-[#60758c] lg:mt-7" : styles.reassurance}>
              {isTelecom ? <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f39c36]" /> : <ShieldCheck size={17} aria-hidden="true" />}
              {isTelecom ? "Equipo técnico involucrado desde el diagnóstico hasta la operación." : "Un mismo equipo, del diagnóstico a la puesta en marcha."}
            </div>
          </motion.div>
        </div>
        <ClientLogoStrip mode={mode} />
      </div>
    </section>
  );
};
