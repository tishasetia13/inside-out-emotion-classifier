import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Intro } from './components/Intro'
import { Stage } from './components/Stage'
import { StoryConsole } from './components/StoryConsole'
import { useAnalysis } from './hooks/useAnalysis'
import './App.css'

// The root component: it owns the story text and wires the pieces together.
// A component is a function that returns JSX, an HTML-like syntax that React turns
// into real page elements. Whenever state changes, React calls the function again and
// updates only the parts of the page that differ.
export default function App() {
  // useState remembers a value between renders and re-renders the page when it is set.
  const [text, setText] = useState('')
  const { phase, scores, resultId, analyze } = useAnalysis()

  const submit = () => void analyze(text)

  return (
    <div className="page">
      <Header />
      <main className="layout">
        <div className="layout__input">
          <Intro />
          <StoryConsole
            text={text}
            onTextChange={setText}
            onSubmit={submit}
            isLoading={phase.status === 'loading'}
          />
        </div>
        <div className="layout__stage">
          <Stage scores={scores} resultId={resultId} phase={phase} onRetry={submit} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
