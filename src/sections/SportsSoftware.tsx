import Image from "next/image";
import { ArrowDown, GraduationCap, Trophy } from "lucide-react";
import cuadraiLogo from "@/assets/logos/cuadrailogo.png";
import xtremeLogo from "@/assets/logos/logo_xtreme.png";

const productLogoSize = "size-10 shrink-0";

const cuadraiModules = [
  { name: "Torneos", icon: Trophy, description: "Administra campeonatos y competencias deportivas." },
  { name: "Academias", icon: GraduationCap, description: "Gestiona academias y programas de formación deportiva." },
];

function ProjectJump({ onClick }: { name: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-3 inline-flex min-h-11 items-center gap-2 self-start text-xs font-semibold text-[#1b5aa6] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b5aa6]">
      <ArrowDown size={18} aria-hidden="true" />
      Ver proyecto
    </button>
  );
}

export function SportsSoftware({ onProjectSelect }: { onProjectSelect: (id: string) => void }) {
  return (
    <section id="software-deportivo" aria-labelledby="sports-title" className="scroll-mt-24 bg-[#f0f6fa] px-4 py-16 text-[#0b1d3a] sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 bg-[#e6eefb] px-6 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 md:px-10 md:py-12">
          <div>
            <p className="section-eyebrow-light">Sector deportivo</p>
            <h2 id="sports-title" className="section-title-light max-w-sm">
              Software para el deporte
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#0b1d3a]/75">
              En GSITel desarrollamos software, plataformas web y aplicaciones móviles para gestionar espacios deportivos, academias y campeonatos. Automatizamos tareas para simplificar la administración y mejorar la operación diaria.
            </p>
          </div>
          <div className="max-w-xs">
            <div className="group relative h-24 w-40 bg-[#0b1d3a] sm:h-28 sm:w-48">
              <Image src="/bni-peru-blanco.png" alt="" fill sizes="(min-width: 640px) 192px, 160px" className="object-contain p-4 motion-safe:transition-opacity group-hover:opacity-0" />
              <Image src="/bni-peru-color.png" alt="" fill sizes="(min-width: 640px) 192px, 160px" className="bg-white object-contain p-4 opacity-0 motion-safe:transition-opacity group-hover:opacity-100" />
            </div>
            <h3 className="section-card-title mt-4">Miembros de BNI Perú</h3>
            <p className="mt-2 text-sm font-bold leading-7 text-[#0a2f5f]">Ingeniería de Software &amp; Innovación deportiva</p>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="section-card-title">Nuestras soluciones deportivas</h2>
            <p className="max-w-md text-sm leading-7 text-[#0b1d3a]/70">
              Tecnología para acompañar el deporte en cada etapa.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
          <article aria-labelledby="cuadrai-title" className="flex flex-col bg-white p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className={`${productLogoSize} overflow-hidden`}>
                {/* Compensate for the transparent margin in the original logo. */}
                <Image src={cuadraiLogo} alt="" sizes="40px" className="size-full scale-140 object-contain" />
              </div>
              <h3 id="cuadrai-title" className="section-card-title">CuadrAI</h3>
            </div>
            <p className="mt-4 max-w-md text-base leading-7">Aplicación móvil para gestionar espacios deportivos y sus reservas.</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {cuadraiModules.map(({ name, icon: Icon, description }) => (
                <li key={name}>
                  <h4 className="flex items-center gap-2 text-base font-bold">
                    <Icon aria-hidden="true" className="size-4 shrink-0 text-[#217d80]" />
                    {name}
                  </h4>
                  <p className="mt-1 text-base leading-6 text-[#0b1d3a]/70">{description}</p>
                </li>
              ))}
            </ul>
            <ProjectJump name="CuadrAI" onClick={() => onProjectSelect("pichangapp")} />
          </article>

          <article aria-labelledby="xtreme-title" className="flex flex-col bg-white p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <Image src={xtremeLogo} alt="" sizes="40px" className={`${productLogoSize}  object-contain`} />
              <h3 id="xtreme-title" className="section-card-title">Xtreme Fitness Sport</h3>
            </div>
            <p className="mt-3 max-w-prose text-base leading-7">
              Sistema interno para administrar clientes, planes, horarios y catálogo de un gimnasio de alto rendimiento con entrenamiento semipersonalizado.
            </p>
            <ProjectJump name="Xtreme Fitness Sport" onClick={() => onProjectSelect("xtreme")} />
          </article>
          </div>
        </div>

        <p className="mt-8 max-w-4xl text-base leading-7 text-[#0b1d3a]/70">
          Diseñamos tecnología que conecta a administradores, entrenadores y deportistas en cada etapa de la práctica deportiva, desde la formación infantil y la competencia juvenil hasta la actividad física por salud, bienestar o recreación en la adultez y la vejez.
        </p>
      </div>
    </section>
  );
}
