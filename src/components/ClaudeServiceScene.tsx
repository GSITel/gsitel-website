"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Check, Code2, FileSearch, ScanSearch } from "lucide-react";
import styles from "./ClaudeServiceScene.module.css";
import { ClaudeCharacter } from "./ClaudeCharacter";

export function ClaudeServiceScene({ role }: { role: "developer" | "consultant" }) {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { amount: 0.25 });
  const developer = role === "developer";

  return (
    <div ref={root} className={styles.scene} data-playing={visible} role="img" aria-label={developer ? "Personaje animado trabajando en software" : "Personaje animado analizando procesos"}>
      <div className={styles.topbar} aria-hidden="true">
        <span className={styles.dots}><i /><i /><i /></span>
        <span>{developer ? "Espacio de desarrollo" : "Espacio de consultoría"}</span>
        <span className={styles.indicator} />
      </div>
      <div className={styles.body} aria-hidden="true">
        <div className={styles.profile}>
          <ClaudeCharacter variant={role} className={styles.character} />
        </div>
        {developer ? (
          <div className={styles.editor}>
            <div className={styles.filename}><Code2 size={13} /> producto.tsx</div>
            <div className={styles.code}>
              <div className={styles.line}><span>01</span><code><b>const</b> producto = &#123;</code></div>
              <div className={styles.line}><span>02</span><code>&nbsp; interfaz: <em>&quot;clara&quot;</em>,</code></div>
              <div className={styles.line}><span>03</span><code>&nbsp; procesos: <em>&quot;conectados&quot;</em></code></div>
              <div className={styles.line}><span>04</span><code>&#125;<i className={styles.cursor} /></code></div>
            </div>
            <div className={styles.editorFooter}><Check size={13} /> Del diseño al producto</div>
          </div>
        ) : (
          <div className={styles.workspace}>
            <div className={styles.filename}><FileSearch size={13} /> Análisis de procesos</div>
            <div className={styles.flow}>
              {["Analizar", "Rediseñar", "Mejorar"].map((label, index) => <div className={styles.flowItem} key={label}><span className={styles.node}><span>0{index + 1}</span><strong>{label}</strong></span>{index < 2 && <ArrowRight size={15} />}</div>)}
            </div>
            <div className={styles.insight}><span className={styles.insightIcon}><ScanSearch size={17} /></span><div><strong>Entender antes de construir</strong><span>Reglas, dependencias y oportunidades.</span></div></div>
          </div>
        )}
      </div>
    </div>
  );
}
