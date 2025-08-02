import { useState } from 'react'
import type { RequestAnimationFrameConfig, UseClockAnimationProps } from './types'
import type { ClockAnimation, RunAnimationConfig } from 'modules/TimeDisplay/components/Clock'
import { getAnimationConfig } from './getAnimationConfig'
import { randomInteger } from 'utility/randomInteger'
import { useAnimationContext } from 'context/AnimationContext'
import { getHandAnglesForPattern, getHandDirections } from 'modules/TimeDisplay/utils'
import { interpolateAngle } from 'utility/interpolateAngle'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'

export const useClockAnimation = ({
  id,
  position
}: UseClockAnimationProps) => {
  const { digitAnimationDuration, timeDisplayPattern } = useConfigContext()
  const { currentAnimationConfig, setCurrentAnimation } = useAnimationContext()

  const [hourHandAngle, setHourHandAngle] = useState(currentAnimationConfig()?.hourHandStartingAngle ?? randomInteger(0, 360))
  const [minuteHandleAngle, setMinuteHandleAngle] = useState(currentAnimationConfig()?.minuteHandStartingAngle ?? randomInteger(0, 360))

  const doAnimation = ({
    name,
    onFrame,
    duration,
    onComplete,
    useEasing = false,
    shouldNotify = true
  }: RequestAnimationFrameConfig) => {
    if (shouldNotify) {
      setCurrentAnimation(name)
    }

    let animationFrameId: number

    const startTime = performance.now()

    const frame = (now: number) => {
      const elapsed = now - startTime
      const value = useEasing
        ? Math.min(elapsed / duration, 1)
        : Math.min(elapsed, duration)

      onFrame(value)

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(frame)
      } else {
        setCurrentAnimation(undefined)
        onComplete?.(id)
      }
    }

    animationFrameId = requestAnimationFrame(frame)

    return () => cancelAnimationFrame(animationFrameId)
  }

  const easeToTime = (time: Date, config?: RunAnimationConfig) => {
    const { x, y } = position
    const { hour: endHour, minute: endMinute } = getHandDirections({
      time,
      x, y,
      pattern: timeDisplayPattern
    })

    return doAnimation({
      name: 'ease-to-time',
      duration: digitAnimationDuration,
      useEasing: true,
      onComplete: config?.onComplete,
      onFrame: (progress: number) => {
        const hourAngle = interpolateAngle(hourHandAngle, endHour, progress)
        const minuteAngle = interpolateAngle(minuteHandleAngle, endMinute, progress)

        setHourHandAngle(hourAngle)
        setMinuteHandleAngle(minuteAngle)
      }
    })
  }

  const easeToCurrentPattern = () => {
    const { hour, minute } = getHandAnglesForPattern(position.x, position.y, timeDisplayPattern)
    
    return doAnimation({
      name: 'ease-to-pattern',
      duration: 2000,
      useEasing: true,
      onFrame: (progress: number) => {
        const hourAngle = interpolateAngle(hourHandAngle, hour, progress)
        const minuteAngle = interpolateAngle(minuteHandleAngle, minute, progress)

        setHourHandAngle(hourAngle)
        setMinuteHandleAngle(minuteAngle)
      }
    })
  }

  const runAnimation = (animation: ClockAnimation, config?: RunAnimationConfig) => {
    const { animationDuration = 5000, animationSpeed = 3000 } = {
      ...getAnimationConfig(animation),
      ...config
    }

    switch (animation) {
      case 'random': {
        const easeConfig = getAnimationConfig('ease-to-time')
        const easeDuration = easeConfig?.animationDuration ?? 0
        const finalDuration = animationDuration + easeDuration

        const startHourAngle = hourHandAngle
        const startMinuteAngle = minuteHandleAngle

        const hourDirection = 1
        const minuteDirection = -1

        const hourDegreesPerMs = 360 / animationSpeed
        const minuteDegreesPerMs = 360 / (animationSpeed / 2)

        let finalHourAngle = 0
        let finalMinuteAngle = 0

        const { x, y } = position
        const { hour, minute } = getHandDirections({
          time: config?.postAnimationTimeTarget ?? new Date(),
          x, y,
          pattern: timeDisplayPattern
        })

        return doAnimation({
          name: 'random',
          onComplete: config?.onComplete,
          useEasing: false,
          duration: finalDuration,
          shouldNotify: !config?.dontNotify,
          onFrame: (elapsed: number) => {
            if (elapsed < animationDuration) {
              const hourAngle = (startHourAngle + hourDirection * hourDegreesPerMs * elapsed) % 360
              const minuteAngle = (startMinuteAngle + minuteDirection * minuteDegreesPerMs * elapsed) % 360

              finalHourAngle = hourAngle
              finalMinuteAngle = minuteAngle

              setHourHandAngle((hourAngle + 360) % 360)
              setMinuteHandleAngle((minuteAngle + 360) % 360)
            } else if (elapsed < finalDuration) {
              const t = (elapsed - animationDuration) / easeDuration

              const hourAngle = finalHourAngle + t * (hour - finalHourAngle)
              const minuteAngle = finalMinuteAngle + t * (minute - finalMinuteAngle)

              setHourHandAngle((hourAngle + 360) % 360)
              setMinuteHandleAngle((minuteAngle + 360) % 360)
            }
          }
        })
      }
      case 'clockwise-rotation': {
        const degreesPerMs = 360 / animationSpeed

        return doAnimation({
          name: 'clockwise-rotation',
          useEasing: false,
          duration: animationDuration,
          onComplete: config?.onComplete,
          onFrame: (elapsed: number) => {
            const hourAngle = (hourHandAngle + degreesPerMs * elapsed) % 360
            const minuteAngle = (minuteHandleAngle + degreesPerMs * elapsed) % 360

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)
          }
        })
      }
    }
  }

  return {
    hourHandAngle,
    minuteHandleAngle,
    runAnimation,
    easeToTime,
    easeToCurrentPattern
  }
}