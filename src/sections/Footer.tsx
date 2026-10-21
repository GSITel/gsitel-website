import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logos/gsitel_services.png";
import SocialLinkedIn from "@/assets/icons/social-linkedin.svg";
import type { SiteMode } from "@/lib/siteMode";

const footerLinks = [
  { href: "/aboutus", label: "Nosotros" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#clientes", label: "Clientes" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#contacto", label: "Contacto" },
];

export const Footer = ({ mode }: { mode?: SiteMode }) => {
  const isTelecom = mode === "telecom";
  const serviceLabels = isTelecom
    ? ["Despliegue e integración RAN", "Transmisión y backhaul", "Drive Test y optimización RF", "Soporte OyM y NOC"]
    : ["Desarrollo de software", "Automatización e IA", "Ingeniería RAN", "Consultoría TI"];
  return (
    <footer className="relative bg-transparent px-4 pb-10 pt-0 text-sm text-white/70 sm:px-6 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/#acerca" className="inline-flex rounded-xl bg-white p-2.5 shadow-lg">
              <Image
                src={logo}
                height={40}
                width={160}
                alt="GSITEL Services"
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/60">
              {isTelecom
                ? "Ingeniería, integración y soporte de telecomunicaciones para operaciones críticas en Latinoamérica."
                : "Software integral y ingeniería telecom para operaciones críticas en Latinoamérica."}
            </p>
            <a
              href="mailto:soporte@gsitel-solutions.com"
              className="mt-3 inline-block break-all text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 sm:break-normal"
            >
              soporte@gsitel-solutions.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                Navegación
              </p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-medium text-white/75 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                Servicios
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-white/75">
                {serviceLabels.map((label) => <li key={label}>{label}</li>)}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                Redes
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/60 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-cyan-300"
                  aria-label="LinkedIn"
                >
                  <SocialLinkedIn className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © 2026 GSITEL Services S.A.C. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/40">
            Lima, Perú · {isTelecom ? "Telecomunicaciones" : "Software & Telecom"}
          </p>
        </div>
      </div>
    </footer>
  );
};
