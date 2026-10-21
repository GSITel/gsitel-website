import { AboutUsExperience } from "@/sections/AboutUsExperience";
import { AboutContact } from "@/components/about/AboutContact";
import { CtaFooterShell } from "@/components/CtaFooterShell";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de Nosotros",
  description: "Conoce a GSITEL Services S.A.C.: ingeniería telecom, software y automatización para operaciones críticas en Latinoamérica.",
  alternates: { canonical: "/aboutus" },
  keywords: ["GSITEL", "telecomunicaciones", "software a medida", "automatización", "ingeniería RAN", "Perú", "LATAM"],
  openGraph: {
    title: "Acerca de Nosotros | GSITEL Services S.A.C.",
    description: "El equipo y la forma de trabajar de GSITEL: conectividad, software y automatización para operaciones críticas.",
    url: "https://gsitelservices.com/aboutus",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Acerca de GSITEL Services S.A.C." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acerca de Nosotros | GSITEL Services S.A.C.",
    description: "El equipo y la forma de trabajar de GSITEL: conectividad, software y automatización para operaciones críticas.",
    images: ["/og-image.png"],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <Header showModeToggle={false} />
      <AboutUsExperience />
      <CtaFooterShell>
        <AboutContact />
        <Footer />
      </CtaFooterShell>
    </>
  );
}
