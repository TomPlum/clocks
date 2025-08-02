import { createRef, useCallback, useEffect, useRef } from 'react'
import type { InitialiseClockProps, TimeDisplayClockRefs, TimeDisplayCommand, UseTimeDisplayProps } from './types'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useAnimationContext } from 'context/AnimationContext'
import type { AnimationCleanupFunction, ClockRefHandler } from 'modules/TimeDisplay/components/Clock'

export const useTimeDisplay = ({ currentTime }: UseTimeDisplayProps) => {
  const clocks = useRef<TimeDisplayClockRefs>(new Map())

  const digitClocks = useRef(new Map<string, boolean>())
  const colonClocks = useRef(new Map<string, boolean>())

  const { setInitialAnimating } = useAnimationContext()
  const { loadingAnimation, manualTime, animationStagger, timeDisplayPattern } = useConfigContext()

  const initialiseClock = ({ id, isDigit, isColon }: InitialiseClockProps) => {
    if (!clocks.current.has(id)) {
      clocks.current.set(id, createRef<ClockRefHandler>())
    }

    digitClocks.current.set(id, isDigit)
    colonClocks.current.set(id, isColon)

    return clocks.current.get(id)!
  }

  const commandAllClocks = useCallback(({ action, stagger }: TimeDisplayCommand) => {
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
  }, [animationStagger])

  const commandNonDigitClocks = useCallback(({ action, stagger }: TimeDisplayCommand) => {
    const isNonDigitClock = (id: string) => {
      return !digitClocks.current.get(id) && !colonClocks.current.get(id)
    }

    if (stagger) {
      let animationOffset = 0

      clocks.current.forEach((ref, id) => {
        setTimeout(() => {
          if (isNonDigitClock(id) && ref.current) {
            action(ref.current)
          }
        }, animationOffset)

        animationOffset += animationStagger
      })
    } else {
      clocks.current.forEach((ref, id) => {
        if (isNonDigitClock(id) && ref.current) {
          action(ref.current)
        }
      })
    }
  }, [animationStagger])

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

    const notifyLoadingComplete = (clockId: string) => {
      const finalClockIdentifier = '(25,9)'

      if (clockId === finalClockIdentifier) {
        setInitialAnimating(false)
      }
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
  }, [commandAllClocks, currentTime, loadingAnimation, manualTime, setInitialAnimating])

  useEffect(() => {
    commandNonDigitClocks({
      action: clock => {
        clock.easeToCurrentPattern()
      }
    })
  }, [commandNonDigitClocks, timeDisplayPattern])

  return {
    runLoadingAnimation,
    initialiseClock,
    easeToTime
  }
}