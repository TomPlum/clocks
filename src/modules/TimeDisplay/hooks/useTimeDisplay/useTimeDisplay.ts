import { createRef, useCallback, useRef } from 'react'
import type { TimeDisplayClockRefs } from './types'
import { getAnimationConfig } from 'modules/TimeDisplay/hooks/useClockAnimation/getAnimationConfig'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useAnimationContext } from 'context/AnimationContext'
import type { ClockRefHandler } from 'modules/TimeDisplay/components/Clock'

export const useTimeDisplay = () => {
  const clocks = useRef<TimeDisplayClockRefs>(new Map())

  const { loadingAnimation } = useConfigContext()
  const { setInitialAnimating } = useAnimationContext()
  const { animationDuration: loadingAnimationDuration } = getAnimationConfig(loadingAnimation)

  const initialiseClock = (id: string) => {
    if (!clocks.current.has(id)) {
      clocks.current.set(id, createRef<ClockRefHandler>())
    }

    return clocks.current.get(id)!
  }

  const easeToSelectedTime = () => {
    clocks.current.forEach((ref) => {
      if (ref.current) {
        ref.current.easeToTime()
      }
    })
  }

  const runLoadingAnimation = useCallback(() => {
    clocks.current.forEach((ref) => {
      if (ref.current) {
        ref.current.runAnimation(loadingAnimation)

        setTimeout(() => {
          ref.current?.easeToTime()

          setTimeout(() => {
            setInitialAnimating(false)
          }, getAnimationConfig('ease-to-time').animationDuration)
        }, loadingAnimationDuration)
      }
    })
  }, [loadingAnimation, loadingAnimationDuration, setInitialAnimating])

  return {
    easeToSelectedTime,
    runLoadingAnimation,
    initialiseClock
  }
}