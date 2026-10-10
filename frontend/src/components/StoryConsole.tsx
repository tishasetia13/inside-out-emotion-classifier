import { useId, useRef, type FormEvent, type KeyboardEvent } from 'react'
import { canSubmit, getCounterState } from '../lib/charCount'
import { CharCounter } from './CharCounter'
import { ExampleList } from './ExampleList'
import './StoryConsole.css'

interface StoryConsoleProps {
  text: string
  onTextChange: (text: string) => void
  onSubmit: () => void
  isLoading: boolean
}

// The input form: story box, live counter, analyze button, privacy note and examples.
// "Props" are the values a parent component passes in (like function arguments).
// This is a "controlled" input: the text lives in the parent, and every keystroke
// reports back through onTextChange, so there is always a single source of truth.
export function StoryConsole({
  text,
  onTextChange,
  onSubmit,
  isLoading,
}: StoryConsoleProps) {
  const id = useId()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const counter = getCounterState(text)
  const submittable = canSubmit(text) && !isLoading

  function handleSubmit(event: FormEvent) {
    // Stop the browser's default form behavior (reloading the page).
    event.preventDefault()
    if (submittable) onSubmit()
  }

  // Ctrl+Enter or Cmd+Enter submits from inside the text box.
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && submittable) {
      event.preventDefault()
      onSubmit()
    }
  }

  function pickExample(example: string) {
    onTextChange(example)
    textareaRef.current?.focus()
  }

  return (
    <form className="story" onSubmit={handleSubmit} noValidate>
      <label className="story__label" htmlFor={`${id}-story`}>
        Your story
      </label>
      <textarea
        id={`${id}-story`}
        ref={textareaRef}
        className="story__textarea"
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write or paste a short personal story…"
        rows={6}
        aria-describedby={`${id}-count`}
        aria-invalid={counter.level === 'over'}
      />

      <div className="story__row">
        <CharCounter id={`${id}-count`} state={counter} />
        <p className="story__privacy">Stories are never stored.</p>
      </div>

      <button
        type="submit"
        className="button"
        disabled={!submittable}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Analyzing…
          </>
        ) : (
          'Analyze'
        )}
      </button>

      <ExampleList onPick={pickExample} />
    </form>
  )
}
