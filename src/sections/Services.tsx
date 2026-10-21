"use client";

import { AppModal } from "@/components/AppModal";
import { ClaudeServiceScene } from "@/components/ClaudeServiceScene";
import { MotionInView, staggerContainer, staggerItem } from "@/components/MotionInView";
import { getModeTheme } from "@/lib/modeTheme";
import type { SiteMode } from "@/lib/siteMode";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ClipboardList,
  Code2,
  RadioTower,
  Radio,
  Gauge,
  Activity,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import scope from "./ServiceScope.module.css";

type ServiceItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  promise: string;
  activities: string[];
  accent: string;
  accentRgb: string;
};

const services: ServiceItem[] = [
  {
    id: "automation",
    label: "Automatización & Software",
    icon: Code2,
    title: "Desarrollo de software",
    description:
      "Creamos productos a medida y conectamos los sistemas que tu equipo utiliza cada día.",
    promise: "Menos tareas manuales. Más control para decidir.",
    activities: [
      "Automatización de ventas, compras y cobranzas",
      "Aplicaciones web, móviles y APIs backend",
      "Paneles para clientes, inventario y operación",
      "Alertas y flujos de trabajo para reducir errores",
    ],
    accent: "#2f9edb",
    accentRgb: "47, 158, 219",
  },
  {
    id: "ran",
    label: "Ingeniería RAN",
    icon: RadioTower,
    title: "Ingeniería para redes que no pueden detenerse",
    description:
      "Integramos, optimizamos y acompañamos infraestructura móvil 2G/3G/4G/5G con ejecución técnica en campo.",
    promise: "Despliegue claro. Continuidad operativa.",
    activities: [
      "Comisionamiento y capacitación de BBU",
      "Integración y configuración de nodos RAN",
      "Drive Test, Site Survey, transmisión y backhaul",
      "Soporte, optimización y monitoreo OyM RAN",
    ],
    accent: "#f39c36",
    accentRgb: "243, 156, 54",
  },
  {
    id: "consultoria",
    label: "Consultoría de Software",
    icon: ClipboardList,
    title: "Consultoría y reingeniería",
    description:
      "Analizamos tu software y tus procesos para definir qué mejorar y cómo llevarlo a cabo.",
    promise: "La solución correcta, en el orden correcto.",
    activities: [
      "Diagnóstico de procesos y oportunidades",
      "Roadmap de producto y arquitectura técnica",
      "Automatización con IA donde aporta valor",
      "Acompañamiento durante la implementación",
    ],
    accent: "#1b5aa6",
    accentRgb: "27, 90, 166",
  },
];

const telecomServices: ServiceItem[] = [
  {
    ...services[1],
    title: "Despliegue e integración RAN",
    description: "Implementamos y ponemos en servicio estaciones móviles 2G/3G/4G/5G con integración multivendor.",
    activities: [
      "Rollout, expansión y modernización de estaciones",
      "Comisionamiento de BBU Huawei y Ericsson",
      "Configuración e integración de nodos RAN",
      "Validación de servicios y puesta ON AIR",
    ],
  },
  {
    id: "transmision",
    label: "Transmisión y backhaul",
    icon: Radio,
    title: "Enlaces que conectan tu red",
    description: "Planificamos y validamos enlaces de transmisión para conectar estaciones con capacidad y continuidad.",
    promise: "Rutas claras. Capacidad validada.",
    activities: [
      "Site Survey y relevamiento de rutas TX",
      "Implementación y alineación de enlaces microondas",
      "Pruebas de enrutamiento, capacidad y redundancia",
      "Aceptación técnica y documentación de enlaces",
    ],
    accent: "#1b5aa6",
    accentRgb: "27, 90, 166",
  },
  {
    id: "optimizacion",
    label: "Drive Test y optimización RF",
    icon: Gauge,
    title: "Cobertura y calidad verificadas",
    description: "Medimos el desempeño de la red y ajustamos parámetros de radio para mejorar cobertura, capacidad y calidad.",
    promise: "Mediciones en campo. Decisiones con evidencia.",
    activities: [
      "Drive Test, Walk Test y mediciones RF",
      "Análisis de cobertura y KPIs de radio",
      "Optimización y parametrización RAN",
      "Validación post-swap y seguimiento de refarming",
    ],
    accent: "#2f9edb",
    accentRgb: "47, 158, 219",
  },
  {
    id: "oym",
    label: "Soporte OyM y NOC",
    icon: Activity,
    title: "Continuidad para tu operación",
    description: "Acompañamos la operación de red con monitoreo, diagnóstico de incidencias y coordinación técnica en campo.",
    promise: "Seguimiento continuo. Respuesta coordinada.",
    activities: [
      "Monitoreo de alarmas y KPIs desde NOC",
      "Diagnóstico y troubleshooting RAN/TX",
      "Gestión de averías y escalamiento multivendor",
      "Soporte de mantenimiento y reportes operativos",
    ],
    accent: "#f39c36",
    accentRgb: "243, 156, 54",
  },
];

export const Services = ({ mode }: { mode: SiteMode }) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const theme = getModeTheme(mode);
  const orderedServices = theme.isTelecom
    ? telecomServices
    : [services[0], services[2]];
  const focusTags = theme.isTelecom
    ? ["RAN", "Transmisión", "Drive Test", "OyM / NOC"]
    : ["Apps web", "Automatización", "APIs", "IA aplicada"];

  useEffect(() => {
    setActiveService(null);
  }, [mode]);

  return (
    <section
      id="servicios"
      className="quiet-section quiet-surface relative bg-transparent px-4 section-shell scroll-mt-24 sm:px-6 md:scroll-mt-28"
    >
      <div className="quiet-texture pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-[#0b1d3a]/10 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <MotionInView>
            <p className="section-eyebrow-light">Servicios</p>
            <h2 className="section-title-light max-w-2xl">
              {theme.isTelecom
                ? "Capacidad técnica para sostener tu red"
                : "Software pensado para tu operación"}
            </h2>
          </MotionInView>

          <MotionInView delay={0.08} className="lg:justify-self-end">
            <p className="max-w-xl text-sm leading-7 text-[#0b1d3a]/65 sm:text-base">
              {theme.isTelecom
                ? "Ingeniería, integración y soporte con una ejecución visible de principio a fin."
                : "Desde entender lo que ya existe hasta construir lo que tu negocio necesita."}
            </p>
            {theme.isTelecom && <div className="mt-5 flex flex-wrap gap-2">
              {focusTags.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#0b1d3a]/10 bg-white/55 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0b1d3a]/55"
                >
                  {item}
                </span>
              ))}
            </div>}
          </MotionInView>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {orderedServices.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className={`quiet-card group relative flex flex-col overflow-hidden rounded-[1.6rem] p-6 sm:p-8 ${theme.isTelecom ? "min-h-[430px]" : "min-h-[330px]"}`}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ backgroundColor: `rgba(${service.accentRgb}, 0.14)` }}
                />
                <div className="relative flex items-center justify-between gap-4">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/75 shadow-sm"
                    style={{ borderColor: `rgba(${service.accentRgb}, 0.2)`, color: service.accent }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0b1d3a]/45">
                    {service.label}
                  </span>
                </div>

                <div className="relative mt-9">
                  <h3 className="section-card-title max-w-lg">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#0b1d3a]/62">
                    {service.description}
                  </p>
                  <p className="mt-5 border-l-2 pl-4 text-sm font-semibold text-[#0b1d3a]/80" style={{ borderColor: service.accent }}>
                    {service.promise}
                  </p>
                </div>

                {!theme.isTelecom && <ClaudeServiceScene role={service.id === "automation" ? "developer" : "consultant"} />}

                {theme.isTelecom && <ul className="relative mt-7 grid gap-3 border-t border-[#0b1d3a]/8 pt-6 sm:grid-cols-2">
                  {service.activities.slice(0, 4).map((activity) => (
                    <li key={activity} className="flex items-start gap-2.5 text-xs leading-5 text-[#0b1d3a]/62">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: service.accent }} strokeWidth={2.3} />
                      {activity}
                    </li>
                  ))}
                </ul>}

                <button
                  type="button"
                  onClick={() => setActiveService(service)}
                  className={scope.trigger}
                  aria-label={`Ver alcance de ${service.title}`}
                >
                  <span><strong>Ver alcance</strong><small>Qué podemos abordar</small></span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <AppModal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        ariaLabel={activeService ? `Detalles de ${activeService.label}` : "Detalles"}
        maxWidth="2xl"
        panelClassName={scope.panel}
      >
        {activeService && (
          <>
            <header className={scope.header}>
              <span className={scope.eyebrow}><Workflow size={15} aria-hidden="true" /> Servicios GSITEL / Alcance</span>
              <button type="button" onClick={() => setActiveService(null)} className={scope.close} aria-label="Cerrar alcance"><X size={18} aria-hidden="true" /></button>
              <h2>{activeService.title}</h2>
              <p>{activeService.description}</p>
            </header>
            <div className={scope.body}>
              <h3>Qué podemos abordar</h3>
              <ol className={scope.activities}>
                {activeService.activities.map((activity, index) => (
                  <li key={activity}><span>0{index + 1}</span><p>{activity}</p></li>
                ))}
              </ol>
              <div className={scope.note}><Check size={17} aria-hidden="true" /><p>El alcance se acuerda según tu operación, tus prioridades y los sistemas existentes.</p></div>
            </div>
            <footer className={scope.footer}>
              <p>El siguiente paso: conocer el contexto de tu proyecto.</p>
              <a href="#contacto" className={scope.cta}>Hablemos de tu proyecto <ArrowUpRight size={16} aria-hidden="true" /></a>
            </footer>
          </>
        )}
      </AppModal>
    </section>
  );
};
