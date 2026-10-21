import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { AboutTeamScene } from "@/components/about/AboutTeamScene";
import styles from "@/sections/AboutHero.module.css";

export const AboutIntro = () => (
  <section aria-labelledby="about-title" className="quiet-section quiet-surface px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:pb-20">
    <div className="quiet-texture pointer-events-none absolute inset-0 opacity-45" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-20">
      <div className="order-2 min-w-0 md:order-1">
        <AboutTeamScene />
      </div>
      <div className="order-1 min-w-0 md:order-2">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#1b5aa6]">Somos GSITEL</p>
        <h1 id="about-title" className={styles.headline}>Tu próximo proyecto.<br /><span>Un equipo que se involucra.</span></h1>
        <p className={styles.intro}>Entendemos tu operación y construimos la solución contigo. Unimos ingeniería de software y telecomunicaciones, con trato directo y avances claros.</p>
        <div className={styles.benefits}>
          {["Trato directo", "Criterio técnico", "Acompañamiento"].map(label => <span key={label} className={styles.benefit}><Check size={15} aria-hidden="true" />{label}</span>)}
        </div>
        <div className={styles.actions}>
          <a href="#contacto" className={styles.primary}>Hablemos de tu proyecto <ArrowRight size={18} aria-hidden="true" /></a>
          <a href="#equipo" className={styles.secondary}>Conoce al equipo</a>
        </div>
        <p className={styles.reassurance}><ShieldCheck size={17} aria-hidden="true" />Del diagnóstico a la puesta en marcha, un mismo equipo.</p>
      </div>
    </div>
  </section>
);
