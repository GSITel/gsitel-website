import { AboutUsExperience } from "@/sections/AboutUsExperience";
import { AboutContact } from "@/components/about/AboutContact";
import { CtaFooterShell } from "@/components/CtaFooterShell";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de Nosotros",
  description: "Conoce a GSITEL, empresa de ingeniería de software e innovación deportiva en Perú. Creamos software a medida, plataformas deportivas y automatización.",
  alternates: { canonical: "/aboutus" },
  keywords: ["GSITEL", "ingeniería de software", "innovación deportiva", "software a medida", "software deportivo", "automatización", "Perú", "LATAM"],
  openGraph: {
    title: "GSITEL | Nuestro equipo de software e innovación deportiva",
    description: "Conoce a GSITEL, empresa de ingeniería de software e innovación deportiva en Perú. Creamos software a medida, plataformas deportivas y automatización.",
    url: "https://gsitelservices.com/aboutus",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GSITEL — Ingeniería de software e innovación deportiva" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GSITEL | Nuestro equipo de software e innovación deportiva",
    description: "Conoce a GSITEL, empresa de ingeniería de software e innovación deportiva en Perú. Creamos software a medida, plataformas deportivas y automatización.",
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
