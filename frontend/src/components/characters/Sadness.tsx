// Sadness: a drooping teardrop with heavy lids, slanted brows and a slow tear.
export function Sadness() {
  return (
    <svg
      className="char char--sadness"
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <g className="sadness__body">
        <path
          className="char__fill"
          d="M60 10C60 10 20 56 20 80C20 102 38 114 60 114C82 114 100 102 100 80C100 56 60 10 60 10Z"
        />
        <circle cx="46" cy="76" r="8" fill="#fff" />
        <circle cx="74" cy="76" r="8" fill="#fff" />
        <circle cx="46" cy="79" r="3.8" fill="currentColor" />
        <circle cx="74" cy="79" r="3.8" fill="currentColor" />
        <path className="char__fill" d="M38 74A8 8 0 0 1 54 74ZM66 74A8 8 0 0 1 82 74Z" />
        <path className="char__line" d="M37 74H55M65 74H83" />
        <path className="char__line" d="M36 64L54 58M84 64L66 58" />
        <path className="char__line" d="M50 100Q60 92 70 100" />
      </g>
      <path
        className="sadness__tear"
        d="M46 86C46 86 41 92 41 95.5C41 98.3 43.2 100 46 100C48.8 100 51 98.3 51 95.5C51 92 46 86 46 86Z"
      />
    </svg>
  )
}
