import { createRef, useCallback, useRef } from 'react'
import type { TimeDisplayClockRefs, TimeDisplayCommand, UseTimeDisplayProps } from './types'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useAnimationContext } from 'context/AnimationContext'
import type { AnimationCleanupFunction, ClockRefHandler } from 'modules/TimeDisplay/components/Clock'

export const useTimeDisplay = ({ currentTime }: UseTimeDisplayProps) => {
  const clocks = useRef<TimeDisplayClockRefs>(new Map())

  const { setInitialAnimating } = useAnimationContext()
  const { loadingAnimation, manualTime, animationStagger } = useConfigContext()

  const initialiseClock = (id: string) => {
    if (!clocks.current.has(id)) {
      clocks.current.set(id, createRef<ClockRefHandler>())
    }

    return clocks.current.get(id)!
  }

  const commandAllClocks = ({ action, stagger }: TimeDisplayCommand) => {
    if (stagger) {
      let animationOffset = 0

      clocks.current.forEach((ref) => {
        setTimeout(() => {
          if (ref.current) {
            action(ref.current)
          }
        }, animationOffset)

        animationOffset += animationStagger
      })
    } else {
      clocks.current.forEach((ref) => {
        if (ref.current) {
          action(ref.current)
        }
      })
    }
  }

  const easeToTime = (time: Date) => {
    commandAllClocks({
      action: clock => {
        clock.easeToTime(time)
      }
    })
  }

  const runLoadingAnimation = useCallback(() => {
    let cleanUpLoadingAnimation: AnimationCleanupFunction
    let cleanUpEaseAnimation: AnimationCleanupFunction

    const notifyLoadingComplete = () => {
      setInitialAnimating(false)
    }

    commandAllClocks({
      stagger: true,
      action: clock => {
        cleanUpLoadingAnimation = clock.runAnimation(loadingAnimation, {
          postAnimationTimeTarget: manualTime ?? currentTime,
          onComplete: notifyLoadingComplete
        })
      }
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