import { EXAMPLE_STORIES } from '../data/examples'
import './ExampleList.css'

// A row of small buttons; clicking one fills the story box with that example.
export function ExampleList({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="examples">
      <p className="examples__label" id="examples-label">
        Try an example
      </p>
      <ul className="examples__list" aria-labelledby="examples-label">
        {EXAMPLE_STORIES.map((story) => (
          <li key={story.id}>
            <button type="button" className="chip" onClick={() => onPick(story.text)}>
              {story.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
