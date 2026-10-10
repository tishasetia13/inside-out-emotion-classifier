import './Intro.css'

// The headline and the one-sentence description.
export function Intro() {
  return (
    <div className="intro">
      <h1 className="intro__title">What is this story feeling?</h1>
      <p className="intro__lead">
        Write a short personal story. Five emotions weigh in, each sized by how strongly
        it fits.
      </p>
    </div>
  )
}
