import entelLogo from "@/assets/logos/entel-logo.png";
import internetTodosLogo from "@/assets/logos/internettodos-logo.png";
import telradChileLogo from "@/assets/logos/telradchile.png";
import telefonicaLogo from "@/assets/logos/telefonica-logo.png";
import type { ProjectCardData } from "@/data/projects/types";

export const telecomProjects: ProjectCardData[] = [
  {
    id: "telrad",
    detailImagesKey: "telecomRan",
    title: "RAN consolidado Entel Chile",
    tag: "Telrad Chile",
    description:
      "Soporte de comisionamiento e integración en proyecto RAN consolidado.",
    highlights: [
      "Comisionamiento e integración Ericsson 4G-5G",
      "SWAP y modernización RANCO",
      "Expansión de portadoras AWS, APT e implementación VOLTE",
    ],
    image: telradChileLogo,
    imageAlt: "Telrad Chile logo",
    accent: "#f7c948",
  },
  {
    id: "refarming",
    detailImagesKey: "telecomRefarming",
    title: "Refarming 2G/3G/4G banda 850/1900",
    tag: "Telefónica Perú",
    description:
      "Seguimiento y control del refarming con soporte a comisionamiento e integración multivendor.",
    highlights: [
      "Control y seguimiento del proyecto de refarming",
      "Comisionamiento e integración 2G/3G/4G/5G",
      "Procesos ENM/TAISHAN y parametrización",
    ],
    image: telefonicaLogo,
    imageAlt: "Telefónica logo",
    accent: "#8ab4ff",
  },
  {
    id: "entel-events",
    detailImagesKey: "telecomEvents",
    title: "Eventos RAN Entel Perú",
    tag: "Entel Perú",
    description:
      "Coordinación de implementación e integración para eventos RAN con supervisión de estándar Huawei.",
    highlights: [
      "Supervisión de instalación 2G/3G/4G/5G",
      "Revisiones y pruebas de enrutamiento TX",
      "Monitoreo y validación de servicios RAN",
    ],
    image: entelLogo,
    imageAlt: "Entel logo",
    accent: "#7be0ff",
  },
  {
    id: "ipt",
    detailImagesKey: "telecomRural",
    title: "Puesta ON AIR RAN rural",
    tag: "Internet Para Todos",
    description:
      "Planificación, coordinación y ejecución de estaciones rurales 2G/3G/4G.",
    highlights: [
      "Puesta en servicio de estaciones rurales móviles",
      "Proyectos especiales CRAN y RAN Sharing",
      "Coordinación multivendor Ericsson/Huawei",
      "Soporte de ingeniería RAN y averías OyM NOC",
    ],
    image: internetTodosLogo,
    imageAlt: "Internet Para Todos logo",
    accent: "#62e291",
  },
  {
    id: "entel-rollout",
    detailImagesKey: "telecomRollout",
    title: "Rollout, expansión y modernización RAN/TX",
    tag: "Entel Perú",
    description:
      "Planificación y ejecución de rollout, expansión, swap y modernización RAN/TX.",
    highlights: [
      "Soporte de implementación RAN/TX Huawei",
      "Comisionamiento e integración BBU5900 2G/3G/4G/5G",
      "Consultoría de diseño RAN",
    ],
    image: entelLogo,
    imageAlt: "Entel logo",
    accent: "#f2b45b",
  },
];
