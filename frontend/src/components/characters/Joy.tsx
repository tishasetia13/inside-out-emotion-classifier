// Joy: a spiky starburst with wide eyes and a big open smile.
// All five characters share one style: white eyes with dark pupils, and 3.5-wide round
// strokes for every facial feature. `currentColor` means "use the CSS text color" and
// lets the stylesheet decide the ink color once for all of them.
export function Joy() {
  return (
    <svg
      className="char char--joy"
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <g className="joy__body">
        <polygon
          className="char__fill"
          points="60,16 71.1,29.8 88.2,25.2 89.1,42.8 105.6,49.2 96,64 105.6,78.8 89.1,85.2 88.2,102.8 71.1,98.2 60,112 48.9,98.2 31.8,102.8 30.9,85.2 14.4,78.8 24,64 14.4,49.2 30.9,42.8 31.8,25.2 48.9,29.8"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <circle cx="46" cy="58" r="8" fill="#fff" />
        <circle cx="74" cy="58" r="8" fill="#fff" />
        <circle cx="47" cy="57" r="3.8" fill="currentColor" />
        <circle cx="75" cy="57" r="3.8" fill="currentColor" />
        <path className="char__line" d="M37 45Q46 38 55 45M65 45Q74 38 83 45" />
        <path
          d="M45 76Q60 96 75 76Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M52 87Q60 83 68 87Q60 93 52 87Z" fill="#ff8c8c" />
      </g>
    </svg>
  )
}
