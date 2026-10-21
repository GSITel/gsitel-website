import styles from "./ClaudeCharacter.module.css";

type Props = {
  variant?: "developer" | "consultant" | "operation";
  className?: string;
};

export function ClaudeCharacter({ variant = "consultant", className }: Props) {
  const developer = variant !== "consultant";
  return (
    <svg className={`${styles.mascot} ${className ?? ""}`} viewBox="0 0 150 130" fill="none" aria-hidden="true">
            <ellipse cx="77" cy="119" rx="48" ry="6" fill="#d9e3f0" />
            <g className={styles.creature}>
              <path d="M42 30H108V39H119V76H110V87H40V76H30V39H42V30Z" fill="#d68c69" />
              <path d="M42 30H108V39H42V30Z" fill="#e2a07e" />
              <path d="M45 85H57V105H45V85ZM66 86H78V111H66V86ZM91 85H103V105H91V85Z" fill="#bf7757" />
              <path d="M46 100H57V110H39V103H46V100ZM66 105H78V116H60V109H66V105ZM92 100H103V110H85V103H92V100Z" fill="#a96347" />
              <path d="M25 53H35V74H25V53ZM16 62H26V79H16V62ZM114 53H124V74H114V53ZM123 62H133V79H123V62Z" fill="#d68c69" />
              <rect x="51" y="48" width="8" height="13" rx="1" fill="#322c2b" />
              <rect x="88" y="48" width="8" height="13" rx="1" fill="#322c2b" />
              <rect x="53" y="49" width="2" height="4" fill="#fff9f1" />
              <rect x="90" y="49" width="2" height="4" fill="#fff9f1" />
              <path d="M68 66H80V70H68V66Z" fill="#98583f" />
              {!developer && <g stroke="#423c3a" strokeWidth="3"><rect x="45" y="44" width="21" height="21" rx="5" /><rect x="82" y="44" width="21" height="21" rx="5" /><path d="M66 51H82M37 49H45M103 49H112" /></g>}
              {developer && <g stroke="#3b5272" strokeWidth="5"><path d="M36 53V43C36 25 48 19 74 19C100 19 112 25 112 43V53" /><path d="M35 45V65M113 45V65" strokeWidth="8" /></g>}
            </g>
            {developer ? <g><path d="M45 79H109L116 112H38L45 79Z" fill="#567498" /><path d="M49 83H105L110 106H44L49 83Z" fill="#ecf3ff" /><path d="M68 89L63 94L69 99M84 89L89 94L83 99" stroke="#7394bc" strokeWidth="2" /><path d="M32 112H121V117H32V112Z" fill="#365579" /></g> : <g><rect x="104" y="77" width="33" height="42" rx="4" fill="#f8fbff" stroke="#8ca9c8" strokeWidth="2" /><path d="M112 87H128M112 94H125M112 101H121" stroke="#8ca9c8" strokeWidth="2" /><path d="M127 104L130 107L136 99" stroke="#4d8c7b" strokeWidth="2" /></g>}
          {variant === "operation" && <g><circle cx="125" cy="106" r="15" fill="#e2f4ed" stroke="#8bc1ad" /><path d="M118 106L123 111L132 101" stroke="#407b68" strokeWidth="3" /></g>}
          </svg>
  );
}
