import { useState } from 'react'
import type { UseClockAnimationProps } from './types'
import type { ClockAnimation, RunAnimationConfig } from 'modules/TimeDisplay/components/Clock'
import { getAnimationConfig } from './getAnimationConfig'
import { randomInteger } from 'utility/randomInteger'
import { useAnimationContext } from 'context/AnimationContext'
import { getHandDirections } from 'modules/TimeDisplay/utils'

export const useClockAnimation = ({
  position
}: UseClockAnimationProps) => {
  const { currentAnimationConfig, setCurrentAnimation } = useAnimationContext()

  const [hourHandAngle, setHourHandAngle] = useState(currentAnimationConfig()?.hourHandStartingAngle ?? randomInteger(0, 360))
  const [minuteHandleAngle, setMinuteHandleAngle] = useState(currentAnimationConfig()?.minuteHandStartingAngle ?? randomInteger(0, 360))

  const easeToTime = (time: Date, config?: RunAnimationConfig) => {
    const animationDuration = 3000
    setCurrentAnimation('ease-to-time')

    const { x, y } = position
    const { hour: endHour, minute: endMinute } = getHandDirections({ time, x, y })

    let animationFrameId: number

    const startHour = hourHandAngle
    const startMinute = minuteHandleAngle
    const startTime = performance.now()

    const interpolateAngle = (start: number, end: number, t: number) => {
      const delta = ((end - start + 540) % 360) - 180
      return (start + delta * t + 360) % 360
    }

    const animate = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / animationDuration, 1)

      const hourAngle = interpolateAngle(startHour, endHour, t)
      const minuteAngle = interpolateAngle(startMinute, endMinute, t)

      setHourHandAngle(hourAngle)
      setMinuteHandleAngle(minuteAngle)

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCurrentAnimation(undefined)
        config?.onComplete?.()
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }

  const runAnimation = (animation: ClockAnimation, config?: RunAnimationConfig) => {
    const { animationDuration = 5000, animationSpeed = 3000 } = {
      ...getAnimationConfig(animation),
      ...config
    }

    const easeConfig = getAnimationConfig('ease-to-time')
    const easeDuration = easeConfig?.animationDuration ?? 0
    const finalDuration = animationDuration + easeDuration

    if (!config?.dontNotify) {
      setCurrentAnimation(animation)
    }

    const { x, y } = position
    const { hour, minute } = getHandDirections({ time: config?.time ?? new Date(), x, y })

    switch (animation) {
      case 'random': {
        let animationFrameId: number
        const startHourAngle = hourHandAngle
        const startMinuteAngle = minuteHandleAngle
        const startTime = performance.now()

        const hourDirection = 1
        const minuteDirection = -1

        const hourDegreesPerMs = 360 / animationSpeed
        const minuteDegreesPerMs = 360 / (animationSpeed / 2)

        let finalHourAngle = 0
        let finalMinuteAngle = 0

        const animate = (now: number) => {
          const elapsed = now - startTime

          if (elapsed < animationDuration) {
            const hourAngle = (startHourAngle + hourDirection * hourDegreesPerMs * elapsed) % 360
            const minuteAngle = (startMinuteAngle + minuteDirection * minuteDegreesPerMs * elapsed) % 360

            finalHourAngle = hourAngle
            finalMinuteAngle = minuteAngle

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)

            animationFrameId = requestAnimationFrame(animate)
          } else if (elapsed < finalDuration) {
            const t = (elapsed - animationDuration) / easeDuration

            const hourAngle = finalHourAngle + t * (hour - finalHourAngle)
            const minuteAngle = finalMinuteAngle + t * (minute - finalMinuteAngle)

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)

            animationFrameId = requestAnimationFrame(animate)
          } else {
            setHourHandAngle(hour)
            setMinuteHandleAngle(minute)

            config?.onComplete?.()
            setCurrentAnimation(undefined)
          }
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrameId)
      }
      case 'clockwise-rotation': {
        let animationFrameId: number
        const startHourAngle = hourHandAngle
        const startMinuteAngle = minuteHandleAngle
        const startTime = performance.now()

        const degreesPerMs = 360 / animationSpeed

        const animate = (now: number) => {
          const elapsed = now - startTime

          if (elapsed < animationDuration) {
            const hourAngle = (startHourAngle + degreesPerMs * elapsed) % 360
            const minuteAngle = (startMinuteAngle + degreesPerMs * elapsed) % 360

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)

            animationFrameId = requestAnimationFrame(animate)
          } else {
            const hourAngle = (startHourAngle + degreesPerMs * animationDuration) % 360
            const minuteAngle = (startMinuteAngle + degreesPerMs * animationDuration) % 360

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)
          }
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrameId)
      }
    }
  }

  return {
    hourHandAngle,
    minuteHandleAngle,
    runAnimation,
    easeToTime
  }
}