import type { ClockAnimation, ClockAnimationConfig } from 'modules/TimeDisplay/components/Clock'

export interface AnimationContextBag {
  animating: boolean
  setCurrentAnimation: (animation?: ClockAnimation) => void
  currentAnimationConfig: () => ClockAnimationConfig | undefined
  initialAnimating: boolean
  setInitialAnimating: (initialAnimating: boolean) => void
}