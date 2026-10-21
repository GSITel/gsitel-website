"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SiteMode } from "@/lib/siteMode";
import { Header } from "@/sections/Header";
import { AboutHero } from "@/sections/AboutHero";
import { Services } from "@/sections/Services";
import { WorkProcess } from "@/sections/WorkProcess";
import { DarkSectionsShell } from "@/components/DarkSectionsShell";
import { CtaFooterShell } from "@/components/CtaFooterShell";
import { Footer } from "@/sections/Footer";
import { scrollToSection } from "@/lib/smoothSectionScroll";

const DigitalTransformation = dynamic(
  () =>
    import("@/sections/DigitalTransformation").then(
      (module) => module.DigitalTransformation,
    ),
);

const KnowledgeStack = dynamic(
  () =>
    import("@/sections/KnowledgeStack").then((module) => module.KnowledgeStack),
  { ssr: false },
);

const Projects = dynamic(
  () => import("@/sections/Projects").then((module) => module.Projects),
  { ssr: false },
);

const Testimonials = dynamic(
  () =>
    import("@/sections/Testimonials").then((module) => module.Testimonials),
  { ssr: false },
);

const Contact = dynamic(
  () => import("@/sections/Contact").then((module) => module.Contact),
  { ssr: false },
);

const ModeAwareSection = ({
  mode,
  children,
  className,
}: {
  mode: SiteMode;
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    key={mode}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const HomeShell = () => {
  const [mode, setMode] = useState<SiteMode>("software");
  const [transitionMode, setTransitionMode] = useState<SiteMode>("software");
  const [isSwitchingMode, setIsSwitchingMode] = useState(false);
  const isSwitchingModeRef = useRef(false);
  const switchStartTimerRef = useRef<number | null>(null);
  const switchEndTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href");
      if (!href || (!href.startsWith("#") && !href.startsWith("/#"))) {
        return;
      }
      if (href.startsWith("/#") && window.location.pathname !== "/") {
        return;
      }

      const sectionId = href.startsWith("/#") ? href.slice(2) : href.slice(1);
      if (sectionId && scrollToSection(sectionId)) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", handleInternalNavigation, true);
    return () => document.removeEventListener("click", handleInternalNavigation, true);
  }, []);

  useEffect(() => {
    return () => {
      if (switchStartTimerRef.current) {
        window.clearTimeout(switchStartTimerRef.current);
      }
      if (switchEndTimerRef.current) {
        window.clearTimeout(switchEndTimerRef.current);
      }
      isSwitchingModeRef.current = false;
    };
  }, []);

  const handleModeChange = (nextMode: SiteMode) => {
    if (nextMode === mode || isSwitchingModeRef.current) {
      return;
    }

    if (switchStartTimerRef.current) {
      window.clearTimeout(switchStartTimerRef.current);
    }
    if (switchEndTimerRef.current) {
      window.clearTimeout(switchEndTimerRef.current);
    }

    setTransitionMode(nextMode);
    isSwitchingModeRef.current = true;
    setIsSwitchingMode(true);

    switchStartTimerRef.current = window.setTimeout(() => {
      setMode(nextMode);
    }, 180);

    switchEndTimerRef.current = window.setTimeout(() => {
      isSwitchingModeRef.current = false;
      setIsSwitchingMode(false);
    }, 980);
  };

  return (
    <>
      <Header mode={mode} onModeChange={handleModeChange} />
      <main>
        <div className="relative flex min-h-svh min-h-[100dvh] flex-col">
          <ModeAwareSection mode={mode} className="flex min-h-0 flex-1 flex-col">
            <AboutHero mode={mode} />
          </ModeAwareSection>
        </div>
        <ModeAwareSection mode={mode}>
          <DarkSectionsShell mode={mode}>
            {mode === "telecom" && <DigitalTransformation mode={mode} />}
            <Services mode={mode} />
          </DarkSectionsShell>
          <Projects mode={mode} />
          <WorkProcess mode={mode} />
          {mode === "software" && (
            <details className="technical-details">
              <summary>Ver nuestras capacidades técnicas</summary>
              <KnowledgeStack mode={mode} />
            </details>
          )}
          <Testimonials mode={mode} />
          <CtaFooterShell>
            <Contact mode={mode} />
            <Footer />
          </CtaFooterShell>
        </ModeAwareSection>
      </main>
      <AnimatePresence>
        {isSwitchingMode && (
          <motion.div
            key="mode-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-30 flex cursor-wait items-center justify-center bg-[#020408]/38 backdrop-blur-[3px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
                transitionMode === "telecom"
                  ? "border-amber-200/30 bg-[linear-gradient(90deg,rgba(12,8,4,0.82),rgba(91,48,13,0.72))]"
                  : "border-cyan-200/30 bg-[linear-gradient(90deg,rgba(4,15,34,0.82),rgba(18,69,128,0.72))]"
              }`}
            >
              {transitionMode === "telecom" ? "Modo telecom" : "Modo software"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
