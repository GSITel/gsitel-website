"use client";

import Logo from "@/assets/logos/gsitel_services.png";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import type { SiteMode } from "@/lib/siteMode";
import { scrollToSection } from "@/lib/smoothSectionScroll";

type HeaderProps = {
  mode?: SiteMode;
  onModeChange?: (mode: SiteMode) => void;
};

const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#metodologia", label: "Cómo trabajamos" },
  { href: "/aboutus", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

const ModeToggle = ({
  mode,
  onModeChange,
}: {
  mode: SiteMode;
  onModeChange: (mode: SiteMode) => void;
}) => {
  const isTelecom = mode === "telecom";

  return (
    <button
      type="button"
      onClick={() => onModeChange(isTelecom ? "software" : "telecom")}
      className="relative inline-flex h-9 shrink-0 items-center rounded-full border border-white/20 bg-black/30 p-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-white/80 backdrop-blur-md transition hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 sm:text-[10px]"
      aria-label={`Cambiar a modo ${isTelecom ? "software" : "telecom"}`}
      aria-pressed={isTelecom}
    >
      <span
        className={`relative z-10 rounded-full px-3 py-1.5 transition ${
          !isTelecom ? "text-[#0b1d3a]" : "text-white/65"
        }`}
      >
        Software
      </span>
      <span
        className={`relative z-10 rounded-full px-3 py-1.5 transition ${
          isTelecom ? "text-white" : "text-white/65"
        }`}
      >
        Telecom
      </span>
      <span
        className={`absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full transition-all duration-300 ${
          isTelecom
            ? "left-[calc(50%+1px)] bg-[#f39c36] shadow-[0_0_16px_rgba(243,156,54,0.5)]"
            : "left-0.5 bg-white shadow-[0_0_16px_rgba(255,255,255,0.25)]"
        }`}
        aria-hidden="true"
      />
    </button>
  );
};

export const Header = ({ mode, onModeChange }: HeaderProps) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [localMode, setLocalMode] = useState<SiteMode>("software");
  const activeMode = mode ?? localMode;
  const handleModeChange = onModeChange ?? setLocalMode;
  const visibleNavLinks = navLinks;

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("/#") || window.location.pathname !== "/") {
      return;
    }

    if (!scrollToSection(href.slice(2))) {
      return;
    }

    event.preventDefault();
    setIsMenuOpen(false);
    setActiveSection(href);
  };

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY <= 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleResize = () => {
      if (window.innerWidth >= 1201) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header className="fixed left-0 top-0 z-20 w-full">
      <div
        className={`border-b bg-transparent backdrop-blur-xl transition-all duration-500 ${
          isAtTop
            ? "border-white/[0.06]"
            : "border-cyan-200/10 shadow-[0_14px_44px_rgba(4,14,32,0.24)]"
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 py-3 sm:px-6 md:py-3.5 xl:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/#acerca"
              onClick={(event) => handleSectionNavigation(event, "/#acerca")}
              className="group flex shrink-0 items-center rounded-xl border border-white/40 bg-white p-2 shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(0,0,0,0.24)]"
              aria-label="Ir al inicio"
            >
              <Image
                src={Logo}
                alt="GSITEL Logo"
                height={180}
                width={180}
                className="h-8 w-auto md:h-9"
              />
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-white transition hover:border-white/30 hover:bg-white/10 min-[1201px]:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            <nav
              className={`hidden items-center gap-1 rounded-2xl border border-white/12 bg-[#0a2f5f] px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_34px_rgba(10,47,95,0.22)] backdrop-blur-md min-[1201px]:flex ${
                isAtTop ? "text-shadow-hero" : ""
              }`}
            >
              {visibleNavLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleSectionNavigation(event, link.href)}
                    aria-current={activeSection === link.href ? "location" : undefined}
                    className={`rounded-xl px-3.5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white/[0.12] ${activeSection === link.href ? "bg-white/[0.14] text-cyan-100 shadow-[inset_0_0_0_1px_rgba(125,211,252,0.2)]" : ""}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3.5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white/[0.12]"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <div className="ml-1 border-l border-white/10 pl-2">
                <ModeToggle mode={activeMode} onModeChange={handleModeChange} />
              </div>
            </nav>
          </div>

          <div
            className={`min-[1201px]:hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <nav className="mt-3 flex flex-col gap-1 rounded-2xl border border-white/12 bg-[rgba(8,20,42,0.97)] p-3 text-white/90 shadow-[0_24px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl">
              <div className="mb-2 flex justify-center">
                <ModeToggle mode={activeMode} onModeChange={handleModeChange} />
              </div>
              {visibleNavLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleSectionNavigation(event, link.href)}
                    aria-current={activeSection === link.href ? "location" : undefined}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10 ${activeSection === link.href ? "bg-white/10 text-cyan-100" : ""}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      </div>

    </header>
  );
};
