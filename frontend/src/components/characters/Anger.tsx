// Anger: a compact, flame-topped body with furrowed brows and gritted teeth.
export function Anger() {
  return (
    <svg
      className="char char--anger"
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <g className="anger__body">
        <path
          className="char__fill anger__flame"
          d="M38 50C32 34 48 28 44 10C58 18 62 30 60 40C64 28 76 24 74 10C90 24 90 40 82 52Z"
        />
        <path
          className="char__fill"
          d="M12 82C12 54 34 44 60 44C86 44 108 54 108 82C108 104 90 114 60 114C30 114 12 104 12 82Z"
        />
        <circle cx="44" cy="76" r="8" fill="#fff" />
        <circle cx="76" cy="76" r="8" fill="#fff" />
        <circle cx="46" cy="77" r="3.8" fill="currentColor" />
        <circle cx="74" cy="77" r="3.8" fill="currentColor" />
        <path className="char__line" d="M32 62L54 72M88 62L66 72" />
        <rect
          x="42"
          y="91"
          width="36"
          height="14"
          rx="5"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          className="char__line"
          d="M51 91V105M60 91V105M69 91V105"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  )
}
