import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ClientRuntimeGuard } from "@/components/ClientRuntimeGuard";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gsitelservices.com"),
  title: {
    default: "GSITEL | Ingeniería de software e innovación deportiva",
    template: "%s | GSITEL Services S.A.C.",
  },
  description:
    "Empresa de ingeniería de software e innovación deportiva en Perú. Desarrollamos software a medida, plataformas deportivas y automatización para empresas.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "GSITEL",
    "ingeniería de software",
    "innovación deportiva",
    "software deportivo",
    "plataformas deportivas",
    "gestión de espacios deportivos",
    "software para academias y campeonatos",
    "software a medida",
    "desarrollo de software Perú",
    "aplicaciones web",
    "páginas web para empresas",
    "automatización de procesos",
    "automatización SUNAT",
    "inteligencia artificial para empresas",
    "soluciones digitales para empresas",
    "Perú",
  ],
  applicationName: "GSITEL Services",
  authors: [{ name: "GSITEL Services S.A.C." }],
  creator: "GSITEL Services S.A.C.",
  publisher: "GSITEL Services S.A.C.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "GSITEL | Ingeniería de software e innovación deportiva",
    description:
      "Empresa de ingeniería de software e innovación deportiva en Perú. Desarrollamos software a medida, plataformas deportivas y automatización para empresas.",
    type: "website",
    locale: "es_PE",
    siteName: "GSITEL Services S.A.C.",
    url: "https://gsitelservices.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GSITEL — Ingeniería de software e innovación deportiva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GSITEL | Ingeniería de software e innovación deportiva",
    description:
      "Empresa de ingeniería de software e innovación deportiva en Perú. Desarrollamos software a medida, plataformas deportivas y automatización para empresas.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  category: "Technology",
};

export const viewport: Viewport = {
  themeColor: "#0b1d3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="relative">
      <body className={twMerge(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        <ClientRuntimeGuard />
        {children}
      </body>
    </html>
  );
}
