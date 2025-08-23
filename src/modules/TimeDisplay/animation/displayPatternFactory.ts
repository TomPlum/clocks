import type { TimeDisplayPattern } from 'modules/TimeDisplay'
import { getAngleForCircularPattern } from './patterns/circular'
import { getAngleForPointToCenterPattern } from './patterns/point-to-center'
import { getAnglesForVerticalPattern } from 'modules/TimeDisplay/animation/patterns/vertical'
import { getAnglesForHorizontalPattern } from 'modules/TimeDisplay/animation/patterns/horizontal'
import { getAnglesForAwayFromXAxisPattern } from './patterns/away-from-x-axis'
import { getAnglesForDiagonalPattern } from 'modules/TimeDisplay/animation/patterns/diagonal'

export const getHandAnglesForPattern = (
  x: number,
  y: number,
  pattern: TimeDisplayPattern,
  vertical: boolean
) => {
  switch (pattern) {
    case 'circular': {
      return getAngleForCircularPattern(x, y, vertical)
    }
    case 'point-towards-middle': {
      return getAngleForPointToCenterPattern(x, y,vertical)
    }
    case 'vertical': {
      return getAnglesForVerticalPattern()
    }
    case 'horizontal': {
      return getAnglesForHorizontalPattern()
    }
    case 'away-from-x-axis': {
      return getAnglesForAwayFromXAxisPattern(y, vertical)
    }
    case 'diagonal': {
      return getAnglesForDiagonalPattern()
    }
  }
}