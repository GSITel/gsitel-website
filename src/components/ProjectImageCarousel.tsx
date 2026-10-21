"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import type { ProjectDetailImage } from "@/data/projects/types";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import styles from "./ProjectImageCarousel.module.css";

export function ProjectImageCarousel({ images, title, onImageOpen, phoneGallery }: {
  images: ProjectDetailImage[]; title: string; phoneGallery: boolean; onImageOpen: (image: ProjectDetailImage) => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useHydratedReducedMotion();
  function move(direction: number) {
    const node = viewport.current;
    if (!node) return;
    const target = Math.max(0, Math.min(images.length - 1, active + direction));
    node.scrollTo({ left: node.clientWidth * target, behavior: reduceMotion ? "instant" : "smooth" });
  }
  return <div className={styles.carousel} role="region" aria-label={`Capturas de ${title}`}>
    <div ref={viewport} className={styles.viewport} onScroll={(event) => { const node = event.currentTarget; if (node.clientWidth) setActive(Math.min(images.length - 1, Math.max(0, Math.round(node.scrollLeft / node.clientWidth)))); }}>
      {images.map((item, index) => <button key={item.alt} type="button" className={`${styles.slide} ${phoneGallery ? styles.phone : ""}`} onClick={() => onImageOpen(item)} aria-label={`Ampliar imagen ${index + 1}: ${item.alt}`}>
        <Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 90vw, 1px" className={styles.image} loading="lazy" />
        <span className={styles.expand}><Expand size={17} aria-hidden="true" /></span>
      </button>)}
    </div>
    <div className={styles.controls}>
      <button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Ver captura anterior"><ArrowLeft size={18} aria-hidden="true" /></button>
      <p aria-live="polite" aria-atomic="true">{active + 1} <span>/ {images.length}</span></p>
      <button type="button" onClick={() => move(1)} disabled={active === images.length - 1} aria-label="Ver captura siguiente"><ArrowRight size={18} aria-hidden="true" /></button>
    </div>
    <p className={styles.caption}>{images[active]?.alt}</p>
  </div>;
}
