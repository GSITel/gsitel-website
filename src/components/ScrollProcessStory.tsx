"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Activity, ArrowDown, ArrowUpRight, Code2, Search } from "lucide-react";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import styles from "./ScrollProcessStory.module.css";
import { ClaudeCharacter } from "./ClaudeCharacter";

type Step = { number: string; title: string; description: string; detail: readonly string[] };
type Props = {
  steps: readonly Step[];
  title: string;
  accent: string;
  renderVisual: (phase: number, reduceMotion: boolean) => ReactNode;
};

function ScrollSceneLayer({ progress, index, total, active, reduceMotion, children }: {
  progress: MotionValue<number>; index: number; total: number; active: boolean; reduceMotion: boolean; children: ReactNode;
}) {
  const y = useTransform(progress, (value) => Math.round((0.5 - (value * total - index)) * 48));
  return <motion.div className={styles.visual} aria-hidden={!active} inert={!active ? true : undefined}
    initial={false}
    animate={{ opacity: active ? 1 : 0, scale: reduceMotion || active ? 1 : 0.97 }}
    transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
    style={{ pointerEvents: active ? "auto" : "none", y: reduceMotion ? 0 : y }}>
    {children}
  </motion.div>;
}

export function ScrollProcessStory({ steps, title, accent, renderVisual }: Props) {
  const root = useRef<HTMLElement>(null);
  const scrollAnimation = useRef<{ stop: () => void } | null>(null);
  const phaseIndicatorId = useId();
  const [active, setActive] = useState(0);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 28, restDelta: 0.001 });
  const progress = reduceMotion ? scrollYProgress : smoothProgress;
  useMotionValueEvent(progress, "change", (value) => {
    setActive(Math.max(0, Math.min(steps.length - 1, Math.floor(value * steps.length))));
  });

  useEffect(() => {
    const stopTravel = () => scrollAnimation.current?.stop();
    const stopFromKeyboard = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) stopTravel();
    };
    window.addEventListener("wheel", stopTravel, { passive: true });
    window.addEventListener("touchstart", stopTravel, { passive: true });
    window.addEventListener("keydown", stopFromKeyboard);
    return () => {
      stopTravel();
      window.removeEventListener("wheel", stopTravel);
      window.removeEventListener("touchstart", stopTravel);
      window.removeEventListener("keydown", stopFromKeyboard);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) scrollAnimation.current?.stop();
  }, [reduceMotion]);

  function goToPhase(index: number) {
    if (!root.current) return;
    const top = root.current.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, root.current.offsetHeight - window.innerHeight);
    const target = top + distance * ((index + 0.5) / steps.length);
    scrollAnimation.current?.stop();
    if (reduceMotion) {
      window.scrollTo({ top: target, behavior: "instant" });
      return;
    }
    const travel = Math.abs(target - window.scrollY);
    if (travel < 2) return;
    scrollAnimation.current = animate(window.scrollY, target, {
      duration: Math.min(2.8, Math.max(1.5, travel / window.innerHeight * 1.25)),
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (position) => window.scrollTo({ top: position, behavior: "instant" }),
    });
  }

  return (
    <section ref={root} id="metodologia" className={styles.story} data-reduced={reduceMotion} aria-labelledby="work-process-title" style={{ "--story-accent": accent } as React.CSSProperties}>
      <div className={styles.sticky}>
        <motion.header className={styles.header}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>
          <div>
            <p className="section-eyebrow-light">Cómo trabajamos</p>
            <h2 id="work-process-title" className="section-title-light">{title}</h2>
          </div>
          <span className={styles.scrollHint}><ArrowDown size={16} aria-hidden="true" /> El proceso, paso a paso</span>
        </motion.header>

        <motion.div className={styles.cinema}
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.15, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
          <div className={styles.scene}>
            <div className={styles.sceneLabel} aria-hidden="true">GSITEL / DEL CONTEXTO AL PRODUCTO</div>
            <div className={styles.visuals}>
              {steps.map((step, index) => (
                <ScrollSceneLayer key={step.number} progress={progress} index={index} total={steps.length} active={active === index} reduceMotion={reduceMotion}>
                  <div className={styles.phaseArtwork}>
                    {renderVisual(index, true)}
                    {index < 2 && <ClaudeCharacter variant={index === 0 ? "consultant" : "developer"} className={styles.phaseCharacter} />}
                  </div>
                </ScrollSceneLayer>
              ))}
            </div>
            <div className={styles.sceneFooter}><span>INGENIERÍA APLICADA</span><span>0{active + 1} / 0{steps.length}</span></div>
          </div>

          <div className={styles.narrative}>
            <div className={styles.copyStack}>
              {steps.map((step, index) => (
                <motion.div key={step.number} className={styles.copy} aria-hidden={active !== index} inert={active !== index ? true : undefined}
                  initial={false} animate={{ opacity: active === index ? 1 : 0, y: reduceMotion ? 0 : active === index ? 0 : 20 }} transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1], opacity: { duration: reduceMotion ? 0 : 0.55, delay: reduceMotion || active !== index ? 0 : 0.12 } }}>
                  <span className={styles.phase}>ETAPA {step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className={styles.tags}>{step.detail.map((detail) => <span key={detail}>{detail}</span>)}</div>
                </motion.div>
              ))}
            </div>
            <nav className={styles.phases} aria-label="Etapas de trabajo">
              {steps.map((step, index) => {
                const Icon = [Search, Code2, Activity][index];
                return <button type="button" key={step.number} onClick={() => goToPhase(index)} aria-current={active === index ? "step" : undefined}>
                  {active === index && <motion.div aria-hidden="true" layoutId={phaseIndicatorId} className={styles.phaseHighlight} transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }} />}
                  <span>{step.number}</span><Icon size={16} strokeWidth={1.75} aria-hidden="true" />{step.title}
                </button>;
              })}
            </nav>
            <a className={styles.link} href="#proyectos">Explorar proyectos <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </motion.div>

        <div className={styles.fallback}>
          {steps.map((step, index) => <motion.article key={step.number} className={styles.simpleStep}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div className={styles.phaseArtwork}>{renderVisual(index, true)}{index < 2 && <ClaudeCharacter variant={index === 0 ? "consultant" : "developer"} className={styles.phaseCharacter} />}</div>
            <div><span className={styles.phase}>ETAPA {step.number}</span><h3 className="section-card-title mt-4">{step.title}</h3><p className="section-desc-light">{step.description}</p></div>
          </motion.article>)}
        </div>

        <div className={styles.progress} aria-hidden="true"><motion.span style={{ scaleX: progress }} /></div>
      </div>
    </section>
  );
}
