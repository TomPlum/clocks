import { createContext } from 'react'
import type { AnimationContextBag } from './types'
import type { ClockAnimation } from 'modules/TimeDisplay/components/Clock'

export const AnimationContext = createContext<AnimationContextBag>({
  animating: false,
  setCurrentAnimation: (animation?: ClockAnimation) => {
    console.error(`Tried to invoke setCurrentAnimation(${animation}) before the AnimationContext was initialised.`)
  },
  initialAnimating: false,
  setInitialAnimating: (initialAnimating: boolean) => {
    console.error(`Tried to invoke setInitialAnimating(${initialAnimating}) before the AnimationContext was initialised.`)
  },
  currentAnimationConfig: () => {
    return {}
  }
})