import type { ClockAnimation, ClockAnimationConfig } from 'modules/TimeDisplay/components/Clock'
import { randomInteger } from 'utility/randomInteger'

export const getAnimationConfig = (animation: ClockAnimation): ClockAnimationConfig => {
  switch (animation) {
    case 'random': {
      return {
        hourHandStartingAngle: randomInteger(0, 360),
        minuteHandStartingAngle: randomInteger(0, 360),
        animationSpeed: randomInteger(5000, 20_000),
        animationDuration: 5000
      }
    }
    case 'ease-to-time': {
      return {
        animationDuration: 3000
      }
    }
    case 'clockwise-rotation': {
      return {
        minuteHandStartingAngle: 0,
        hourHandStartingAngle: 180,
        animationSpeed: 2500,
        animationDuration: 5000
      }
    }
    case 'ease-to-pattern': {
      return {
        animationDuration: 2000
      }
    }
  }
}