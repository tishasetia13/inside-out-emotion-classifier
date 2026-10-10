import type { Emotion } from '../../types/emotion'
import { Anger } from './Anger'
import { Disgust } from './Disgust'
import { Fear } from './Fear'
import { Joy } from './Joy'
import { Sadness } from './Sadness'
import './characters.css'

// Picks the right character illustration for an emotion.
export function Character({ emotion }: { emotion: Emotion }) {
  switch (emotion) {
    case 'anger':
      return <Anger />
    case 'disgust':
      return <Disgust />
    case 'fear':
      return <Fear />
    case 'joy':
      return <Joy />
    case 'sadness':
      return <Sadness />
  }
}
