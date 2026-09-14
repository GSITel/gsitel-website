import factVentas from "@/assets/projects/n8n/fact-ventas-automatization.jpeg";
import factReport from "@/assets/projects/n8n/factreportresponsegmail.jpeg";
import ascensoresLogin from "@/assets/projects/ascensores/loggin.png";
import ascensoresHome from "@/assets/projects/ascensores/home.jpeg";
import ascensoresChart from "@/assets/projects/ascensores/chart.jpeg";
import ascensoresNuevo1 from "@/assets/projects/ascensores/nuevo-1.jpeg";
import ascensoresNuevo2 from "@/assets/projects/ascensores/nuevo-2.jpeg";
import ascensoresNuevo3 from "@/assets/projects/ascensores/nuevo-3.jpeg";
import ascensoresEliminar from "@/assets/projects/ascensores/eliminar.jpeg";
import ascensoresConstructoras from "@/assets/projects/ascensores/constructoras.jpeg";
import ascensoresDistritos from "@/assets/projects/ascensores/distritos.jpeg";
import ascensoresSwagger from "@/assets/projects/ascensores/swagger.jpeg";
import ongHero from "@/assets/projects/paginas/hero_vsf.png";
import ongAbout from "@/assets/projects/paginas/about_vsf.png";
import ongResults from "@/assets/projects/paginas/results_vsf.png";
import ongTeam from "@/assets/projects/paginas/team_vsf.png";
import ongNews from "@/assets/projects/paginas/news_vsf.png";
import ongContact from "@/assets/projects/paginas/contact_vsf.png";
import cuadraiWebHome from "@/assets/projects/cuadrai/webapp-home.png";
import cuadraiWebProblem from "@/assets/projects/cuadrai/web-problematica.png";
import cuadraiWebPayments from "@/assets/projects/cuadrai/web-pagos.png";
import cuadraiWebTwoSides from "@/assets/projects/cuadrai/web-dosfrentes.png";
import cuadraiWebDiscover from "@/assets/projects/cuadrai/web-descubre.png";
import cuadraiOnboarding1 from "@/assets/projects/cuadrai/onboarding1.png";
import cuadraiOnboarding2 from "@/assets/projects/cuadrai/onboarding2.png";
import cuadraiOnboarding3 from "@/assets/projects/cuadrai/onboarding3.png";
import cuadraiOnboarding4 from "@/assets/projects/cuadrai/onboarding4.png";
import cuadraiOnboarding5 from "@/assets/projects/cuadrai/onboarding5.png";
import xtremeWebHero from "@/assets/projects/xtreme/web-hero.png";
import xtremeWebSection from "@/assets/projects/xtreme/web-section.png";
import xtremeAppPanel from "@/assets/projects/xtreme/app-panel.png";
import xtremeAppHorarios from "@/assets/projects/xtreme/app-horarios.png";
import xtremeAppCatalogo from "@/assets/projects/xtreme/app-catalogo.png";
import type { ProjectDetailImage } from "@/data/projects/types";

const DETAIL_IMAGES: Record<string, ProjectDetailImage[]> = {
  sunat: [
    { src: factVentas, alt: "Automatización de ventas SUNAT" },
    { src: factReport, alt: "Reporte automatizado por correo" },
  ],
  ascensores: [
    { src: ascensoresLogin, alt: "Ascensores Tools login" },
    { src: ascensoresHome, alt: "Ascensores Tools home" },
    { src: ascensoresChart, alt: "Ascensores Tools charts" },
    { src: ascensoresNuevo1, alt: "Ascensores Tools nuevo 1" },
    { src: ascensoresNuevo2, alt: "Ascensores Tools nuevo 2" },
    { src: ascensoresNuevo3, alt: "Ascensores Tools nuevo 3" },
    { src: ascensoresEliminar, alt: "Ascensores Tools eliminar" },
    { src: ascensoresConstructoras, alt: "Ascensores Tools constructoras" },
    { src: ascensoresDistritos, alt: "Ascensores Tools distritos" },
    { src: ascensoresSwagger, alt: "Ascensores Tools swagger" },
  ],
  ong: [
    { src: ongHero, alt: "ONG becas deportivas hero" },
    { src: ongAbout, alt: "ONG becas deportivas acerca" },
    { src: ongResults, alt: "ONG becas deportivas resultados" },
    { src: ongTeam, alt: "ONG becas deportivas equipo" },
    { src: ongNews, alt: "ONG becas deportivas noticias" },
    { src: ongContact, alt: "ONG becas deportivas contacto" },
  ],
  cuadrai: [
    { src: cuadraiWebHome, alt: "CUADRAI panel principal" },
    { src: cuadraiWebProblem, alt: "CUADRAI problemática que resuelve" },
    { src: cuadraiWebPayments, alt: "CUADRAI pagos y reservas" },
    { src: cuadraiWebTwoSides, alt: "CUADRAI experiencia para jugadores y administradores" },
    { src: cuadraiWebDiscover, alt: "CUADRAI descubrimiento de canchas" },
  ],
  cuadraiOnboarding: [
    { src: cuadraiOnboarding1, alt: "CUADRAI onboarding inicial", format: "phone" },
    { src: cuadraiOnboarding2, alt: "CUADRAI onboarding para jugar", format: "phone" },
    { src: cuadraiOnboarding3, alt: "CUADRAI onboarding para encontrar jugadores", format: "phone" },
    { src: cuadraiOnboarding4, alt: "CUADRAI panel para gestionar negocios", format: "phone" },
    { src: cuadraiOnboarding5, alt: "CUADRAI asistente conversacional", format: "phone" },
    { src: cuadraiWebPayments, alt: "CUADRAI pagos y reservas", format: "screen" },
    { src: cuadraiWebDiscover, alt: "CUADRAI descubrimiento de canchas", format: "screen" },
  ],
  xtreme: [
    { src: xtremeWebHero, alt: "Xtreme Fitness Sport website principal" },
    { src: xtremeWebSection, alt: "Xtreme Fitness Sport sección del website" },
    { src: xtremeAppPanel, alt: "Xtreme Fitness Sport panel administrativo" },
    { src: xtremeAppHorarios, alt: "Xtreme Fitness Sport gestión de horarios" },
    { src: xtremeAppCatalogo, alt: "Xtreme Fitness Sport catálogo de planes" },
  ],
};

export async function loadProjectDetailImages(
  key: string,
): Promise<ProjectDetailImage[]> {
  return getProjectDetailImages(key);
}

export function getProjectDetailImages(key?: string): ProjectDetailImage[] {
  return key ? DETAIL_IMAGES[key] ?? [] : [];
}
