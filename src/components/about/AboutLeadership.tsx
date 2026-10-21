import { Code2, RadioTower } from "lucide-react";

const leaders = [
  {
    name: "Marco Castro Rodas", role: "CEO · Ingeniería de Telecomunicaciones", icon: RadioTower,
    description: "Experiencia en redes móviles y dirección de proyectos. Acompaña la estrategia técnica y la ejecución en campo.",
  },
  {
    name: "Fabrizzio Castro", role: "CTO · Ingeniería de Software", icon: Code2,
    description: "Desarrollo de productos, automatización y sistemas de datos. Conecta las necesidades de tu negocio con la solución técnica.",
  },
];

export const AboutLeadership = () => (
  <section id="equipo" aria-labelledby="team-title" className="quiet-section quiet-surface scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12">
    <div className="relative mx-auto max-w-7xl">
      <div className="max-w-2xl">
        <p className="section-eyebrow-light">Quiénes estamos detrás</p>
        <h2 id="team-title" className="section-title-light">Personas con las que puedes contar.</h2>
        <p className="section-desc-light">La dirección se involucra en cada proyecto. Hablas con quienes entienden y construyen tu solución.</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 sm:mt-10">
        {leaders.map(({ name, role, icon: Icon, description }) => (
          <article key={name} className="quiet-card min-w-0 rounded-[1.5rem] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1b5aa6]/10 bg-[#edf4ff] text-[#1b5aa6]"><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
              <div className="min-w-0"><h3 className="text-lg font-semibold tracking-tight text-[#0b1d3a] sm:text-xl">{name}</h3><p className="mt-1 text-xs leading-5 text-[#486481]">{role}</p></div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#486481]">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
