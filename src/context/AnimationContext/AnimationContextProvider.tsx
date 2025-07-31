import { AnimationContext } from './AnimationContext'
import { type PropsWithChildren, useMemo, useState } from 'react'
import type { AnimationContextBag } from './types'
import type { ClockAnimation } from 'modules/TimeDisplay/components/Clock'
import { getAnimationConfig } from 'modules/TimeDisplay/hooks/useClockAnimation/getAnimationConfig'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'

export const AnimationContextProvider = ({ children }: PropsWithChildren) => {
  const [currentAnimation, setCurrentAnimation] = useState<ClockAnimation>()
  const [initialAnimating, setInitialAnimating] = useState(true)

  const { loadingAnimation } = useConfigContext()

  const animating = Boolean(currentAnimation).valueOf()

  const currentAnimationConfig = useMemo(() => {
    if (initialAnimating) {
      return () => getAnimationConfig(loadingAnimation)
    }

    if (currentAnimation) {
      return () => getAnimationConfig(currentAnimation)
    }

    return () => undefined
  }, [currentAnimation, initialAnimating, loadingAnimation])

  const value = useMemo<AnimationContextBag>(() => ({
    animating: animating || initialAnimating,
    setCurrentAnimation,
    initialAnimating,
    setInitialAnimating,
    currentAnimationConfig
  }), [animating, currentAnimationConfig, initialAnimating])

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}