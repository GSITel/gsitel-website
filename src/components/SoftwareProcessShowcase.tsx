"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Check, CheckCheck, Code2, Database, FileCode2, GitBranch, Layers3, LayoutDashboard, Pause, Play, ScanSearch, ShieldCheck, Workflow } from "lucide-react";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import styles from "./SoftwareProcessShowcase.module.css";

const stages = [
  { title: "Comprender", label: "Ingeniería inversa", detail: "Analizamos el software, los datos y los flujos existentes para descubrir sus reglas y dependencias.", icon: ScanSearch, artifact: "Sistema existente → conocimiento", nodes: ["Software", "Datos", "Procesos"], result: "Reglas y dependencias identificadas" },
  { title: "Rediseñar", label: "Reingeniería", detail: "Replanteamos procesos y arquitectura para resolver fricciones y diseñar una mejor experiencia.", icon: Workflow, artifact: "Conocimiento → nuevo diseño", nodes: ["Experiencia", "Arquitectura", "Flujos"], result: "Procesos y arquitectura rediseñados" },
  { title: "Desarrollar", label: "Producto a medida", detail: "Convertimos el diseño en software: interfaces, lógica de negocio e integraciones conectadas.", icon: Code2, artifact: "Diseño → producto funcional", nodes: ["Interfaz", "Lógica", "APIs"], result: "Componentes e integraciones construidos" },
  { title: "Validar", label: "Pruebas y evolución", detail: "Probamos el producto con los usuarios, verificamos los flujos y lo mejoramos con su feedback.", icon: ShieldCheck, artifact: "Producto → mejora continua", nodes: ["Pruebas", "Usuarios", "Mejoras"], result: "Producto validado para su operación" },
];

export function SoftwareProcessShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.25 });
  const prefersReducedMotion = useHydratedReducedMotion();
  const reduceMotion = prefersReducedMotion && !motionEnabled;
  const playing = !paused && !reduceMotion && inView && pageVisible;
  const stage = stages[active];
  const StageIcon = stage.icon;

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % stages.length), 5000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  return (
    <div ref={root} className={styles.showcase} role="region" aria-label="Cómo transformamos tu operación en un producto de software">
      <div className={styles.heading}>
        <span className={styles.kicker}>ASÍ CONSTRUIMOS EN GSITEL</span>
        <button className={styles.playback} onClick={() => { if (reduceMotion) { setMotionEnabled(true); setPaused(false); } else { setPaused((value) => !value); } }} aria-label={reduceMotion ? "Reproducir animación" : paused ? "Reproducir proceso" : "Pausar proceso"}>
          {paused || reduceMotion ? <Play size={14} /> : <Pause size={14} />}
          <span>{reduceMotion ? "Ver animación" : paused ? "Reanudar" : "Pausar"}</span>
        </button>
      </div>

      <div className={styles.scene}>
        <div className={styles.backplate} aria-hidden="true" />
        <div className={styles.window}>
          <div className={styles.toolbar}>
            <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
            <span>De tu operación al producto</span>
            <Layers3 size={15} aria-hidden="true" />
          </div>
          <div className={styles.windowBody}>
            <div className={styles.phaseHeading}>
              <span className={styles.phaseIcon}><StageIcon size={23} aria-hidden="true" /></span>
              <div><span className={styles.phaseNumber}>ETAPA 0{active + 1} / 04</span><p className={styles.phaseTitle}>{stage.label}</p></div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }} className={styles.diagram} aria-hidden="true">
                <div className={styles.nodes}>
                  {stage.nodes.map((node, index) => {
                    const Icon = active === 0 ? [FileCode2, Database, GitBranch][index] : active === 1 ? [LayoutDashboard, Layers3, Workflow][index] : active === 2 ? [LayoutDashboard, Code2, Database][index] : [ShieldCheck, CheckCheck, GitBranch][index];
                    return <div className={styles.node} key={node}><Icon size={23} strokeWidth={1.6} /><span>{node}</span></div>;
                  })}
                </div>
                <div className={styles.connector}><span /><ArrowRight size={17} /><span /></div>
                <div className={styles.blueprint}>
                  <div className={styles.blueprintHeader}><StageIcon size={17} /><span>{active === 0 ? "Mapa del sistema" : active === 1 ? "Diseño del producto" : active === 2 ? "Construcción del producto" : "Validación del producto"}</span></div>
                  {active < 2 ? <div className={styles.flow}><span>{active === 0 ? "Entrada" : "Usuario"}</span><ArrowRight size={15} /><span>{active === 0 ? "Reglas" : "Servicio"}</span><ArrowRight size={15} /><span>{active === 0 ? "Salida" : "Datos"}</span></div> : active === 2 ? <div className={styles.code}><span><b>producto</b> = &#123;</span><span>&nbsp; interfaz, servicios, datos</span><span>&#125; <em>{"// componentes conectados"}</em></span></div> : <div className={styles.checks}>{["Flujos verificados", "Experiencia validada", "Feedback incorporado"].map((text) => <span key={text}><Check size={14} />{text}</span>)}</div>}
                </div>
                <div className={styles.result}><span><Check size={13} /></span>{stage.result}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.artifact}><span className={styles.artifactIcon}><ArrowRight size={18} /></span><div><span>TRANSFORMACIÓN</span><strong>{stage.artifact}</strong></div></div>
      </div>

      <div className={styles.steps} aria-label="Etapas del proceso">
        {stages.map((item, index) => <button key={item.title} className={`${styles.step} ${active === index ? styles.active : ""}`} aria-pressed={active === index} aria-controls="software-process-description" onClick={() => { setActive(index); setPaused(true); }}><span className={styles.stepNumber}>{index + 1}</span><span>{item.title}</span><span className={styles.track}>{active === index && <span key={`${active}-${playing}`} className={playing ? styles.progress : styles.progressStatic} />}</span></button>)}
      </div>
      <div id="software-process-description" className={styles.description} aria-live={playing ? "off" : "polite"}><p>{stage.detail}</p></div>
    </div>
  );
}

