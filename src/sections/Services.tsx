"use client";

import { AppModal } from "@/components/AppModal";
import { MotionInView, staggerContainer, staggerItem } from "@/components/MotionInView";
import { getModeTheme } from "@/lib/modeTheme";
import type { SiteMode } from "@/lib/siteMode";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  RadioTower,
  ScanSearch,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

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
    icon: Workflow,
    title: "Software que ordena la operación",
    description:
      "Diseñamos aplicaciones, automatizaciones e integraciones alrededor de cómo funciona realmente tu negocio.",
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
    icon: ScanSearch,
    title: "Claridad antes de invertir en tecnología",
    description:
      "Traducimos necesidades dispersas en prioridades, arquitectura y un plan de ejecución que el equipo puede entender.",
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

export const Services = ({ mode }: { mode: SiteMode }) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const theme = getModeTheme(mode);
  const orderedServices = theme.isTelecom
    ? [services[1], services[0], services[2]]
    : [services[0], services[2]];
  const focusTags = theme.isTelecom
    ? ["RAN", "Drive test", "OyM", "Automatización"]
    : ["Apps web", "Automatización", "APIs", "IA aplicada"];

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
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#06111f] sm:text-4xl lg:text-5xl">
              {theme.isTelecom
                ? "Capacidad técnica para sostener tu red"
                : "Tecnología que resuelve lo importante"}
            </h2>
          </MotionInView>

          <MotionInView delay={0.08} className="lg:justify-self-end">
            <p className="max-w-xl text-sm leading-7 text-[#0b1d3a]/65 sm:text-base">
              {theme.isTelecom
                ? "Ingeniería, integración y soporte con una ejecución visible de principio a fin."
                : "Partimos del problema operativo y construimos únicamente lo que genera control, velocidad o crecimiento."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {focusTags.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#0b1d3a]/10 bg-white/55 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0b1d3a]/55"
                >
                  {item}
                </span>
              ))}
            </div>
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
                className="quiet-card group relative flex min-h-[430px] flex-col overflow-hidden rounded-[1.6rem] p-6 sm:p-8"
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
                  <h3 className="max-w-lg text-2xl font-semibold leading-[1.12] tracking-[-0.035em] text-[#0b1d3a] sm:text-[2rem]">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#0b1d3a]/62">
                    {service.description}
                  </p>
                  <p className="mt-5 border-l-2 pl-4 text-sm font-semibold text-[#0b1d3a]/80" style={{ borderColor: service.accent }}>
                    {service.promise}
                  </p>
                </div>

                <ul className="relative mt-7 grid gap-3 border-t border-[#0b1d3a]/8 pt-6 sm:grid-cols-2">
                  {service.activities.slice(0, 4).map((activity) => (
                    <li key={activity} className="flex items-start gap-2.5 text-xs leading-5 text-[#0b1d3a]/62">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: service.accent }} strokeWidth={2.3} />
                      {activity}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setActiveService(service)}
                  className="group/action relative mt-auto inline-flex items-center gap-2 self-start pt-8 text-[10px] font-black uppercase tracking-[0.18em] text-[#0b1d3a]"
                >
                  Ver alcance
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" />
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
        panelClassName="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(145deg,#061426_0%,#0a2245_58%,#07172e_100%)] p-6 shadow-[0_34px_90px_rgba(1,8,22,0.5)] sm:p-10"
      >
        {activeService && (
          <>
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
              style={{ background: `rgba(${activeService.accentRgb}, 0.2)` }}
            />
            <div className="relative flex items-start justify-between gap-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: activeService.accent }}>
                  Alcance del servicio
                </span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {activeService.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">{activeService.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:bg-white/12"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="relative mt-8 grid gap-3 sm:grid-cols-2">
              {activeService.activities.map((activity) => (
                <li key={activity} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4 text-sm leading-6 text-white/75">
                  <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: activeService.accent }} />
                  {activity}
                </li>
              ))}
            </ul>

            <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setActiveService(null)} className="btn-ghost-light flex-1 sm:flex-none">
                Cerrar
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdfgHkDApUgxqeuqpwoaJPVWo6nQjS7NI9wtpB_W7f0RCddpQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noreferrer"
                className="btn-accent flex-1 sm:flex-none"
                style={{ backgroundColor: activeService.accent }}
              >
                Hablemos de tu proyecto
              </a>
            </div>
          </>
        )}
      </AppModal>
    </section>
  );
};
