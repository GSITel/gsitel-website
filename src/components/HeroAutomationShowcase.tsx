"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { SoftwareProcessShowcase } from "@/components/SoftwareProcessShowcase";

import telecomIntegrations from "@/assets/illustrations/hero-telecom-integrations.png";
import telecomKpis from "@/assets/illustrations/hero-telecom-kpis.png";
import telecomMonitoring from "@/assets/illustrations/hero-telecom-monitoring.png";

const telecomVisualCards = [
  {
    alt: "Monitoreo de red telecom",
    className:
      "left-[13%] top-[8%] z-0 w-[74%] -rotate-[2deg] sm:left-[14%] sm:top-[6%] sm:w-[72%] md:left-[16%] md:top-[5%] md:w-[68%]",
    image: telecomMonitoring,
  },
  {
    alt: "Integraciones móviles",
    className:
      "bottom-[0%] right-[0%] z-20 w-[42%] rotate-[4deg] sm:bottom-[-2%] sm:right-[1%] sm:w-[40%] md:right-[3%] md:w-[38%]",
    image: telecomIntegrations,
  },
  {
    alt: "Panel de KPIs y cobertura telecom",
    className:
      "left-[0%] top-[0%] z-20 w-[42%] -rotate-[5deg] sm:left-[1%] sm:top-[-2%] sm:w-[40%] md:left-[3%] md:w-[38%]",
    image: telecomKpis,
  },
];

type HeroAutomationShowcaseProps = {
  variant?: "software" | "telecom";
};

export const HeroAutomationShowcase = ({
  variant = "software",
}: HeroAutomationShowcaseProps) => {
  const reduceMotion = useHydratedReducedMotion();

  if (variant === "software") return <SoftwareProcessShowcase />;

  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-[340px] sm:max-w-[520px] md:max-w-[560px] lg:max-w-[620px]"
      aria-label={
        variant === "telecom"
          ? "Monitoreo, KPIs e integraciones telecom"
          : "Automatización, integraciones y CRM"
      }
    >
      <div
        className={`pointer-events-none absolute inset-[7%] rounded-[2.5rem] blur-2xl ${
          variant === "telecom"
            ? "bg-[radial-gradient(ellipse_at_center,rgba(243,156,54,0.18),transparent_68%)]"
            : "bg-[radial-gradient(ellipse_at_center,rgba(29,111,255,0.17),transparent_68%)]"
        }`}
      />
      {telecomVisualCards.map((card, index) => (
        <div key={card.alt} className={`absolute ${card.className}`}>
          <motion.div
            className="overflow-hidden rounded-[1.15rem] border border-white/85 bg-white shadow-[0_18px_44px_rgba(28,72,135,0.15)] transition-shadow duration-500 hover:shadow-[0_28px_64px_rgba(28,72,135,0.22)] sm:rounded-[1.35rem]"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, index % 2 === 0 ? -6 : 5, 0] }
            }
            transition={{
              duration: 7 + index * 0.8,
              delay: index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={reduceMotion ? undefined : { scale: 1.025 }}
          >
            <Image
              src={card.image}
              alt={card.alt}
              className="h-auto w-full"
              sizes="(min-width: 1200px) 420px, (min-width: 768px) 34vw, (min-width: 560px) 210px, 44vw"
              priority={index === 0}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};
