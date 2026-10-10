// Disgust: a sharp, slouching shape with half-lidded side-eye, a raised brow and a tongue.
export function Disgust() {
  return (
    <svg
      className="char char--disgust"
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <g className="disgust__body">
        <polygon
          className="char__fill"
          points="24,38 96,28 106,84 84,106 32,102 14,76"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <circle cx="44" cy="60" r="8" fill="#fff" />
        <circle cx="76" cy="60" r="8" fill="#fff" />
        <circle className="disgust__pupil" cx="48" cy="61" r="3.8" fill="currentColor" />
        <circle className="disgust__pupil" cx="80" cy="61" r="3.8" fill="currentColor" />
        <path className="char__fill" d="M36 58A8 8 0 0 1 52 58ZM68 58A8 8 0 0 1 84 58Z" />
        <path className="char__line" d="M35 58H53M67 58H85" />
        <path className="char__line" d="M31 44L53 38M68 49L88 50" />
        <path className="char__line" d="M46 84Q60 92 80 80" />
        <path
          className="disgust__tongue"
          d="M66 87C66 87 66 98 72 98C78 98 77 86 77 83Z"
        />
      </g>
    </svg>
  )
}
