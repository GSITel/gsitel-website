"use client";

import firebaseIcon from "@/assets/apps-icon/FIREBASE.png";
import githubIcon from "@/assets/apps-icon/GITHUB.png";
import jiraIcon from "@/assets/apps-icon/JIRA.png";
import mongoIcon from "@/assets/apps-icon/MONGO DB.png";
import nodeIcon from "@/assets/apps-icon/NODE JS.png";
import reactIcon from "@/assets/apps-icon/REACT.png";
import redisIcon from "@/assets/apps-icon/REDIS.png";
import ubuntuIcon from "@/assets/apps-icon/UBUNTU.png";
import avatarOne from "@/assets/avatars/avatar-1.png";
import avatarThree from "@/assets/avatars/avatar-3.png";
import avatarFive from "@/assets/avatars/avatar-5.png";
import antennaIcon from "@/assets/tech-icon/antena-dark.png";
import monitorIcon from "@/assets/tech-icon/monitor-dark.png";
import routerIcon from "@/assets/tech-icon/router-dark.png";
import satelliteIcon from "@/assets/tech-icon/satelite-dark.png";
import { ScrollProcessStory } from "@/components/ScrollProcessStory";
import { getModeTheme } from "@/lib/modeTheme";
import type { SiteMode } from "@/lib/siteMode";
import { motion } from "framer-motion";
import {
  Activity,
  Check,
  CircleCheck,
  Gauge,
  GitBranch,
  Headphones,
  Layers3,
  MapPin,
  Network,
  RadioTower,
  RotateCw,
  Search,
  ShieldCheck,
  Target,
  Wrench,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

const softwareSteps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tus sistemas y procesos para acordar prioridades y un alcance claro.",
    detail: ["Contexto", "Prioridades", "Oportunidades"],
  },
  {
    number: "02",
    title: "Diseño y ejecución",
    description:
      "Diseñamos y desarrollamos por etapas, con avances que puedes revisar y validar.",
    detail: ["Arquitectura", "Desarrollo", "Validación"],
  },
  {
    number: "03",
    title: "Operación continua",
    description:
      "Acompañamos la puesta en marcha y mejoramos el producto a partir de su uso.",
    detail: ["Indicadores", "Soporte", "Evolución"],
  },
] as const;

const telecomSteps = [
  {
    number: "01",
    title: "Diagnóstico de red",
    description:
      "Medimos la red antes de intervenir. Cruzamos drive test, KPIs de radio, alarmas y condiciones del sitio para localizar degradaciones y definir prioridades con evidencia.",
    detail: ["Drive test", "KPIs radio", "Riesgos"],
  },
  {
    number: "02",
    title: "Diseño e integración",
    description:
      "Convertimos el baseline en un plan técnico para RAN, transmisión y core. Coordinamos la implementación, validamos cada hito y cerramos con criterios claros de aceptación.",
    detail: ["Plan RF", "Integración", "Aceptación"],
  },
  {
    number: "03",
    title: "Operación y optimización",
    description:
      "Supervisamos alarmas y desempeño desde el NOC, coordinamos la resolución de averías y aplicamos ajustes de optimización para sostener la calidad de la red.",
    detail: ["NOC", "Soporte OyM", "Optimización"],
  },
] as const;

const FloatingLayer = ({
  children,
  className,
  delay = 0,
  reduceMotion,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
  reduceMotion: boolean;
}) => (
  <motion.div
    className={className}
    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{
      duration: 0.66,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);

const AppBadge = ({
  icon,
  name,
  compact = false,
}: {
  icon: StaticImageData;
  name: string;
  compact?: boolean;
}) => (
  <div
    className={`flex items-center rounded-xl border border-[#dfe7f5] bg-white shadow-[0_10px_24px_rgba(41,72,116,0.09)] ${
      compact ? "gap-1.5 px-2 py-1.5" : "gap-2 px-2.5 py-2"
    }`}
  >
    <Image
      src={icon}
      alt=""
      aria-hidden="true"
      width={compact ? 18 : 24}
      height={compact ? 18 : 24}
      className={`${compact ? "h-[18px] w-[18px]" : "h-6 w-6"} object-contain`}
    />
    <span
      className={`font-extrabold text-[#0b1d3a]/70 ${
        compact ? "text-[7px] sm:text-[8px]" : "text-[8px] sm:text-[9px]"
      }`}
    >
      {name}
    </span>
  </div>
);

const AvatarStack = () => (
  <div className="flex -space-x-2">
    {[avatarOne, avatarThree, avatarFive].map((avatar, index) => (
      <Image
        key={avatar.src}
        src={avatar}
        alt=""
        aria-hidden="true"
        width={30}
        height={30}
        className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-sm sm:h-8 sm:w-8"
        style={{ zIndex: 3 - index }}
      />
    ))}
  </div>
);

const DiagnosisVisual = ({
  accent,
  reduceMotion,
}: {
  accent: string;
  reduceMotion: boolean;
}) => (
  <div
    className="relative isolate aspect-[4/3] w-full sm:aspect-[16/10]"
    role="img"
    aria-label="Paneles superpuestos de diagnóstico operativo, fuentes de evidencia y priorización"
  >
    <div className="absolute inset-[5%] rounded-[2.4rem] bg-[radial-gradient(circle_at_45%_42%,rgba(255,255,255,0.98),rgba(223,233,249,0.78)_62%,rgba(222,232,247,0)_76%)]" />
    <div className="absolute left-[13%] top-[13%] h-[70%] w-[66%] rounded-[1.65rem] border border-white/80 bg-white/45 shadow-[0_28px_80px_rgba(43,77,124,0.08)]" />

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.04}
      className="absolute left-[7%] top-[6%] z-10 w-[70%] rounded-[1.35rem] border border-white bg-white p-3 shadow-[0_24px_60px_rgba(35,66,111,0.14)] sm:p-5"
    >
      <div className="flex items-center justify-between border-b border-[#0b1d3a]/8 pb-2.5 sm:pb-3.5">
        <div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#0b1d3a]/35 sm:text-[8px]">
            Diagnóstico operativo
          </p>
          <p className="mt-1 text-[10px] font-black text-[#0b1d3a] sm:text-sm">
            Mapa de evidencia
          </p>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#edf5ff] text-[#2677d5] sm:h-10 sm:w-10">
          <Search className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[0.82fr_1.18fr] gap-2.5 sm:mt-4 sm:gap-4">
        <div className="space-y-2">
          <AppBadge icon={jiraIcon} name="Jira" compact />
          <AppBadge icon={githubIcon} name="GitHub" compact />
          <div className="rounded-xl border border-[#dfe7f5] bg-[#f8faff] px-2.5 py-2">
            <p className="text-[6px] font-black uppercase tracking-[0.16em] text-[#0b1d3a]/34 sm:text-[7px]">
              Operación
            </p>
            <div className="mt-2 flex gap-1">
              {[68, 88, 52, 76].map((width) => (
                <span
                  key={width}
                  className="h-1 rounded-full bg-[#bbcae1]"
                  style={{ width: `${width / 4}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-[#dfe7f5] bg-[#f8fbff] p-2.5 sm:p-3.5">
          <div className="absolute bottom-0 left-1/2 top-0 w-px bg-[#d7e3f4]" />
          <div className="relative grid h-full grid-cols-2 gap-2">
            {[
              ["Señales", "Datos útiles"],
              ["Restricciones", "Fricción real"],
              ["Prioridades", "Impacto primero"],
              ["Oportunidades", "Siguiente paso"],
            ].map(([title, subtitle], itemIndex) => (
              <div
                key={title}
                className={`rounded-lg border bg-white px-2 py-2 shadow-sm ${
                  itemIndex === 2
                    ? "border-[#80b8f6]"
                    : "border-[#e4ebf5]"
                }`}
              >
                <span
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: itemIndex === 2 ? accent : "#9cb2d0",
                  }}
                />
                <p className="mt-1.5 text-[6px] font-black text-[#0b1d3a]/72 sm:text-[7px]">
                  {title}
                </p>
                <p className="mt-0.5 text-[5px] text-[#0b1d3a]/38 sm:text-[6px]">
                  {subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.16}
      className="absolute right-[2%] top-[16%] z-20 w-[27%] rounded-[1.15rem] bg-[#0b2b58] p-3 text-white shadow-[0_22px_55px_rgba(11,43,88,0.25)] sm:p-4"
    >
      <Target className="h-4 w-4 text-cyan-300 sm:h-5 sm:w-5" />
      <p className="mt-3 text-[6px] font-black uppercase tracking-[0.18em] text-white/45 sm:text-[7px]">
        Hallazgo validado
      </p>
      <p className="mt-1.5 text-[9px] font-black leading-tight sm:text-xs">
        Cuello de botella identificado
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[6px] font-bold text-cyan-200 sm:text-[7px]">
        <CircleCheck className="h-3 w-3" />
        Prioridad alta
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.25}
      className="absolute bottom-[3%] left-[14%] z-30 flex w-[42%] items-center justify-between gap-2 rounded-[1.1rem] border border-white bg-white px-3 py-2.5 shadow-[0_20px_45px_rgba(40,71,113,0.16)] sm:px-4 sm:py-3"
    >
      <AvatarStack />
      <div className="min-w-0 text-right">
        <p className="truncate text-[7px] font-black text-[#0b1d3a] sm:text-[9px]">
          Equipo alineado
        </p>
        <p className="mt-0.5 truncate text-[6px] text-[#0b1d3a]/40 sm:text-[7px]">
          Evidencia compartida
        </p>
      </div>
    </FloatingLayer>
  </div>
);

const ExecutionVisual = ({
  accent,
  reduceMotion,
}: {
  accent: string;
  reduceMotion: boolean;
}) => (
  <div
    className="relative isolate aspect-[4/3] w-full sm:aspect-[16/10]"
    role="img"
    aria-label="Arquitectura tecnológica modular con React, Node, MongoDB, GitHub y Jira"
  >
    <div className="absolute inset-[4%] rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,1),rgba(222,233,249,0.82)_62%,transparent_78%)]" />

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.04}
      className="absolute left-[6%] top-[6%] z-10 w-[75%] rounded-[1.4rem] border border-white bg-white p-3 shadow-[0_26px_65px_rgba(35,66,111,0.14)] sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#0b1d3a]/35 sm:text-[8px]">
            Arquitectura objetivo
          </p>
          <p className="mt-1 text-[10px] font-black text-[#0b1d3a] sm:text-sm">
            Solución modular
          </p>
        </div>
        <Layers3 className="h-5 w-5 text-[#2677d5] sm:h-6 sm:w-6" />
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
        <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-[#a9c8f0]" />
        {[
          { name: "React", role: "Interfaz", icon: reactIcon },
          { name: "Node", role: "Servicios", icon: nodeIcon },
          { name: "MongoDB", role: "Datos", icon: mongoIcon },
        ].map((tool) => (
          <div
            key={tool.name}
            className="relative rounded-xl border border-[#dfe7f5] bg-[#f8fbff] px-2 py-3 text-center shadow-sm sm:rounded-2xl sm:px-3 sm:py-4"
          >
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm sm:h-11 sm:w-11">
              <Image
                src={tool.icon}
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="h-6 w-6 object-contain sm:h-8 sm:w-8"
              />
            </div>
            <p className="mt-2 text-[7px] font-black text-[#0b1d3a] sm:text-[9px]">
              {tool.name}
            </p>
            <p className="mt-0.5 text-[5px] text-[#0b1d3a]/38 sm:text-[7px]">
              {tool.role}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#eef5ff] px-3 py-2 sm:mt-4">
        <ShieldCheck className="h-3.5 w-3.5 text-[#2677d5] sm:h-4 sm:w-4" />
        <span className="text-[6px] font-black text-[#174f92] sm:text-[8px]">
          Seguridad y validación en cada módulo
        </span>
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.16}
      className="absolute right-[1%] top-[20%] z-20 w-[28%] rounded-[1.15rem] border border-white bg-white p-3 shadow-[0_22px_50px_rgba(35,66,111,0.17)] sm:p-4"
    >
      <div className="flex items-center justify-between">
        <Image
          src={jiraIcon}
          alt=""
          aria-hidden="true"
          width={26}
          height={26}
          className="h-6 w-6 object-contain"
        />
        <span className="rounded-full bg-[#edf4ff] px-2 py-1 text-[5px] font-black text-[#2677d5] sm:text-[6px]">
          EN CURSO
        </span>
      </div>
      <p className="mt-3 text-[9px] font-black text-[#0b1d3a] sm:text-xs">
        Sprint 02
      </p>
      <div className="mt-3 space-y-2">
        {[true, true, false].map((done, itemIndex) => (
          <div key={itemIndex} className="flex items-center gap-2">
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                done ? "bg-[#dff7eb] text-[#16a866]" : "bg-[#edf1f7]"
              }`}
            >
              {done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
            </span>
            <span
              className={`h-1.5 rounded-full ${
                done ? "w-[62%] bg-[#afc1d8]" : "w-[78%] bg-[#d9e1ec]"
              }`}
            />
          </div>
        ))}
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.25}
      className="absolute bottom-[2%] left-[13%] z-30 flex w-[48%] items-center gap-3 rounded-[1.15rem] bg-[#0b2b58] p-3 text-white shadow-[0_22px_52px_rgba(11,43,88,0.24)] sm:p-4"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white sm:h-11 sm:w-11">
        <Image
          src={githubIcon}
          alt=""
          aria-hidden="true"
          width={30}
          height={30}
          className="h-7 w-7 object-contain sm:h-8 sm:w-8"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[6px] font-black uppercase tracking-[0.16em] text-white/45 sm:text-[7px]">
          Revisión técnica
        </p>
        <p className="mt-1 truncate text-[8px] font-black sm:text-[10px]">
          Build aprobado
        </p>
      </div>
      <CircleCheck
        className="ml-auto h-4 w-4 shrink-0 text-emerald-300 sm:h-5 sm:w-5"
        fill="currentColor"
        fillOpacity={0.12}
      />
    </FloatingLayer>
  </div>
);

const OperationVisual = ({
  accent,
  reduceMotion,
}: {
  accent: string;
  reduceMotion: boolean;
}) => (
  <div
    className="relative isolate aspect-[4/3] w-full sm:aspect-[16/10]"
    role="img"
    aria-label="Paneles superpuestos de monitoreo, soporte y mejora continua"
  >
    <div className="absolute inset-[4%] rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,1),rgba(222,233,249,0.82)_62%,transparent_78%)]" />

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.04}
      className="absolute left-[5%] top-[7%] z-10 w-[76%] rounded-[1.4rem] border border-white bg-white p-3 shadow-[0_26px_65px_rgba(35,66,111,0.14)] sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#0b1d3a]/35 sm:text-[8px]">
            Operación en vivo
          </p>
          <p className="mt-1 text-[10px] font-black text-[#0b1d3a] sm:text-sm">
            Salud del sistema
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#e9f9f1] px-2.5 py-1.5 text-[6px] font-black text-[#16895a] sm:text-[7px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#19b978]" />
          ESTABLE
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-[#e1e9f4] bg-[#f8fbff] p-2.5 sm:mt-4 sm:p-4">
        <svg
          viewBox="0 0 420 112"
          className="h-[72px] w-full sm:h-[96px]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="methodology-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[24, 56, 88].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="420"
              y2={y}
              stroke="#dbe5f2"
              strokeDasharray="4 7"
            />
          ))}
          <path
            d="M0 83 C34 76,54 91,86 67 S143 38,173 58 S222 83,254 49 S307 27,338 44 S384 62,420 28 L420 112 L0 112 Z"
            fill="url(#methodology-chart-fill)"
          />
          <path
            d="M0 83 C34 76,54 91,86 67 S143 38,173 58 S222 83,254 49 S307 27,338 44 S384 62,420 28"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="338" cy="44" r="6" fill="white" stroke={accent} strokeWidth="4" />
        </svg>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2 sm:mt-3">
        {[
          ["Disponibilidad", "En objetivo"],
          ["Latencia", "Estable"],
          ["Errores", "Sin alertas"],
        ].map(([metric, state]) => (
          <div key={metric} className="rounded-lg bg-[#f5f8fc] px-2 py-2">
            <p className="truncate text-[5px] font-bold text-[#0b1d3a]/35 sm:text-[6px]">
              {metric}
            </p>
            <p className="mt-1 truncate text-[6px] font-black text-[#0b1d3a]/72 sm:text-[8px]">
              {state}
            </p>
          </div>
        ))}
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.15}
      className="absolute right-[1%] top-[12%] z-20 w-[27%] rounded-[1.15rem] bg-[#0b2b58] p-3 text-white shadow-[0_22px_52px_rgba(11,43,88,0.24)] sm:p-4"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200 sm:h-10 sm:w-10">
        <Headphones className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <p className="mt-3 text-[6px] font-black uppercase tracking-[0.16em] text-white/45 sm:text-[7px]">
        Soporte activo
      </p>
      <p className="mt-1.5 text-[9px] font-black leading-tight sm:text-xs">
        Cobertura continua
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[6px] font-bold text-emerald-300 sm:text-[7px]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
        Equipo disponible
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.23}
      className="absolute bottom-[3%] left-[10%] z-30 flex w-[47%] items-center gap-2 rounded-[1.15rem] border border-white bg-white p-2.5 shadow-[0_20px_48px_rgba(35,66,111,0.16)] sm:gap-3 sm:p-3.5"
    >
      <div className="flex -space-x-1.5">
        {[ubuntuIcon, redisIcon, firebaseIcon].map((icon) => (
          <div
            key={icon.src}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#e1e8f2] bg-white shadow-sm sm:h-10 sm:w-10"
          >
            <Image
              src={icon}
              alt=""
              aria-hidden="true"
              width={26}
              height={26}
              className="h-6 w-6 object-contain sm:h-7 sm:w-7"
            />
          </div>
        ))}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[7px] font-black text-[#0b1d3a] sm:text-[9px]">
          Infraestructura
        </p>
        <p className="mt-0.5 truncate text-[5px] text-[#0b1d3a]/40 sm:text-[7px]">
          Componentes observados
        </p>
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.31}
      className="absolute bottom-[5%] right-[2%] z-40 w-[29%] rounded-[1.15rem] border border-[#d9e8fb] bg-[#edf6ff] p-3 shadow-[0_18px_42px_rgba(35,88,147,0.15)] sm:p-4"
    >
      <div className="flex items-center justify-between text-[#2677d5]">
        <RotateCw className="h-4 w-4 sm:h-5 sm:w-5" />
        <GitBranch className="h-3.5 w-3.5 opacity-55 sm:h-4 sm:w-4" />
      </div>
      <p className="mt-2.5 text-[6px] font-black uppercase tracking-[0.15em] text-[#2677d5]/55 sm:text-[7px]">
        Próxima mejora
      </p>
      <p className="mt-1 text-[8px] font-black leading-tight text-[#0b1d3a] sm:text-[10px]">
        Ajuste priorizado con evidencia
      </p>
    </FloatingLayer>
  </div>
);

const TelecomDiagnosisVisual = ({
  accent,
  reduceMotion,
}: {
  accent: string;
  reduceMotion: boolean;
}) => (
  <div
    className="relative isolate aspect-square w-full md:aspect-[16/10]"
    role="img"
    aria-label="Diagnóstico de red con drive test, mapa de cobertura y KPIs de radio"
  >
    <div className="absolute inset-[4%] rounded-[2.5rem] bg-[radial-gradient(circle_at_48%_44%,rgba(255,255,255,1),rgba(250,230,204,0.72)_62%,transparent_78%)]" />
    <div className="absolute left-[12%] top-[12%] h-[72%] w-[68%] rounded-[1.7rem] border border-white/85 bg-white/40 shadow-[0_28px_75px_rgba(98,61,23,0.09)]" />

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.04}
      className="absolute left-[6%] top-[5%] z-10 w-[73%] rounded-[1.35rem] border border-white bg-white p-3 shadow-[0_24px_60px_rgba(83,54,25,0.15)] sm:p-5"
    >
      <div className="flex items-center justify-between border-b border-[#3d2d1d]/8 pb-2.5 sm:pb-3.5">
        <div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#3d2d1d]/35 sm:text-[8px]">
            Drive test · Baseline RF
          </p>
          <p className="mt-1 text-[10px] font-black text-[#20170f] sm:text-sm">
            Cobertura y calidad
          </p>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff2df] text-[#d97716] sm:h-10 sm:w-10">
          <RadioTower className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[1.15fr_0.85fr] gap-2.5 sm:mt-4 sm:gap-4">
        <div
          className="relative min-h-[102px] overflow-hidden rounded-xl border border-[#f0dfca] bg-[#fffaf4] sm:min-h-[145px]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(206,175,137,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(206,175,137,0.16) 1px,transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <svg
            viewBox="0 0 260 130"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M10 102 C42 94,48 61,78 66 S119 103,145 76 S184 25,250 39"
              fill="none"
              stroke={accent}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="2 10"
            />
            <circle cx="78" cy="66" r="8" fill="white" stroke={accent} strokeWidth="4" />
            <circle cx="145" cy="76" r="8" fill="white" stroke={accent} strokeWidth="4" />
            <circle cx="224" cy="38" r="8" fill="white" stroke={accent} strokeWidth="4" />
          </svg>
          <span className="absolute left-[7%] top-[12%] rounded-full bg-white px-2 py-1 text-[5px] font-black text-[#9a5f23] shadow-sm sm:text-[6px]">
            RUTA 04
          </span>
          <MapPin className="absolute bottom-[13%] right-[8%] h-4 w-4 text-[#d97716] sm:h-5 sm:w-5" />
        </div>

        <div className="space-y-2">
          {[
            ["RSRP", "-92 dBm", "Cobertura"],
            ["SINR", "18 dB", "Calidad"],
            ["DL", "74 Mbps", "Servicio"],
          ].map(([metric, value, label], metricIndex) => (
            <div
              key={metric}
              className={`rounded-xl border bg-white px-2.5 py-2 shadow-sm ${
                metricIndex === 0 ? "border-[#f3b86f]" : "border-[#eee2d3]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[6px] font-black text-[#3d2d1d]/42 sm:text-[7px]">
                  {metric}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: metricIndex === 0 ? accent : "#71b991" }}
                />
              </div>
              <p className="mt-1 text-[8px] font-black text-[#20170f] sm:text-[10px]">
                {value}
              </p>
              <p className="text-[5px] text-[#3d2d1d]/36 sm:text-[6px]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.16}
      className="absolute right-[1%] top-[16%] z-20 w-[27%] rounded-[1.15rem] bg-[#3a2413] p-3 text-white shadow-[0_22px_55px_rgba(74,43,17,0.27)] sm:p-4"
    >
      <Gauge className="h-4 w-4 text-amber-300 sm:h-5 sm:w-5" />
      <p className="mt-3 text-[6px] font-black uppercase tracking-[0.17em] text-white/45 sm:text-[7px]">
        Degradación RF
      </p>
      <p className="mt-1.5 text-[9px] font-black leading-tight sm:text-xs">
        Zona crítica localizada
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[6px] font-bold text-amber-200 sm:text-[7px]">
        <CircleCheck className="h-3 w-3" />
        Acción priorizada
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.25}
      className="absolute bottom-[2%] left-[12%] z-30 flex w-[48%] items-center justify-between gap-2 rounded-[1.1rem] border border-white bg-white px-3 py-2.5 shadow-[0_20px_45px_rgba(91,58,25,0.16)] sm:px-4 sm:py-3"
    >
      <div className="flex items-center gap-1.5">
        <Image
          src={satelliteIcon}
          alt=""
          aria-hidden="true"
          width={25}
          height={25}
          className="h-6 w-6 object-contain sm:h-7 sm:w-7"
        />
        <div>
          <p className="text-[7px] font-black text-[#20170f] sm:text-[9px]">
            TEMS + NEMO
          </p>
          <p className="text-[5px] text-[#3d2d1d]/40 sm:text-[7px]">
            Logs, GPS y site survey
          </p>
        </div>
      </div>
      <MapPin className="h-4 w-4 shrink-0 text-[#e69334]" />
    </FloatingLayer>
  </div>
);

const TelecomExecutionVisual = ({
  accent,
  reduceMotion,
}: {
  accent: string;
  reduceMotion: boolean;
}) => (
  <div
    className="relative isolate aspect-square w-full md:aspect-[16/10]"
    role="img"
    aria-label="Integración de red con RAN, transmisión, core y validación de puesta en servicio"
  >
    <div className="absolute inset-[4%] rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,1),rgba(250,230,204,0.74)_62%,transparent_78%)]" />

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.04}
      className="absolute left-[6%] top-[6%] z-10 w-[75%] rounded-[1.4rem] border border-white bg-white p-3 shadow-[0_26px_65px_rgba(83,54,25,0.15)] sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#3d2d1d]/35 sm:text-[8px]">
            Plan de integración
          </p>
          <p className="mt-1 text-[10px] font-black text-[#20170f] sm:text-sm">
            Arquitectura de red
          </p>
        </div>
        <Network className="h-5 w-5 text-[#d97716] sm:h-6 sm:w-6" />
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
        <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-[#edbe82]" />
        {[
          { name: "RAN", role: "Radio", icon: antennaIcon },
          { name: "TX", role: "Transmisión", icon: routerIcon },
          { name: "Core", role: "Servicios", icon: satelliteIcon },
        ].map((node) => (
          <div
            key={node.name}
            className="relative rounded-xl border border-[#f0dfca] bg-[#fffaf4] px-2 py-3 text-center shadow-sm sm:rounded-2xl sm:px-3 sm:py-4"
          >
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm sm:h-11 sm:w-11">
              <Image
                src={node.icon}
                alt=""
                aria-hidden="true"
                width={30}
                height={30}
                className="h-6 w-6 object-contain sm:h-8 sm:w-8"
              />
            </div>
            <p className="mt-2 text-[7px] font-black text-[#20170f] sm:text-[9px]">
              {node.name}
            </p>
            <p className="mt-0.5 text-[5px] text-[#3d2d1d]/38 sm:text-[7px]">
              {node.role}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#fff2df] px-3 py-2 sm:mt-4">
        <ShieldCheck className="h-3.5 w-3.5 text-[#d97716] sm:h-4 sm:w-4" />
        <span className="text-[6px] font-black text-[#8c4e12] sm:text-[8px]">
          CIQ, scripts y criterios de aceptación
        </span>
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.16}
      className="absolute right-[1%] top-[18%] z-20 w-[28%] rounded-[1.15rem] border border-white bg-white p-3 shadow-[0_22px_50px_rgba(83,54,25,0.17)] sm:p-4"
    >
      <div className="flex items-center justify-between">
        <RadioTower className="h-5 w-5 text-[#d97716] sm:h-6 sm:w-6" />
        <span className="rounded-full bg-[#fff1db] px-2 py-1 text-[5px] font-black text-[#b76110] sm:text-[6px]">
          EN CAMPO
        </span>
      </div>
      <p className="mt-3 text-[9px] font-black text-[#20170f] sm:text-xs">
        Site 014
      </p>
      <div className="mt-3 space-y-2">
        {[true, true, false].map((done, itemIndex) => (
          <div key={itemIndex} className="flex items-center gap-2">
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
                done ? "bg-[#e8f7ee] text-[#16a866]" : "bg-[#f3eee7]"
              }`}
            >
              {done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
            </span>
            <span
              className={`h-1.5 rounded-full ${
                done ? "w-[62%] bg-[#cdb9a2]" : "w-[78%] bg-[#e5dbcf]"
              }`}
            />
          </div>
        ))}
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.25}
      className="absolute bottom-[2%] left-[13%] z-30 flex w-[50%] items-center gap-3 rounded-[1.15rem] bg-[#3a2413] p-3 text-white shadow-[0_22px_52px_rgba(74,43,17,0.26)] sm:p-4"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-200 sm:h-11 sm:w-11">
        <RadioTower className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[6px] font-black uppercase tracking-[0.16em] text-white/45 sm:text-[7px]">
          Puesta en servicio
        </p>
        <p className="mt-1 truncate text-[8px] font-black sm:text-[10px]">
          ON AIR validado
        </p>
      </div>
      <CircleCheck className="ml-auto h-4 w-4 shrink-0 text-emerald-300 sm:h-5 sm:w-5" />
    </FloatingLayer>
  </div>
);

const TelecomOperationVisual = ({
  accent,
  reduceMotion,
}: {
  accent: string;
  reduceMotion: boolean;
}) => (
  <div
    className="relative isolate aspect-square w-full md:aspect-[16/10]"
    role="img"
    aria-label="Operación NOC con alarmas, KPIs, soporte OyM y optimización RAN"
  >
    <div className="absolute inset-[4%] rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,1),rgba(250,230,204,0.74)_62%,transparent_78%)]" />

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.04}
      className="absolute left-[5%] top-[7%] z-10 w-[76%] rounded-[1.4rem] border border-white bg-white p-3 shadow-[0_26px_65px_rgba(83,54,25,0.15)] sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[#3d2d1d]/35 sm:text-[8px]">
            NOC · Operación 24/7
          </p>
          <p className="mt-1 text-[10px] font-black text-[#20170f] sm:text-sm">
            Desempeño multivendor
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#eaf8f0] px-2.5 py-1.5 text-[6px] font-black text-[#16895a] sm:text-[7px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#19b978]" />
          RED ESTABLE
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-[#f0dfca] bg-[#fffaf4] p-2.5 sm:mt-4 sm:p-4">
        <svg
          viewBox="0 0 420 112"
          className="h-[72px] w-full sm:h-[96px]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="telecom-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.24" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[24, 56, 88].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="420"
              y2={y}
              stroke="#ebddcd"
              strokeDasharray="4 7"
            />
          ))}
          <path
            d="M0 76 C35 79,53 57,84 64 S131 86,166 60 S212 27,247 48 S302 72,334 45 S381 30,420 37 L420 112 L0 112 Z"
            fill="url(#telecom-chart-fill)"
          />
          <path
            d="M0 76 C35 79,53 57,84 64 S131 86,166 60 S212 27,247 48 S302 72,334 45 S381 30,420 37"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="334" cy="45" r="6" fill="white" stroke={accent} strokeWidth="4" />
        </svg>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2 sm:mt-3">
        {[
          ["Disponibilidad", "En objetivo"],
          ["Alarmas", "Controladas"],
          ["KPI RF", "Estable"],
        ].map(([metric, state]) => (
          <div key={metric} className="rounded-lg bg-[#fcf7f0] px-2 py-2">
            <p className="truncate text-[5px] font-bold text-[#3d2d1d]/35 sm:text-[6px]">
              {metric}
            </p>
            <p className="mt-1 truncate text-[6px] font-black text-[#20170f]/72 sm:text-[8px]">
              {state}
            </p>
          </div>
        ))}
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.15}
      className="absolute right-[1%] top-[12%] z-20 w-[27%] rounded-[1.15rem] bg-[#3a2413] p-3 text-white shadow-[0_22px_52px_rgba(74,43,17,0.26)] sm:p-4"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-300/15 text-amber-200 sm:h-10 sm:w-10">
        <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <p className="mt-3 text-[6px] font-black uppercase tracking-[0.16em] text-white/45 sm:text-[7px]">
        OyM activo
      </p>
      <p className="mt-1.5 text-[9px] font-black leading-tight sm:text-xs">
        Alarmas correlacionadas
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[6px] font-bold text-emerald-300 sm:text-[7px]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
        Escalamiento listo
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.23}
      className="absolute bottom-[3%] left-[9%] z-30 flex w-[50%] items-center gap-2 rounded-[1.15rem] border border-white bg-white p-2.5 shadow-[0_20px_48px_rgba(83,54,25,0.16)] sm:gap-3 sm:p-3.5"
    >
      <Image
        src={monitorIcon}
        alt=""
        aria-hidden="true"
        width={30}
        height={30}
        className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
      />
      <div className="min-w-0">
        <p className="truncate text-[7px] font-black text-[#20170f] sm:text-[9px]">
          U2020 · ENM · NetAct
        </p>
        <p className="mt-0.5 truncate text-[5px] text-[#3d2d1d]/40 sm:text-[7px]">
          Visibilidad OSS unificada
        </p>
      </div>
    </FloatingLayer>

    <FloatingLayer
      reduceMotion={reduceMotion}
      delay={0.31}
      className="absolute bottom-[5%] right-[1%] z-40 w-[30%] rounded-[1.15rem] border border-[#f0d5b3] bg-[#fff2df] p-3 shadow-[0_18px_42px_rgba(123,75,24,0.15)] sm:p-4"
    >
      <div className="flex items-center justify-between text-[#d97716]">
        <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
        <RotateCw className="h-3.5 w-3.5 opacity-55 sm:h-4 sm:w-4" />
      </div>
      <p className="mt-2.5 text-[6px] font-black uppercase tracking-[0.15em] text-[#b76110]/60 sm:text-[7px]">
        Optimización RAN
      </p>
      <p className="mt-1 text-[8px] font-black leading-tight text-[#20170f] sm:text-[10px]">
        Tuning priorizado por KPI
      </p>
    </FloatingLayer>
  </div>
);

const ProcessVisual = ({
  phase,
  accent,
  reduceMotion,
  isTelecom,
}: {
  phase: number;
  accent: string;
  reduceMotion: boolean;
  isTelecom: boolean;
}) => {
  if (isTelecom) {
    if (phase === 0) {
      return <TelecomDiagnosisVisual accent={accent} reduceMotion={reduceMotion} />;
    }

    if (phase === 1) {
      return <TelecomExecutionVisual accent={accent} reduceMotion={reduceMotion} />;
    }

    return <TelecomOperationVisual accent={accent} reduceMotion={reduceMotion} />;
  }

  if (phase === 0) {
    return <DiagnosisVisual accent={accent} reduceMotion={reduceMotion} />;
  }

  if (phase === 1) {
    return <ExecutionVisual accent={accent} reduceMotion={reduceMotion} />;
  }

  return <OperationVisual accent={accent} reduceMotion={reduceMotion} />;
};

export const WorkProcess = ({ mode }: { mode: SiteMode }) => {
  const theme = getModeTheme(mode);
  const steps = theme.isTelecom ? telecomSteps : softwareSteps;

  return (
    <ScrollProcessStory
      steps={steps}
      accent={theme.accent}
      title={theme.isTelecom ? "De la red al rendimiento" : "De entender tu operación a hacerla evolucionar"}
      renderVisual={(phase, reduceMotion) => (
        <ProcessVisual phase={phase} accent={theme.accent} reduceMotion={reduceMotion} isTelecom={theme.isTelecom} />
      )}
    />
  );
};
