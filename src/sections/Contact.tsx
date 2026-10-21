"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { MotionInView } from "@/components/MotionInView";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import type { SiteMode } from "@/lib/siteMode";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Mail, Send, X } from "lucide-react";

const contactEndpoint = "https://script.google.com/macros/s/AKfycbxd643gGgvTh_uUG4CwDKJTtDwFo2fzWNhSiJNP6QjMnuhFHXHqGbCkAUPVY6qco0Y0/exec";

export const Contact = ({ mode }: { mode: SiteMode }) => {
  const isTelecom = mode === "telecom";
  const reduceMotion = useHydratedReducedMotion();
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState<{ email: string; receiptSent: boolean } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const submissionInProgress = useRef(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isDialogOpen && !dialog.open) dialog.showModal();
    if (!isDialogOpen && dialog.open) dialog.close();
  }, [isDialogOpen]);

  useEffect(() => {
    if (!success || !isDialogOpen) return;
    setSecondsLeft(5);
    acceptRef.current?.focus();
    const countdown = window.setInterval(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000);
    const timer = window.setTimeout(() => setIsDialogOpen(false), 5000);
    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(timer);
    };
  }, [success, isDialogOpen]);

  useEffect(() => {
    const openFromContactLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('a[href*="#contacto"], [data-contact-dialog-trigger]')) return;
      event.preventDefault();
      event.stopPropagation();
      setSubmitMessage("");
      setSuccess(null);
      setIsDialogOpen(true);
    };

    document.addEventListener("click", openFromContactLink, true);
    return () => document.removeEventListener("click", openFromContactLink, true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInProgress.current) return;
    const form = event.currentTarget;
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      if (typeof value === "string") body.set(key, value.trim());
    }
    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitMessage("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        body,
        credentials: "omit",
        redirect: "follow",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("No se pudo enviar la consulta.");
      const result = await response.json();
      if (result.ok !== true) throw new Error("No se pudo enviar la consulta.");
      form.reset();
      setSuccess({ email: body.get("email") || "", receiptSent: result.receiptSent === true });
    } catch {
      setSubmitError(true);
      setSubmitMessage("No pudimos confirmar el envío. Conservamos tus datos para que puedas intentarlo de nuevo. También puedes escribir a soporte@gsitel-solutions.com.");
    } finally {
      window.clearTimeout(timeout);
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="quiet-section quiet-section-dark relative bg-transparent px-4 section-shell scroll-mt-24 sm:px-6 md:scroll-mt-28"
    >
      <MotionInView className="mx-auto max-w-6xl">
        <div className="quiet-card-dark relative isolate overflow-hidden rounded-[2rem] border-white/15 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.035),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-0 grid-fine opacity-20" />
          <motion.div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full blur-3xl ${isTelecom ? "bg-[#f39c36]/15" : "bg-[#2f9edb]/20"}`}
            animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, 16, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-[#79e4f2]/10 blur-3xl"
            animate={reduceMotion ? undefined : { x: [0, 24, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#79e4f2]/70 to-transparent" />

          <div className="relative z-10 grid min-w-0 grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
            <div className="min-w-0 max-w-3xl">
              <div className="flex items-center gap-3">
                <motion.span
                  className={`h-2 w-2 rounded-full ${isTelecom ? "bg-[#f39c36]" : "bg-[#79e4f2]"}`}
                  animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.9, 1.15, 0.9] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/55">
                  {isTelecom ? "Operación de red" : "Contacto"}
                </p>
              </div>
              <h2 className="section-title-dark break-words [overflow-wrap:anywhere] max-md:!text-[1.8rem]">
                {isTelecom
                  ? "Una red exigente necesita decisiones claras."
                  : "Hablemos de tu proyecto"}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
                {isTelecom
                  ? "Cuéntanos el escenario. Te ayudamos a definir el alcance técnico y la mejor ruta de ejecución."
                  : "Cuéntanos qué necesitas mejorar. Evaluamos el contexto y acordamos el siguiente paso."}
              </p>
            </div>

            <button type="button" onClick={() => { setSubmitMessage(""); setSuccess(null); setIsDialogOpen(true); }} className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-white px-6 text-sm font-bold text-[#071b38] shadow-[0_14px_36px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.3)] lg:w-auto">
              Hablemos de tu proyecto <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>

          <dialog ref={dialogRef} onClose={() => setIsDialogOpen(false)} onCancel={() => setIsDialogOpen(false)} aria-labelledby="contact-dialog-title" className={`m-auto max-h-[min(90dvh,52rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-[1.75rem] border p-0 shadow-[0_32px_100px_rgba(0,0,0,0.4)] backdrop:bg-[#020b19]/75 backdrop:backdrop-blur-sm ${success ? "max-w-lg border-white/80 bg-white text-[#071b38]" : "max-w-3xl border-white/15 bg-[#071b38] text-white"}`}>
            <div className="relative isolate overflow-hidden p-6 sm:p-9 lg:p-10">
              {!success && <><div className="pointer-events-none absolute inset-0 grid-fine opacity-15" /><div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#2f9edb]/15 blur-3xl" /></>}
              {success ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.16em]">GSITEL<span className="text-[#2f9edb]">.</span></span>
                    <button type="button" aria-label="Cerrar confirmación" onClick={() => setIsDialogOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#61758c] transition hover:bg-[#f0f5fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b5aa6]"><X className="h-4 w-4" /></button>
                  </div>
                  <div className="text-center">
                  <motion.div
                    aria-hidden="true"
                    initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#c5eaf1] bg-[#effbfc] ring-8 ring-[#f6fbfd]"
                  >
                    {!reduceMotion && <motion.span initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.65, opacity: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="absolute inset-0 rounded-full border border-[#2f9edb]/40" />}
                    <svg viewBox="0 0 48 48" fill="none" className="h-11 w-11 text-[#15769b]">
                      <motion.path d="m12 24 8 8 16-17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15, duration: 0.4 }} />
                    </svg>
                  </motion.div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#15769b]">Envío confirmado</p>
                  <h3 id="contact-dialog-title" className="mx-auto mt-3 max-w-xs text-[1.85rem] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[2.15rem]">Ya recibimos<br />tu solicitud.</h3>
                  <p role="status" className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[#61758c]">Gracias por contarnos tu idea. Nuestro equipo revisará tu consulta y se pondrá en contacto contigo.</p>
                  </div>
                  <div className="mt-7 flex items-center gap-3 rounded-2xl border border-[#e3ebf3] bg-[#f7f9fc] p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e3ebf3] bg-white text-[#1b5aa6]"><Mail className="h-4 w-4" aria-hidden="true" /></span>
                    <div className="min-w-0"><p className="text-xs leading-5 text-[#61758c]">{success.receiptSent ? "Confirmación enviada a" : "Te responderemos a"}</p><p className="break-words text-sm font-medium text-[#071b38]">{success.email}</p></div>
                  </div>
                  <button ref={acceptRef} type="button" onClick={() => setIsDialogOpen(false)} className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#071b38] px-8 text-sm font-semibold text-white transition hover:bg-[#164575] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b5aa6]">Aceptar <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                  <p aria-hidden="true" className="mt-4 text-center text-xs text-[#61758c]">Cierre automático en {secondsLeft} s</p>
                  <span className="sr-only">La confirmación se cerrará automáticamente después de cinco segundos.</span>
                  {!reduceMotion && <div aria-hidden="true" className="mt-5 h-0.5 overflow-hidden rounded-full bg-[#eaf1f7]"><motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 5, ease: "linear" }} className="h-full origin-left bg-[#2f9edb]/65" /></div>}
                </motion.div>
              ) : (
              <>
              <div className="relative z-10 mb-7 flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/50">{isTelecom ? "Contacto · Telecomunicaciones" : "Contacto · Software"}</p>
                  <h3 id="contact-dialog-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Hablemos de tu proyecto</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">Déjanos tus datos y cuéntanos qué necesitas resolver.</p>
                </div>
                <button type="button" autoFocus aria-label="Cerrar formulario" onClick={() => setIsDialogOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button>
              </div>

            <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="relative z-10 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-semibold text-white/75">
                Nombre
                <input name="name" autoComplete="name" required placeholder="Tu nombre" className="min-h-12 w-full rounded-xl border border-white/15 bg-[#071b38]/65 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#79e4f2]/70 focus:ring-2 focus:ring-[#79e4f2]/15" />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-white/75">
                Correo electrónico
                <input name="email" type="email" autoComplete="email" required placeholder="nombre@empresa.com" className="min-h-12 w-full rounded-xl border border-white/15 bg-[#071b38]/65 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#79e4f2]/70 focus:ring-2 focus:ring-[#79e4f2]/15" />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-white/75">
                Empresa <span className="font-normal text-white/40">(opcional)</span>
                <input name="company" autoComplete="organization" placeholder="Nombre de tu empresa" className="min-h-12 w-full rounded-xl border border-white/15 bg-[#071b38]/65 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#79e4f2]/70 focus:ring-2 focus:ring-[#79e4f2]/15" />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-white/75">
                {isTelecom ? "Servicio de telecomunicaciones" : "Servicio de interés"}
                <select name="service" defaultValue={isTelecom ? "Conectividad y redes" : "Desarrollo de software"} className="min-h-12 w-full rounded-xl border border-white/15 bg-[#071b38] px-4 text-sm text-white outline-none transition focus:border-[#79e4f2]/70 focus:ring-2 focus:ring-[#79e4f2]/15">
                  {(isTelecom
                    ? ["Conectividad y redes", "Internet dedicado", "Infraestructura de red", "Seguridad y monitoreo"]
                    : ["Desarrollo de software", "Transformación digital", "Consultoría tecnológica", "Otro"]
                  ).map((service) => <option key={service}>{service}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-semibold text-white/75 sm:col-span-2">
                ¿Qué necesitas resolver?
                <textarea name="message" required rows={4} placeholder="Cuéntanos brevemente sobre tu proyecto..." className="w-full resize-y rounded-xl border border-white/15 bg-[#071b38]/65 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/35 focus:border-[#79e4f2]/70 focus:ring-2 focus:ring-[#79e4f2]/15" />
              </label>
              <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-white/45">Usaremos este correo para confirmar tu solicitud y responderte.</p>
                <button type="submit" disabled={isSubmitting} className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#071b38] shadow-[0_14px_36px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.3)] disabled:cursor-wait disabled:opacity-60 sm:w-auto">
                  {isSubmitting ? "Enviando…" : "Enviar solicitud"} <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
              {submitMessage && <p role={submitError ? "alert" : "status"} className={`text-sm leading-6 sm:col-span-2 ${submitError ? "text-red-200" : "text-[#a6edf4]"}`}>{submitMessage}</p>}
            </form>
              </>
              )}
            </div>
          </dialog>

          <div className="relative z-10 mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6">
            {["Primera conversación", "Alcance claro", "Siguiente paso concreto"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-[10px] font-semibold text-white/45">
                <Check className="h-3.5 w-3.5 text-[#79e4f2]" strokeWidth={2.4} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </MotionInView>
    </section>
  );
};
