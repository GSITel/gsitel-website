import cuadraiAppLogo from "@/assets/logos/cuadrailogo.png";
import xtremeLogo from "@/assets/logos/logo_xtreme.png";
import vaProfesionalesLogo from "@/assets/logos/va-profesionales.png";
import villasSinFronterasLogo from "@/assets/logos/vsf_logo.png";
import webAppImage from "@/assets/illustrations/webapp.png";
import type { ProjectCardData } from "@/data/projects/types";

export const softwareProjects: ProjectCardData[] = [
  {
    id: "pichangapp",
    title: "CUADRAI PE",
    tag: "Proyecto destacado",
    description:
      "Plataforma para alquilar canchas deportivas, consultar disponibilidad y gestionar reservas desde una experiencia móvil.",
    detail:
      "CUADRAI PE es la plataforma principal de alquiler de canchas deportivas. Diseñamos una experiencia digital clara para consultar disponibilidad, reservar y administrar la operación de cada espacio desde una sola solución.",
    techTags: ["Python", "React Native"],
    detailImagesKey: "cuadraiOnboarding",
    highlights: [
      "Disponibilidad de canchas en tiempo real",
      "Reservas desde la app móvil",
      "Gestión operativa de espacios deportivos",
    ],
    image: cuadraiAppLogo,
    imageAlt: "Logo de CUADRAI PE",
    accent: "#2f9edb",
    projectUrl: "https://cuadraipe.com/",
    projectUrlLabel: "Visitar CUADRAI PE",
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.cuadraipe.cuadrai&pcampaignid=web_share",
      appStore: "https://apps.apple.com/us/app/cuadrai/id6793684461",
    },
    galleryMode: "phone",
    brandLogo: true,
  },
  {
    id: "sunat",
    title: "V&A Profesionales",
    tag: "Estudio contable",
    description:
      "Sitio web, aplicación de gestión y automatización SUNAT para un estudio contable moderno.",
    detail:
      "Para V&A Profesionales desarrollamos su presencia web y una solución operativa que automatiza procesos contables con SUNAT. La plataforma integra la consulta de ventas, compras y cobranzas para generar reportes por cliente y agilizar validaciones financieras.",
    techTags: ["n8n", "Python", "APIs"],
    detailImagesKey: "sunat",
    highlights: [
      "Página web institucional",
      "Aplicación web para la gestión contable",
      "Automatización de reportes e integraciones SUNAT",
    ],
    image: vaProfesionalesLogo,
    imageAlt: "Logo de V&A Profesionales",
    accent: "#7fb7ff",
    projectUrl: "https://vaprofesionales.com/",
    projectUrlLabel: "Visitar V&A Profesionales",
    brandLogo: true,
  },
  {
    id: "xtreme",
    title: "Xtreme Fitness Sport",
    tag: "Fitness & bienestar",
    description:
      "Experiencia digital para una marca fitness que busca atraer, informar y convertir nuevos miembros.",
    detail:
      "Caso de éxito para Xtreme Fitness Sport: desarrollamos la experiencia pública del website y una aplicación interna para administrar clientes, planes, horarios y catálogo desde una sola operación.",
    techTags: ["Web Design", "UI/UX", "SEO"],
    detailImagesKey: "xtreme",
    highlights: [
      "Website para comunicar la propuesta y captar nuevos miembros",
      "Panel administrativo para clientes, planes y promociones",
      "Gestión de horarios y catálogo desde la app",
    ],
    image: xtremeLogo,
    imageAlt: "Logo de Xtreme Fitness Sport",
    accent: "#20ef18",
    projectUrl: "https://xtremefitnesssport.com/",
    projectUrlLabel: "Visitar Xtreme Fitness Sport",
    brandLogo: true,
  },
  {
    id: "ong",
    title: "Villas Sin Fronteras",
    tag: "Organización social",
    description:
      "Sitio web que comunica el propósito, los resultados y las historias de una organización que impulsa oportunidades para jóvenes.",
    detail:
      "Página web diseñada para Villas Sin Fronteras, una organización enfocada en apoyar a la juventud mediante becas deportivas. El sitio comunica su propósito, muestra resultados e historias, y facilita el contacto con aliados y beneficiarios.",
    techTags: ["UI/UX", "Web Design", "SEO"],
    detailImagesKey: "ong",
    highlights: [
      "UI/UX orientado a objetivos",
      "Performance y SEO técnico",
      "Integración con formularios y CRM",
    ],
    image: villasSinFronterasLogo,
    imageAlt: "Logo de Villas Sin Fronteras",
    accent: "#8dbbff",
    projectUrl: "https://www.villasinfronteras.org/",
    projectUrlLabel: "Visitar Villas Sin Fronteras",
    brandLogo: true,
  },
  {
    id: "ascensores",
    title: "Ascensores S.A.",
    tag: "Aplicación web a medida",
    description:
      "Plataforma de gestión interna para centralizar operaciones comerciales, proyectos y catálogos técnicos.",
    detail:
      "Aplicación desarrollada para Ascensores S.A. para reemplazar procesos dispersos en Microsoft Office y SharePoint. El sistema centraliza la información comercial, el seguimiento de proyectos y los catálogos operativos en una sola herramienta.",
    techTags: ["React", ".NET Core", "MySQL"],
    detailImagesKey: "ascensores",
    highlights: [
      "Paneles administrativos personalizados",
      "APIs seguras e integraciones",
      "Arquitectura escalable",
    ],
    image: webAppImage,
    imageAlt: "Aplicación web de Ascensores S.A.",
    accent: "#9ac7ff",
  },
];
