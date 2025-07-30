import { AnimationContext } from './AnimationContext'
import { type PropsWithChildren, useMemo, useState } from 'react'
import type { AnimationContextBag } from './types'
import type { ClockAnimation } from 'modules/TimeDisplay/components/Clock'
import { getAnimationConfig } from 'modules/TimeDisplay/hooks/useClockAnimation/getAnimationConfig'

export const AnimationContextProvider = ({ children }: PropsWithChildren) => {
  const [currentAnimation, setCurrentAnimation] = useState<ClockAnimation>()
  const [initialAnimating, setInitialAnimating] = useState(true)

  const animating = currentAnimation !== undefined

  const value = useMemo<AnimationContextBag>(() => ({
    animating: animating || initialAnimating,
    setCurrentAnimation,
    initialAnimating,
    setInitialAnimating,
    currentAnimationConfig: currentAnimation ? getAnimationConfig(currentAnimation) : undefined
  }), [animating, currentAnimation, initialAnimating])

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}