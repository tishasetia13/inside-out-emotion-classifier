// Fear: a tall, trembling oval with huge eyes, worried brows and a sweat drop.
export function Fear() {
  return (
    <svg
      className="char char--fear"
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <g className="fear__body">
        <path
          className="char__fill"
          d="M60 6C85 6 93 34 93 62C93 92 85 114 60 114C35 114 27 92 27 62C27 34 35 6 60 6Z"
        />
        <circle cx="47" cy="46" r="10" fill="#fff" />
        <circle cx="73" cy="46" r="10" fill="#fff" />
        <circle className="fear__pupil" cx="47" cy="47" r="3.4" fill="currentColor" />
        <circle className="fear__pupil" cx="73" cy="47" r="3.4" fill="currentColor" />
        <path className="char__line" d="M35 30L53 24M85 30L67 24" />
        <path className="char__line" d="M47 82q3.2-6 6.4 0t6.4 0 6.4 0 6.4 0" />
      </g>
      <path
        className="fear__sweat"
        d="M101 30C101 30 96 36 96 39.5C96 42.3 98.2 44 101 44C103.8 44 106 42.3 106 39.5C106 36 101 30 101 30Z"
      />
    </svg>
  )
}
