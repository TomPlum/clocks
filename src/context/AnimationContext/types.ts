import type { ClockAnimation, ClockAnimationConfig } from 'modules/TimeDisplay/components/Clock'

export interface AnimationContextBag {
  animating: boolean
  setCurrentAnimation: (animation?: ClockAnimation) => void
  currentAnimationConfig?: ClockAnimationConfig
  initialAnimating: boolean
  setInitialAnimating: (initialAnimating: boolean) => void
}