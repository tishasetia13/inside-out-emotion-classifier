import type { CSSProperties } from 'react'
import type { StageItem } from '../lib/layout'
import { Character } from './characters/Character'
import './Cast.css'

// A percentage below this makes a character look small and withdrawn.
const LOW_PERCENT = 8

// The row of five characters standing on one shared ground line.
// Each one is absolutely positioned using the left and width computed by layoutStage().
// Because each <li> keeps the same `key` between renders, React reuses the same page
// element and the CSS transition on left/width animates it from the old spot to the new.
export function Cast({ items }: { items: StageItem[] }) {
  return (
    <ul className="cast" aria-hidden="true">
      {items.map((item) => {
        const style = {
          '--left': item.left,
          '--width': item.width,
          '--energy': item.energy,
        } as CSSProperties
        return (
          <li
            key={item.emotion}
            className="cast__item"
            data-emotion={item.emotion}
            data-low={item.percent !== null && item.percent < LOW_PERCENT}
            style={style}
          >
            <div className="cast__bob">
              <Character emotion={item.emotion} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
