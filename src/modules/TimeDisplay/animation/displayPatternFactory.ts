import type { TimeDisplayPattern } from 'modules/TimeDisplay'
import { getAngleForCircularPattern } from './patterns/circular'
import { getAngleForPointToCenterPattern } from './patterns/pointToCenter'

export const getHandAnglesForPattern = (x: number, y: number, pattern: TimeDisplayPattern) => {
  switch (pattern) {
    case 'circular': {
      return getAngleForCircularPattern(x, y)
    }
    case 'point-towards-middle': {
      return getAngleForPointToCenterPattern(x, y)
    }
  }
}