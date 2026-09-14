"use client";

import type { DetailConfig } from "@/data/detailConfig";
import {
  SOFTWARE_PHASE2_FEATURES,
  TELECOM_CAPABILITIES,
  TELECOM_CAPABILITY_DATA,
  TELECOM_PHASE2_FEATURES,
} from "@/data/telecomCapabilities";
import { SECTOR_DATA, SOFTWARE_SECTORS } from "@/data/sectorData";
import { AppModal } from "@/components/AppModal";
import { MotionInView } from "@/components/MotionInView";
import { getModeTheme } from "@/lib/modeTheme";
import { renderRoadmapIcon } from "@/lib/roadmapIcons";
import type { SiteMode } from "@/lib/siteMode";
import { scrollToSection } from "@/lib/smoothSectionScroll";
import {
  Antenna,
  ArrowRight,
  Brain,
  Check,
  Gauge,
  Rocket,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { memo, type ReactNode, useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import strategyAiAnalysis from "@/assets/illustrations/strategy-ai-analysis.png";
import strategyDashboards from "@/assets/illustrations/strategy-dashboards.png";
import strategyWorkflows from "@/assets/illustrations/strategy-workflows.png";

type ActiveDetail = {
  label: string;
  categoryLabel: string;
  solutions: DetailConfig["solutions"];
  roadmap: { step: string; title: string; desc: string; icon: ReactNode }[];
};

type ProposalSlide = {
  eyebrow: string;
  title: string;
  body: string;
};

const buildProposalSlides = (
  title: string,
  solutionNames: string[],
  roadmapTitle?: string,
): ProposalSlide[] => [
  {
    eyebrow: "01 · Contexto",
    title,
    body: `Una propuesta diseñada para ordenar la operación de ${title.toLowerCase()}.`,
  },
  {
    eyebrow: "02 · Solución",
    title: solutionNames[0] ?? "Diagnóstico operativo",
    body: "Priorizamos el proceso que genera mayor fricción y lo convertimos en una experiencia medible.",
  },
  {
    eyebrow: "03 · Integración",
    title: solutionNames[1] ?? "Flujos conectados",
    body: "Conectamos las herramientas existentes para evitar tareas manuales y datos dispersos.",
  },
  {
    eyebrow: "04 · Ruta",
    title: roadmapTitle ?? "Implementación gradual",
    body: "Definimos una implementación progresiva con hitos claros para el equipo.",
  },
  {
    eyebrow: "05 · Siguiente paso",
    title: "Hablemos de tu operación",
    body: "Cuéntanos el reto y armamos una primera propuesta para tu caso.",
  },
];

const businessCaseImages: Record<string, string> = {
  Restaurantes: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  Comercio: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  "Estudios Contables": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
  Logística: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  Belleza: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  Marketing: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  Salud: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80",
  Educación: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  Manufactura: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
};

const getProviderLogoUrl = (link: string) => {
  try {
    const hostname = new URL(link).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  } catch {
    return "https://www.google.com/s2/favicons?domain=gsitelservices.com&sz=128";
  }
};

const phase2GraphicImages = {
  software: [
    strategyWorkflows,
    strategyAiAnalysis,
    strategyDashboards,
  ],
  telecom: [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=900&q=80",
  ],
};

const SOFTWARE_SECTOR_OPTIONS = SOFTWARE_SECTORS.filter((item) => item.title !== "Salud");

const PhaseIcon = ({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) => <Icon className={className} strokeWidth={2.25} aria-hidden="true" />;

export const DigitalTransformation = ({ mode }: { mode: SiteMode }) => {
  const [activeDetail, setActiveDetail] = useState<ActiveDetail | null>(null);
  const [activePhase, setActivePhase] = useState<1 | 2>(1);
  const theme = getModeTheme(mode);
  const phase2Features = theme.isTelecom
    ? TELECOM_PHASE2_FEATURES
    : SOFTWARE_PHASE2_FEATURES;
  const phase2Images = theme.isTelecom
    ? phase2GraphicImages.telecom
    : phase2GraphicImages.software;
  const sectorCount = theme.isTelecom
    ? TELECOM_CAPABILITIES.length
    : SOFTWARE_SECTORS.length - 1;

  const openSoftwareSector = useCallback((title: string) => {
    const sector = SECTOR_DATA[title];
    if (!sector) {
      return;
    }

    setActiveDetail({
      label: title,
      categoryLabel: "Sector",
      solutions: sector.solutions,
      roadmap: sector.roadmap.map((step) => ({
        ...step,
        icon: renderRoadmapIcon(step.iconKey),
      })),
    });
  }, []);

  const openTelecomCapability = useCallback((title: string) => {
    const capability = TELECOM_CAPABILITY_DATA[title];
    if (!capability) {
      return;
    }

    setActiveDetail({
      label: title,
      categoryLabel: "Capacidad",
      solutions: capability.solutions,
      roadmap: capability.roadmap.map((step) => ({
        ...step,
        icon: renderRoadmapIcon(step.iconKey),
      })),
    });
  }, []);

  const closeModal = () => {
    setActiveDetail(null);
  };

  if (!theme.isTelecom) {
    return <SoftwareGrowthStrategy />;
  }

  const sectorItems = theme.isTelecom
    ? TELECOM_CAPABILITIES.map((item) => {
        const detail = TELECOM_CAPABILITY_DATA[item.title];
        return {
          badge: item.icon,
          title: item.title,
          image: undefined,
          onOpen: () => openTelecomCapability(item.title),
          slides: buildProposalSlides(
            item.title,
            detail?.solutions.map((solution) => solution.name) ?? [],
            detail?.roadmap[0]?.title,
          ),
        };
      })
    : SOFTWARE_SECTORS.filter((item) => item.title !== "Salud").map((item) => {
        const detail = SECTOR_DATA[item.title];
        return {
          badge: item.icon,
          title: item.title,
          image: businessCaseImages[item.title],
          onOpen: () => openSoftwareSector(item.title),
          slides: buildProposalSlides(
            item.title,
            detail?.solutions.map((solution) => solution.name) ?? [],
            detail?.roadmap[0]?.title,
          ),
        };
      });

  return (
    <section
      id="digitalizacion"
      className="quiet-section quiet-surface relative bg-transparent px-4 pb-20 pt-14 scroll-mt-24 sm:px-6 sm:pb-28 sm:pt-20 md:scroll-mt-28"
    >
      <div className="quiet-texture pointer-events-none absolute inset-0 opacity-25" />
      <div className="mx-auto max-w-7xl">
        <MotionInView className="mb-12 max-w-3xl lg:mb-16">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="section-eyebrow-light">
                {theme.isTelecom ? "Estrategia de Red" : "Estrategia de Crecimiento"}
              </p>
              <span className="border-l border-[#0b1d3a]/15 pl-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b1d3a]/50">
                2 fases · {sectorCount} {theme.isTelecom ? "capacidades" : "sectores"}
              </span>
            </div>
            <h2 className="section-title-light max-w-3xl sm:text-4xl lg:text-5xl">
              {theme.isTelecom
                ? "Soluciones para redes de misión crítica"
                : "Soluciones digitales para empresas y sectores"}
            </h2>
            <p className="section-desc-light max-w-2xl text-base sm:text-lg">
              {theme.isTelecom
                ? "Planificación, despliegue y optimización para operaciones telecom con control técnico de principio a fin."
                : "Software a medida, automatización de procesos, páginas web, aplicaciones web e inteligencia artificial para transformar operaciones reales."}
            </p>
          </div>
        </MotionInView>

        <motion.div
          className="relative isolate flex w-full flex-col gap-3 overflow-hidden rounded-[2rem] border border-[#0b1d3a]/10 bg-[linear-gradient(145deg,#dce5f6_0%,#edf2fd_46%,#d9e4f7_100%)] p-3 shadow-[0_30px_80px_rgba(27,61,107,0.11)] sm:gap-4 sm:rounded-[2.5rem] sm:p-5 lg:flex-row lg:p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_18%,rgba(47,158,219,0.16),transparent_27%),radial-gradient(circle_at_10%_88%,rgba(27,90,166,0.1),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(11,29,58,0.12)_0.7px,transparent_0)] [background-size:18px_18px]" />
          <StrategyPhase
            phase="01"
            title={theme.isTelecom ? "Desplegar" : "Elige tu sector"}
            subtitle={theme.isTelecom ? "Integración RAN" : "Soluciones según tu negocio"}
            description={
              theme.isTelecom
                ? "Rollout, comisionamiento y validación para acelerar la puesta en servicio."
                : "Selecciona tu industria para descubrir soluciones concretas, una ruta de implementación y el siguiente paso para tu negocio."
            }
            icon={
              theme.isTelecom ? (
                <PhaseIcon icon={Antenna} className="h-8 w-8 sm:h-9 sm:w-9" />
              ) : (
                <PhaseIcon icon={Rocket} className="h-8 w-8 sm:h-9 sm:w-9" />
              )
            }
            iconClass={theme.phase1Icon}
            borderClass={theme.phase1Border}
            glowClass={theme.phase1Glow}
            accentRgb={theme.accentRgb}
            expanded={activePhase === 1}
            onExpand={() => setActivePhase(1)}
            >
            <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/90 sm:text-[11px]">
                  Explora todos los casos
                </p>
                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                  Propuestas pensadas desde el contexto de cada operación.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                Desliza
                <ArrowRight className="h-3.5 w-3.5 text-white/80" aria-hidden="true" />
              </span>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-[#0b213f] to-transparent lg:block" />
              <div className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 pt-3 pr-8 [scrollbar-color:rgba(148,163,184,0.85)_rgba(255,255,255,0.08)] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/[0.08] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/80 [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-thumb:hover]:bg-white">
              {sectorItems.map((item) => (
                <BusinessCaseCard
                  key={item.title}
                  title={item.title}
                  image={item.image}
                  accentRgb={theme.accentRgb}
                  slides={item.slides}
                  onOpen={item.onOpen}
                />
              ))}
              </div>
            </div>
            {activeDetail && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mt-6 hidden overflow-hidden rounded-2xl border border-white/15 bg-white/[0.055] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.16)] sm:p-6"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl"
                  style={{ background: `rgba(${theme.accentRgb}, 0.22)` }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: theme.accent }}>
                      Caso seleccionado
                    </p>
                    <h4 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                      {activeDetail.label}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:rotate-90 hover:bg-white/12"
                    aria-label="Cerrar detalle"
                  >
                    ✕
                  </button>
                </div>
                <div className="relative mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Soluciones</p>
                    <div className="space-y-2">
                      {activeDetail.solutions.map((solution) => (
                        <a
                          key={solution.name}
                          href={solution.link}
                          target={solution.link.startsWith("#") ? undefined : "_blank"}
                          rel={solution.link.startsWith("#") ? undefined : "noreferrer"}
                          className="block rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3 transition hover:border-white/20 hover:bg-white/[0.05]"
                        >
                          <span className="block text-sm font-bold text-white">{solution.name}</span>
                          <span className="mt-1 block text-xs leading-5 text-slate-400">{solution.summary}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ruta sugerida</p>
                    <div className="space-y-2">
                      {activeDetail.roadmap.map((step) => (
                        <div key={step.step} className="flex gap-3 rounded-xl border border-white/[0.08] bg-black/10 p-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm text-white" style={{ borderColor: `rgba(${theme.accentRgb}, 0.35)`, background: `rgba(${theme.accentRgb}, 0.12)` }}>
                            {step.icon}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-white">{step.title}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-400">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </StrategyPhase>

          <StrategyPhase
            phase="02"
            title={theme.isTelecom ? "Optimizar" : "Evolucionar"}
            subtitle={theme.isTelecom ? "OyM & Automatización" : "IA & Automatización"}
            description={
              theme.isTelecom
                ? "Visibilidad, troubleshooting y KPIs en redes de misión crítica."
                : "IA, workflows y dashboards para escalar tu operación digital."
            }
            icon={
              theme.isTelecom ? (
                <PhaseIcon icon={Gauge} className="h-8 w-8 sm:h-9 sm:w-9" />
              ) : (
                <PhaseIcon icon={Brain} className="h-8 w-8 sm:h-9 sm:w-9" />
              )
            }
            iconClass={theme.phase2Icon}
            borderClass={theme.phase2Border}
            glowClass={theme.phase1Glow}
            accentRgb={theme.accentRgb}
            expanded={activePhase === 2}
            onExpand={() => setActivePhase(2)}
          >
            <div className="mb-5 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/90 sm:text-[11px]">
                  Capacidades para escalar
                </p>
                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                  Componentes que conectan la operación actual con su siguiente nivel.
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                03 capacidades
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {phase2Features.map((feature, index) => (
                <FeatureItem
                  key={feature.title}
                  index={index + 1}
                  title={feature.title}
                  desc={feature.desc}
                  accentRgb={theme.accentRgb}
                  graphic={phase2Images[index % phase2Images.length]}
                />
              ))}
            </div>
          </StrategyPhase>
        </motion.div>
      </div>

      <AppModal
        isOpen={!!activeDetail}
        onClose={closeModal}
        ariaLabel={activeDetail ? `Detalles de ${activeDetail.label}` : "Detalles"}
        maxWidth="4xl"
        panelClassName="overflow-hidden border-white/15 bg-[#071426]/95 p-0"
      >
        {activeDetail && (
          <div className="relative">
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, rgba(${theme.accentRgb}, 0.2), transparent 70%)`,
              }}
            />

            <div className="relative overflow-hidden border-b border-white/10 px-6 pb-7 pt-8 sm:px-10 sm:pb-8 sm:pt-10">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span
                  className="text-[10px] font-black uppercase tracking-[0.3em]"
                  style={{ color: theme.accent }}
                >
                  {activeDetail.categoryLabel}
                </span>
                <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  {activeDetail.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:rotate-90 hover:bg-white/12"
                aria-label="Cerrar"
              >
                ✕
              </button>
              </div>
            </div>

            <div className="relative grid gap-5 px-6 py-7 sm:px-10 sm:py-9 md:grid-cols-2 md:gap-6">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 sm:p-6">
                <h4 className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                  Soluciones sugeridas
                </h4>
                <ul className="space-y-3">
                  {activeDetail.solutions.map((solution) => (
                    <li
                      key={solution.name}
                      className="group relative overflow-visible rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent p-4 transition hover:border-white/20"
                    >
                      <span className="font-semibold text-white">{solution.name}</span>
                      <a
                        href={solution.link}
                        target={solution.link.startsWith("#") ? undefined : "_blank"}
                        rel={solution.link.startsWith("#") ? undefined : "noreferrer"}
                        className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition hover:text-white"
                      >
                        {solution.provider}
                      </a>
                      <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0b1322] px-4 py-3 text-xs text-slate-300 opacity-0 shadow-2xl transition group-hover:opacity-100 group-hover:translate-y-1">
                        {solution.summary}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 sm:p-6">
                <h4 className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                  Roadmap recomendado
                </h4>
                <ul className="space-y-3">
                  {activeDetail.roadmap.map((step) => (
                    <li
                      key={step.step}
                      className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-white"
                        style={{
                          borderColor: `rgba(${theme.accentRgb}, 0.3)`,
                          background: `rgba(${theme.accentRgb}, 0.1)`,
                        }}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
                          Paso {step.step}
                        </span>
                        <div className="font-semibold text-white">{step.title}</div>
                        <p className="text-sm text-slate-400">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative flex flex-col gap-3 border-t border-white/10 bg-black/10 px-6 py-5 sm:flex-row sm:px-10">
              <button type="button" onClick={closeModal} className="btn-ghost-light flex-1 sm:flex-none">
                Cerrar
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdfgHkDApUgxqeuqpwoaJPVWo6nQjS7NI9wtpB_W7f0RCddpQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noreferrer"
                className={`btn-accent flex-1 sm:flex-none ${theme.ctaPrimary}`}
              >
                Agendar reunión
              </a>
            </div>
          </div>
        )}
      </AppModal>
    </section>
  );
};

function SoftwareGrowthStrategy() {
  const [selectedSector, setSelectedSector] = useState("Restaurantes");
  const [isSectorHovered, setIsSectorHovered] = useState(false);
  const selected = SECTOR_DATA[selectedSector];

  useEffect(() => {
    if (isSectorHovered) {
      return;
    }

    const timer = window.setInterval(() => {
      setSelectedSector((current) => {
        const currentIndex = SOFTWARE_SECTOR_OPTIONS.findIndex((item) => item.title === current);
        return SOFTWARE_SECTOR_OPTIONS[(currentIndex + 1) % SOFTWARE_SECTOR_OPTIONS.length]?.title ?? current;
      });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isSectorHovered]);

  return (
    <section
      id="digitalizacion"
      className="quiet-section relative overflow-hidden bg-[#f4f7ff] px-4 pb-20 pt-14 scroll-mt-24 sm:px-6 sm:pb-28 sm:pt-20 md:scroll-mt-28"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#7dd3fc]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#c4b5fd]/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <MotionInView className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="section-eyebrow-light">Estrategia de Crecimiento</p>
            <span className="rounded-full border border-[#0b1d3a]/10 bg-white/75 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0b1d3a]/50">
              Soluciones por sector
            </span>
          </div>
          <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#0b1d3a] sm:text-5xl lg:text-7xl">
            Convierte un problema operativo en una solución digital.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#0b1d3a]/65 sm:text-lg sm:leading-8">
            Software a medida, automatización de procesos, páginas web, aplicaciones e IA para que tu empresa venda mejor, trabaje más rápido y crezca con control.
          </p>
        </MotionInView>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:gap-7">
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-[2rem] bg-[#0b1d3a] p-6 text-white shadow-[0_24px_70px_rgba(11,29,58,0.2)] sm:p-8"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7dd3fc]">Cómo crecemos contigo</p>
            <div className="mt-8 space-y-7">
              {[
                ["01", "Entendemos", "Mapeamos tu operación y detectamos dónde se pierde tiempo, dinero o clientes."],
                ["02", "Construimos", "Diseñamos la solución correcta: web, app, automatización o integración."],
                ["03", "Escalamos", "Medimos resultados y conectamos nuevas capacidades cuando tu negocio está listo."],
              ].map(([step, title, body]) => (
                <div key={step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#7dd3fc]/35 bg-[#7dd3fc]/10 text-[10px] font-black text-[#7dd3fc]">{step}</span>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 border-t border-white/10 pt-6">
              <p className="text-sm font-bold text-white">¿No sabes por dónde empezar?</p>
              <a
                href="#contacto"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contacto");
                }}
                className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#7dd3fc] transition hover:gap-3"
              >
                Cuéntanos tu reto <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-[2rem] border border-[#0b1d3a]/10 bg-white/80 p-4 shadow-[0_24px_70px_rgba(27,61,107,0.1)] sm:p-6"
          >
            <div className="flex flex-col gap-2 border-b border-[#0b1d3a]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#1b5aa6]">Encuentra tu solución</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-[#0b1d3a] sm:text-3xl">¿Qué necesitas resolver?</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0b1d3a]/40">{SOFTWARE_SECTORS.length - 1} sectores</span>
            </div>

            <div
              className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"
              onMouseEnter={() => setIsSectorHovered(true)}
              onMouseLeave={() => setIsSectorHovered(false)}
            >
              {SOFTWARE_SECTOR_OPTIONS.map((item) => {
                const active = item.title === selectedSector;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setSelectedSector(item.title)}
                    className={`group rounded-2xl border p-3 text-left transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f9edb] ${active ? "border-[#2f9edb] bg-[#e9f8ff] shadow-[0_10px_24px_rgba(47,158,219,0.14)]" : "border-[#0b1d3a]/10 bg-[#f7f9ff] hover:-translate-y-0.5 hover:border-[#2f9edb]/45"}`}
                    aria-pressed={active}
                  >
                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                    <span className={`mt-2 block text-xs font-black leading-4 ${active ? "text-[#0b6092]" : "text-[#0b1d3a]"}`}>{item.title}</span>
                    <span className="mt-1 block text-[10px] leading-4 text-[#0b1d3a]/50">{item.desc}</span>
                  </button>
                );
              })}
            </div>

            {selected && (
              <motion.div
                key={selectedSector}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                aria-live="polite"
                className="mt-5 overflow-hidden rounded-[1.5rem] bg-[#0b1d3a] p-5 text-white sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7dd3fc]">Soluciones para</p>
                    <h4 className="mt-2 text-2xl font-black tracking-tight">{selectedSector}</h4>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#7dd3fc]/25 bg-[#7dd3fc]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#b8edff]"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Ruta recomendada</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {selected.solutions.slice(0, 4).map((solution) => {
                    const providerLogo = getProviderLogoUrl(solution.link);

                    return (
                      <a
                        key={solution.name}
                        href={solution.link}
                        target={solution.link.startsWith("#") ? undefined : "_blank"}
                        rel={solution.link.startsWith("#") ? undefined : "noreferrer"}
                        aria-label={`Ver solución: ${solution.name}`}
                        className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#122544] transition duration-300 hover:-translate-y-1 hover:border-[#7dd3fc]/60 hover:shadow-[0_16px_35px_rgba(0,0,0,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc]"
                      >
                        <div className="relative flex h-24 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(125,211,252,0.22),transparent_58%),linear-gradient(135deg,#15345a,#08162c)]">
                          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_55%)]" />
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_8px_20px_rgba(0,0,0,0.24)] transition duration-300 group-hover:scale-110">
                            <Image
                              src={providerLogo}
                              alt={`Logo de ${solution.provider}`}
                              width={48}
                              height={48}
                              unoptimized
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                        </div>
                        <div className="p-4">
                          <span className="mb-2 block text-[9px] font-black uppercase tracking-[0.16em] text-[#7dd3fc]">
                            {solution.provider}
                          </span>
                          <span className="flex items-start justify-between gap-2 text-sm font-bold text-white">
                            <span>{solution.name}</span>
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#7dd3fc] transition group-hover:translate-x-1" aria-hidden="true" />
                          </span>
                          <span className="mt-2 block text-xs leading-5 text-slate-400">{solution.summary}</span>
                          <span className="mt-3 block text-[9px] font-black uppercase tracking-[0.16em] text-[#7dd3fc]">Abrir solución</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-300"><Check className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" /> Diagnóstico y propuesta a tu medida</p>
                  <a href="#contacto" onClick={(event) => { event.preventDefault(); scrollToSection("contacto"); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7dd3fc] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#0b1d3a] transition hover:bg-white">Hablar con GSITEL <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#0b1d3a]/45" aria-label="Soluciones de GSITEL">
          {["Software a medida", "Automatización de procesos", "Aplicaciones web", "Páginas web", "IA para empresas", "Integraciones SUNAT"].map((keyword) => (
            <a
              key={keyword}
              href="#contacto"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("contacto");
              }}
              className="rounded-full border border-[#0b1d3a]/10 bg-white/55 px-3 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-[#2f9edb]/45 hover:bg-white hover:text-[#0b6092] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f9edb]"
            >
              {keyword}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategyPhase({
  phase,
  title,
  subtitle,
  description,
  icon,
  iconClass,
  borderClass,
  glowClass,
  accentRgb,
  expanded,
  onExpand,
  children,
}: {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  iconClass: string;
  borderClass: string;
  glowClass: string;
  accentRgb: string;
  expanded: boolean;
  onExpand: () => void;
  children: ReactNode;
}) {
  return (
    <article
      className={`quiet-card-dark relative min-w-0 overflow-hidden rounded-[1.7rem] border p-5 transition-[flex-basis,border-color,box-shadow] duration-300 ease-out will-change-[flex-basis] sm:rounded-[2rem] sm:p-7 lg:min-h-[36rem] lg:p-9 ${
        expanded ? "w-full lg:min-w-0 lg:flex-[1_1_0%]" : "w-full lg:flex-[0_0_18rem]"
      } ${borderClass} ${glowClass} ${
        expanded
          ? "border-white/70 ring-1 ring-white/20 shadow-[0_18px_45px_rgba(0,0,0,0.2)]"
          : "border-white/12 hover:border-white/28 hover:shadow-[0_26px_64px_rgba(1,10,26,0.24)]"
      }`}
    >
      <div className={expanded ? "relative" : "relative lg:hidden"}>
        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] ${iconClass.replace(/bg-gradient[^ ]*|from-[^ ]*|to-[^ ]*|shadow-\[[^\]]*\]/g, "")}`}>
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <span
              className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              style={{
                color: "#ffffff",
                background: `rgba(${accentRgb}, 0.28)`,
                border: `1px solid rgba(${accentRgb}, 0.58)`,
              }}
            >
              Fase {phase}
            </span>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/72 sm:text-[11px]">
              {subtitle}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onExpand}
        className={`group hidden h-full min-h-[34.5rem] w-full flex-col items-start justify-between rounded-[1.3rem] p-1 text-left transition-colors duration-300 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55 lg:flex ${
          expanded ? "lg:hidden" : ""
        }`}
        aria-label={`Expandir fase ${phase}: ${title}`}
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] ${iconClass.replace(/bg-gradient[^ ]*|from-[^ ]*|to-[^ ]*|shadow-\[[^\]]*\]/g, "")}`}>
          {icon}
        </div>
        <div>
          <span
            className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            style={{
              color: "#ffffff",
              background: `rgba(${accentRgb}, 0.28)`,
              border: `1px solid rgba(${accentRgb}, 0.58)`,
            }}
          >
            Fase {phase}
          </span>
          <p className="mt-3 break-words text-2xl font-black leading-[1.04] text-white">{title}</p>
          <p className="mt-3 text-xs font-semibold leading-5 !text-white/80">{subtitle}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.12] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] !text-white transition-colors group-hover:border-white/45 group-hover:bg-white/[0.18]">
            Ver fase
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </button>

      <div className={expanded ? "relative mt-8" : "relative mt-8 lg:hidden"}>{children}</div>
    </article>
  );
}

const BusinessCaseCard = memo(function BusinessCaseCard({
  title,
  image,
  accentRgb,
  slides,
  onOpen,
}: {
  title: string;
  image?: string;
  accentRgb: string;
  slides: ProposalSlide[];
  onOpen: () => void;
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[activeSlide];

  return (
    <article
      className="group relative flex min-h-[330px] min-w-[235px] shrink-0 snap-start flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,#101f35,#0b1729)] p-4 text-left shadow-[0_18px_48px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_28px_62px_rgba(0,0,0,0.28)] sm:min-h-[360px] sm:min-w-[260px]"
    >
      <div className="relative h-28 overflow-hidden rounded-[1.15rem] bg-[#17243b] sm:h-32">
        {image ? (
          <Image
            src={image}
            alt={`Caso de negocio para ${title}`}
            fill
            sizes="260px"
            className={`object-cover transition duration-700 group-hover:scale-105 ${["-rotate-2 scale-110", "rotate-2 scale-110", "-rotate-1 scale-115", "rotate-3 scale-110", "rotate-0 scale-105"][activeSlide]}`}
          />
        ) : (
          <div className={`absolute inset-[-8%] transition-transform duration-700 ${["-rotate-3", "rotate-3", "-rotate-1 scale-110", "rotate-2", "rotate-0"][activeSlide]} bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_42%),linear-gradient(135deg,#081d3f,#020408)]`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081326]/70 via-transparent to-transparent" />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{title}</p>
        <span className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: `rgb(${accentRgb})` }}>
          {slide.eyebrow}
        </span>
        <h4 className="mt-2 text-lg font-black leading-tight tracking-tight text-white">{slide.title}</h4>
        <p className="mt-2 text-xs leading-5 text-slate-400">{slide.body}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex gap-1.5" aria-label={`Pantalla ${activeSlide + 1} de ${slides.length}`}>
            {slides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-5 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                aria-label={`Ver pantalla ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0b1d3a] transition hover:scale-105 hover:bg-[#dff7ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Ver soluciones para ${title}`}
          >
            Ver soluciones
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </div>
      <span
        className="absolute right-7 top-7 h-2 w-2 rounded-full opacity-0 transition group-hover:opacity-100"
        style={{ backgroundColor: `rgb(${accentRgb})` }}
        aria-hidden="true"
      />
    </article>
  );
});

function FeatureItem({
  index,
  title,
  desc,
  accentRgb,
  graphic,
}: {
  index: number;
  title: string;
  desc: string;
  accentRgb: string;
  graphic: string | StaticImageData;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] shadow-[0_18px_38px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.07] hover:shadow-[0_28px_56px_rgba(0,0,0,0.24)]">
      <div className="relative aspect-[1.55/1] overflow-hidden">
        <Image
          src={graphic}
          alt=""
          fill
          sizes="(min-width: 640px) 24vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(${accentRgb}, 0.14), rgba(3, 12, 28, 0.45))`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(2,4,8,0.7)_100%)]" />
        <span
          className="absolute left-4 top-4 text-xs font-black"
          style={{ color: `rgb(${accentRgb})` }}
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <h4 className="text-sm font-black uppercase tracking-tight text-white sm:text-base">
          {title}
        </h4>
        <p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p>
      </div>
    </article>
  );
}
