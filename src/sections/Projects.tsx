"use client";

import telecomIntegrations from "@/assets/illustrations/hero-telecom-integrations.png";
import telecomKpis from "@/assets/illustrations/hero-telecom-kpis.png";
import telecomMonitoring from "@/assets/illustrations/hero-telecom-monitoring.png";
import { AppModal } from "@/components/AppModal";
import { DotGrid } from "@/components/DotGrid";
import { MotionInView } from "@/components/MotionInView";
import { getProjectDetailImages } from "@/data/projects/detailImages";
import { softwareProjects } from "@/data/projects/software";
import { telecomProjects } from "@/data/projects/telecom";
import type { ProjectCardData, ProjectDetailImage } from "@/data/projects/types";
import type { SiteMode } from "@/lib/siteMode";
import { AnimatePresence, motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  Atom,
  Boxes,
  Braces,
  Check,
  CircleDot,
  Code2,
  Database,
  Expand,
  ExternalLink,
  LayoutDashboard,
  Link2,
  Monitor,
  Play,
  Search,
  Smartphone,
  Sprout,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

const TECH_ICON_MAP: Record<string, LucideIcon> = {
  python: Braces,
  sql: Database,
  mysql: Database,
  react: Atom,
  "react native": Smartphone,
  ".net core": CircleDot,
  n8n: Workflow,
  apis: Link2,
  "ui/ux": LayoutDashboard,
  "web design": Monitor,
  seo: Search,
  "spring boot": Sprout,
  microservices: Boxes,
};

const TELECOM_VISUALS: ProjectDetailImage[] = [
  { src: telecomKpis, alt: "Panel de indicadores y mediciones de telecomunicaciones" },
  { src: telecomMonitoring, alt: "Monitoreo técnico de proyectos de telecomunicaciones" },
  { src: telecomIntegrations, alt: "Integraciones de tecnologías móviles" },
];

const renderTechIcon = (tech: string) => {
  const Icon = TECH_ICON_MAP[tech.toLowerCase()] ?? Code2;
  return <Icon className="h-4 w-4" strokeWidth={2.1} aria-hidden="true" />;
};

const ProjectSelector = ({
  projects,
  activeIndex,
  onSelect,
}: {
  projects: ProjectCardData[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) => (
  <div
    className="mt-8 overflow-x-auto pb-5 pt-2 [scrollbar-color:rgba(11,29,58,0.22)_transparent] [scrollbar-width:thin] sm:mt-10"
    role="tablist"
    aria-label="Seleccionar proyecto"
  >
    <div className="relative grid min-w-[720px] grid-cols-[repeat(var(--project-count),minmax(145px,1fr))] gap-0 px-2 pb-3"
      style={{ "--project-count": projects.length } as CSSProperties}
    >
      <div className="absolute left-[7%] right-[7%] top-[1.1rem] h-px bg-[#0b1d3a]/12" />
      {projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="active-project-case"
            onClick={() => onSelect(index)}
            className="group relative z-10 flex min-w-0 flex-col items-center px-3 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f9edb]"
          >
            <motion.span
              animate={{
                scale: isActive ? 1.12 : 1,
                backgroundColor: isActive ? (project.brandLogo ? "#ffffff" : project.accent) : "#ffffff",
                color: isActive ? (project.brandLogo ? "#0b1d3a" : "#ffffff") : "#0b1d3a",
              }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-black shadow-sm ${
                isActive
                  ? project.brandLogo
                    ? "border-2 shadow-[0_8px_22px_rgba(27,90,166,0.2)]"
                    : "border-transparent shadow-[0_8px_22px_rgba(27,90,166,0.2)]"
                  : "border-[#0b1d3a]/14 group-hover:border-[#2f9edb]/45"
              }`}
              style={{ borderColor: isActive && project.brandLogo ? project.accent : undefined }}
            >
              {project.brandLogo ? (
                <Image
                  src={project.image}
                  alt=""
                  className="h-5 w-5 object-contain"
                />
              ) : (
                String(index + 1).padStart(2, "0")
              )}
            </motion.span>
            <span
              className={`mt-3 line-clamp-2 text-[10px] font-black uppercase leading-4 tracking-[0.08em] transition-colors ${
                isActive ? "text-[#0b1d3a]" : "text-[#0b1d3a]/52 group-hover:text-[#0b1d3a]/78"
              }`}
            >
              {project.title}
            </span>
            <span
              className={`mt-1 text-[8px] font-bold uppercase tracking-[0.16em] transition-colors ${
                isActive ? "text-[#1b5aa6]" : "text-[#0b1d3a]/34"
              }`}
            >
              {project.tag}
            </span>
            {isActive && (
              <motion.span
                layoutId="project-selector-active"
                className="mt-3 h-0.5 w-12 rounded-full"
                style={{ backgroundColor: project.accent }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  </div>
);

const ProjectGallery = ({
  images,
  projectTitle,
  phoneGallery = false,
  onImageOpen,
}: {
  images: ProjectDetailImage[];
  projectTitle: string;
  phoneGallery?: boolean;
  onImageOpen: (image: ProjectDetailImage) => void;
}) => (
  <div
    className={
      phoneGallery
        ? "grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-6 lg:grid-cols-10"
        : "grid min-w-0 grid-cols-2 gap-2.5 sm:gap-3"
    }
  >
    {images.slice(0, phoneGallery ? images.length : 4).map((imageItem, imageIndex) => {
      const isHeroImage = imageIndex === 0;
      const visibleImageCount = phoneGallery ? images.length : 4;
      const isLastVisible = imageIndex === Math.min(images.length, visibleImageCount) - 1;
      const hiddenCount = isLastVisible ? Math.max(images.length - visibleImageCount, 0) : 0;
      const isPhoneImage = phoneGallery && imageItem.format !== "screen";
      const galleryAspectClass = isPhoneImage
        ? "aspect-[9/19] sm:col-span-2 lg:col-span-2 !rounded-[1.65rem] border-[5px] border-[#0b1d3a] bg-white shadow-[0_18px_38px_rgba(11,29,58,0.16)]"
        : phoneGallery
          ? "col-span-2 aspect-[16/9] sm:col-span-3 lg:col-span-5"
        : isHeroImage
          ? "col-span-2 aspect-[16/8.3]"
          : "aspect-[4/3]";

      return (
        <motion.button
          key={`${projectTitle}-${imageItem.alt}`}
          type="button"
          onClick={() => onImageOpen(imageItem)}
          className={"group relative overflow-hidden rounded-[1.25rem] border border-[#0b1d3a]/10 bg-[#eef3ff] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f9edb] " + galleryAspectClass}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: imageIndex * 0.08 }}
          whileHover={{ y: -3 }}
          aria-label={`Ampliar ${imageItem.alt}`}
        >
          <Image
            src={imageItem.src}
            alt={imageItem.alt}
            fill
            loading="lazy"
            className={isPhoneImage ? "object-contain p-0.5 transition-transform duration-700 ease-out group-hover:scale-[1.025]" : "object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"}
            sizes={isPhoneImage ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw" : phoneGallery ? "(max-width: 640px) 100vw, 34vw" : isHeroImage ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 50vw, 30vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071425]/35 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-70" />
          <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/85 text-[#0b1d3a] opacity-0 shadow-lg backdrop-blur transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="h-4 w-4" aria-hidden="true" />
          </span>
          {hiddenCount > 0 && (
            <span className="absolute bottom-3 left-3 rounded-full bg-[#071425]/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
              +{hiddenCount} capturas
            </span>
          )}
        </motion.button>
      );
    })}
  </div>
);

const ProjectCaseStudy = ({
  project,
  index,
  direction,
  isTelecom,
  onImageOpen,
}: {
  project: ProjectCardData;
  index: number;
  direction: number;
  isTelecom: boolean;
  onImageOpen: (image: ProjectDetailImage) => void;
}) => {
  const reduceMotion = useHydratedReducedMotion();
  const projectImages = getProjectDetailImages(project.detailImagesKey);
  const galleryImages =
    projectImages.length > 0
      ? projectImages
      : isTelecom
        ? TELECOM_VISUALS
        : [{ src: project.image, alt: project.imageAlt }];
  const isFeatured = !isTelecom && index === 0;

  return (
    <motion.article
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 18, scale: 0.985 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -18, scale: 0.985 }
      }
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className={`quiet-card relative overflow-hidden rounded-[1.75rem] p-4 sm:p-6 lg:rounded-[2.25rem] lg:p-8 ${
        isFeatured ? "ring-1 ring-[#2f9edb]/35 shadow-[0_24px_70px_rgba(47,158,219,0.18)]" : ""
      }`}
      id="active-project-case"
      role="tabpanel"
    >
      <div
        className="absolute inset-x-10 top-0 h-px opacity-80"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />
      {isFeatured && (
        <div className="absolute right-0 top-0 hidden rounded-bl-[1.5rem] bg-[#0b1d3a] px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-white sm:block">
          Selección GSITEL
        </div>
      )}

      <header className="flex flex-col gap-5 border-b border-[#0b1d3a]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#0b1d3a]/8 sm:h-[4.5rem] sm:w-[4.5rem]"
            style={{ background: `linear-gradient(145deg, ${project.accent}18, #f7f9ff 70%)` }}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#1b5aa6]/65">
              {isFeatured ? "Caso principal" : `Proyecto ${String(index + 1).padStart(2, "0")}`} · {project.tag}
            </p>
            <h3 className="mt-1 text-xl font-black uppercase leading-tight tracking-tight text-[#0b1d3a] sm:text-2xl lg:text-[1.7rem]">
              {project.title}
            </h3>
          </div>
        </div>

        {project.techTags && project.techTags.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:max-w-[48%] sm:justify-end">
            {project.techTags.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + techIndex * 0.07 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#0b1d3a]/10 bg-[#f5f7ff] px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#0b1d3a]/70"
              >
                <span className="text-[#1b5aa6]">{renderTechIcon(tech)}</span>
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </header>

      {isFeatured && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#2f9edb]/20 bg-[#2f9edb]/[0.07] px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#0b6092]">
          <span className="h-2 w-2 rounded-full bg-[#2f9edb] shadow-[0_0_0_5px_rgba(47,158,219,0.12)]" />
          App móvil y plataforma web conectadas en una sola experiencia
        </div>
      )}

      <div className={`grid items-start gap-6 lg:gap-8 ${isFeatured ? "mt-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.7fr)]" : "mt-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]"}`}>
        <ProjectGallery
          images={galleryImages}
          projectTitle={project.title}
          phoneGallery={project.galleryMode === "phone"}
          onImageOpen={onImageOpen}
        />

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.58, delay: 0.16 }}
          className="relative overflow-hidden rounded-[1.4rem] border border-[#0b1d3a]/8 bg-[#f4f7ff] p-5 sm:p-6 lg:sticky lg:top-28"
        >
          <div
            className="absolute -right-14 -top-14 h-36 w-36 rounded-full blur-3xl"
            style={{ backgroundColor: `${project.accent}22` }}
          />
          <div className="relative">
            <p className="text-[9px] font-black uppercase tracking-[0.26em] text-[#1b5aa6]">
              Detalle técnico
            </p>
            <p className="mt-4 whitespace-pre-line text-sm font-medium leading-7 text-[#0b1d3a]/76">
              {project.detail ?? project.description}
            </p>
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(27,90,166,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(27,90,166,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f9edb]"
                style={{ backgroundColor: project.accent }}
              >
                {project.projectUrlLabel ?? "Ver proyecto"}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            {project.appLinks && (
              <div className="mt-5 border-t border-[#0b1d3a]/10 pt-5">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#0b1d3a]/45">
                  Descargar la app
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {project.appLinks.android && (
                    <a
                      href={project.appLinks.android}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Descargar CUADRAI en Google Play"
                      className="group inline-flex min-w-[142px] items-center gap-2.5 rounded-xl bg-[#0b1d3a] px-3.5 py-2.5 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#132b50] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f9edb]"
                    >
                      <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                      <span className="text-left leading-none">
                        <span className="block text-[8px] font-semibold uppercase tracking-[0.08em] text-white/55">
                          Disponible en
                        </span>
                        <span className="mt-1 block text-xs font-black tracking-tight">
                          Google Play
                        </span>
                      </span>
                    </a>
                  )}
                  {project.appLinks.appStore && (
                    <a
                      href={project.appLinks.appStore}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Descargar CUADRAI en App Store"
                      className="group inline-flex min-w-[142px] items-center gap-2.5 rounded-xl bg-[#0b1d3a] px-3.5 py-2.5 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#132b50] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f9edb]"
                    >
                      <Apple className="h-5 w-5" aria-hidden="true" />
                      <span className="text-left leading-none">
                        <span className="block text-[8px] font-semibold uppercase tracking-[0.08em] text-white/55">
                          Descárgala en
                        </span>
                        <span className="mt-1 block text-xs font-black tracking-tight">
                          App Store
                        </span>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}
            <div className="mt-6 border-t border-[#0b1d3a]/10 pt-5">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#0b1d3a]/45">
                Alcance del proyecto
              </p>
              <ul className="mt-3 space-y-3">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-xs font-bold leading-5 text-[#0b1d3a]/72"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: project.accent }}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      </div>
    </motion.article>
  );
};

export const Projects = ({ mode }: { mode: SiteMode }) => {
  const [activeImage, setActiveImage] = useState<ProjectDetailImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isTelecom = mode === "telecom";
  const projects = isTelecom ? telecomProjects : softwareProjects;
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
  }, [mode]);

  const selectProject = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const moveProject = (step: number) => {
    const nextIndex = (activeIndex + step + projects.length) % projects.length;
    setDirection(step);
    setActiveIndex(nextIndex);
  };

  return (
    <section
      id="proyectos"
      className="quiet-section quiet-surface relative overflow-hidden px-4 section-shell scroll-mt-24 sm:px-6 md:scroll-mt-28"
    >
      <DotGrid
        dotSize={4}
        gap={18}
        baseColor="#9eb3d8"
        activeColor={isTelecom ? "#f39c36" : "#2f9edb"}
        proximity={140}
        shockRadius={260}
        shockStrength={3}
        resistance={800}
        returnDuration={1.4}
        className="opacity-15"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,249,255,0.74),rgba(234,238,254,0.88))]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <MotionInView className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="section-eyebrow-light">Proyectos</p>
            <h2 className="section-title-light">
              {isTelecom ? "Experiencia telecom" : "Casos de software"}
            </h2>
            <p className="section-desc-light">
              {isTelecom
                ? "RAN, rollout y soporte explicados desde su alcance técnico."
                : "Productos digitales explicados desde su arquitectura e impacto."}
            </p>
          </div>
          <span className="w-fit rounded-full border border-[#0b1d3a]/10 bg-white/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#0b1d3a]/65 backdrop-blur">
            {projects.length} casos
          </span>
        </MotionInView>

        <ProjectSelector
          projects={projects}
          activeIndex={activeIndex}
          onSelect={selectProject}
        />

        <div className="mt-4 flex items-center justify-between gap-4 sm:mt-5">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0b1d3a]/45">
            Caso {String(activeIndex + 1).padStart(2, "0")} de{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => moveProject(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0b1d3a]/12 bg-white text-[#0b1d3a] shadow-sm transition hover:-translate-y-0.5 hover:border-[#2f9edb]/40 hover:text-[#1b5aa6]"
              aria-label="Ver proyecto anterior"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => moveProject(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0b1d3a]/12 bg-white text-[#0b1d3a] shadow-sm transition hover:-translate-y-0.5 hover:border-[#2f9edb]/40 hover:text-[#1b5aa6]"
              aria-label="Ver proyecto siguiente"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-4 min-h-[520px] overflow-hidden sm:mt-5">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <ProjectCaseStudy
              key={activeProject.id}
              project={activeProject}
              index={activeIndex}
              direction={direction}
              isTelecom={isTelecom}
              onImageOpen={setActiveImage}
            />
          </AnimatePresence>
        </div>
      </div>

      <AppModal
        isOpen={!!activeImage}
        onClose={() => setActiveImage(null)}
        ariaLabel={activeImage?.alt ?? "Imagen ampliada"}
        maxWidth="5xl"
        panelClassName="border-white/20 bg-[#0a0f1a] p-4 sm:p-6"
      >
        {activeImage && (
          <>
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Cerrar imagen"
            >
              ×
            </button>
            <div className="relative h-[55vh] w-full sm:h-[65vh]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {activeImage.alt}
            </p>
          </>
        )}
      </AppModal>
    </section>
  );
};
