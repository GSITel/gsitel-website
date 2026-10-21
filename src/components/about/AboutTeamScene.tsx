import { ClaudeCharacter } from "@/components/ClaudeCharacter";

const team = [
  { label: "Estrategia y dirección", variant: "ceo" as const },
  { label: "Tecnología y producto", variant: "cto" as const },
];

export const AboutTeamScene = () => (
  <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#dfe8f3] bg-white/60 shadow-[0_16px_48px_rgba(27,61,107,0.05)]">
    <div className="flex items-center justify-between gap-3 border-b border-[#e1e9f4] px-5 py-4">
      <span className="text-xs font-semibold text-[#486481]">El equipo detrás de tu proyecto</span>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#72a999]" aria-hidden="true" />
    </div>
    <div className="grid grid-cols-2 gap-3 px-3 pb-7 pt-9 sm:gap-5 sm:px-6 sm:pb-9 sm:pt-12">
      {team.map(({ label, variant }) => (
        <figure key={label} className="min-w-0 text-center">
          <ClaudeCharacter variant={variant} className="mx-auto max-w-[210px]" />
          <figcaption className="mt-4 text-xs font-semibold leading-5 text-[#31547c] sm:text-sm">{label}</figcaption>
        </figure>
      ))}
    </div>
  </div>
);
