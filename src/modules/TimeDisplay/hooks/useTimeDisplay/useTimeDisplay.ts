import { createRef, useCallback, useRef } from 'react'
import type { TimeDisplayClockRefs, UseTimeDisplayProps } from './types'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useAnimationContext } from 'context/AnimationContext'
import type { AnimationCleanupFunction, ClockRefHandler } from 'modules/TimeDisplay/components/Clock'

export const useTimeDisplay = ({ currentTime }: UseTimeDisplayProps) => {
  const clocks = useRef<TimeDisplayClockRefs>(new Map())

  const { loadingAnimation, manualTime } = useConfigContext()
  const { setInitialAnimating } = useAnimationContext()

  const initialiseClock = (id: string) => {
    if (!clocks.current.has(id)) {
      clocks.current.set(id, createRef<ClockRefHandler>())
    }

    return clocks.current.get(id)!
  }

  const commandAllClocks = (action: (clock: ClockRefHandler) => void) => {
    clocks.current.forEach((ref) => {
      if (ref.current) {
        action(ref.current)
      }
    })
  }

  const easeToTime = (time: Date) => {
    commandAllClocks(clock => {
      clock.easeToTime(time)
    })
  }

  const runLoadingAnimation = useCallback(() => {
    let cleanUpLoadingAnimation: AnimationCleanupFunction
    let cleanUpEaseAnimation: AnimationCleanupFunction

    const notifyLoadingComplete = () => {
      setInitialAnimating(false)
    }

    commandAllClocks(clock => {
      cleanUpLoadingAnimation = clock.runAnimation(loadingAnimation, {
        time: manualTime ?? currentTime,
        onComplete: notifyLoadingComplete
      })
    })

    return () => {
      cleanUpLoadingAnimation?.()
      cleanUpEaseAnimation?.()
    }
  }, [currentTime, loadingAnimation, manualTime, setInitialAnimating])

  return {
    runLoadingAnimation,
    initialiseClock,
    easeToTime
  }
}