import { Check } from "lucide-react";

const principles = [
  { title: "Primero, tu operación", text: "Escuchamos, revisamos tus sistemas y definimos qué necesitas resolver." },
  { title: "Avances que puedes ver", text: "Acordamos el alcance y validamos cada entrega contigo." },
  { title: "Seguimos a tu lado", text: "Acompañamos la puesta en marcha y la evolución de tu solución." },
];

export const AboutPurpose = () => (
  <section id="proposito" aria-label="Cómo trabajamos contigo" className="quiet-section quiet-surface px-4 py-10 sm:px-6 sm:py-12">
    <div className="relative mx-auto grid max-w-7xl gap-7 border-y border-[#0b1d3a]/10 py-8 md:grid-cols-3 md:gap-10">
      {principles.map(({ title, text }) => (
        <article key={title} className="flex items-start gap-3">
          <Check size={18} className="mt-1 shrink-0 text-[#217d80]" aria-hidden="true" />
          <div><h2 className="text-base font-semibold tracking-tight text-[#0b1d3a]">{title}</h2><p className="mt-2 max-w-sm text-sm leading-7 text-[#486481]">{text}</p></div>
        </article>
      ))}
    </div>
  </section>
);
