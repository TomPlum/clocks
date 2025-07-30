import { useState } from 'react'
import type { UseClockAnimationProps } from './types'
import type { ClockAnimation, ClockAnimationConfig } from 'modules/TimeDisplay/components/Clock'
import { getAnimationConfig } from './getAnimationConfig'
import { randomInteger } from 'utility/randomInteger'
import { useAnimationContext } from 'context/AnimationContext'

export const useClockAnimation = ({
  displayMinuteAngle,
  displayHourAngle
}: UseClockAnimationProps) => {
  const { currentAnimationConfig, setCurrentAnimation } = useAnimationContext()

  const [hourHandAngle, setHourHandAngle] = useState(currentAnimationConfig?.hourHandStartingAngle ?? randomInteger(0, 360))
  const [minuteHandleAngle, setMinuteHandleAngle] = useState(currentAnimationConfig?.minuteHandStartingAngle ?? randomInteger(0, 360))

  const easeToTime = () => {
    const { animationDuration = 5000 } = getAnimationConfig('ease-to-time')

    setCurrentAnimation('ease-to-time')
    setTimeout(() => {
      setCurrentAnimation(undefined)
    }, animationDuration)

    let animationFrameId: number

    const startHour = hourHandAngle
    const startMinute = minuteHandleAngle
    const endHour = displayHourAngle
    const endMinute = displayMinuteAngle
    const startTime = performance.now()

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      const eased = easeInOutQuad(progress)

      const interpolateAngle = (start: number, end: number) => {
        const delta = ((end - start + 540) % 360) - 180
        return (start + delta * eased + 360) % 360
      }

      setHourHandAngle(interpolateAngle(startHour, endHour))
      setMinuteHandleAngle(interpolateAngle(startMinute, endMinute))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }

  const runAnimation = (animation: ClockAnimation, configOverrides?: ClockAnimationConfig) => {
    const { animationDuration = 5000, animationSpeed = 3000 } = {
      ...getAnimationConfig(animation),
      ...configOverrides
    }

    setCurrentAnimation(animation)
    setTimeout(() => {
      setCurrentAnimation(undefined)
    }, animationDuration)

    switch (animation) {
      case 'random': {
        let animationFrameId: number
        const startHourAngle = hourHandAngle
        const startMinuteAngle = minuteHandleAngle
        const startTime = performance.now()

        const hourDirection = 1   // clockwise
        const minuteDirection = -1 // anti-clockwise

        const hourDegreesPerMs = 360 / animationSpeed // degrees per ms
        const minuteDegreesPerMs = 360 / (animationSpeed / 2) // faster

        const animate = (now: number) => {
          const elapsed = now - startTime

          if (elapsed < animationDuration) {
            const hourAngle = (startHourAngle + hourDirection * hourDegreesPerMs * elapsed) % 360
            const minuteAngle = (startMinuteAngle + minuteDirection * minuteDegreesPerMs * elapsed) % 360

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)

            animationFrameId = requestAnimationFrame(animate)
          } else {
            const hourAngle = (startHourAngle + hourDirection * hourDegreesPerMs * animationDuration) % 360
            const minuteAngle = (startMinuteAngle + minuteDirection * minuteDegreesPerMs * animationDuration) % 360

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)
          }
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrameId)
      }
      case 'ease-to-time': {
        let animationFrameId: number

        const startHour = hourHandAngle
        const startMinute = minuteHandleAngle
        const endHour = displayHourAngle
        const endMinute = displayMinuteAngle
        const startTime = performance.now()

        const easeInOutQuad = (t: number) =>
          t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

        const animate = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / animationDuration, 1)
          const eased = easeInOutQuad(progress)

          const interpolateAngle = (start: number, end: number) => {
            const delta = ((end - start + 540) % 360) - 180
            return (start + delta * eased + 360) % 360
          }

          setHourHandAngle(interpolateAngle(startHour, endHour))
          setMinuteHandleAngle(interpolateAngle(startMinute, endMinute))

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate)
          }
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => {
          cancelAnimationFrame(animationFrameId)
        }
      }
      case 'clockwise-rotation': {
        let animationFrameId: number
        const startHourAngle = hourHandAngle
        const startMinuteAngle = minuteHandleAngle
        const startTime = performance.now()

        const hourDegreesPerMs = 360 / animationSpeed // degrees per ms
        const minuteDegreesPerMs = 360 / (animationSpeed / 2) // faster

        const animate = (now: number) => {
          const elapsed = now - startTime

          if (elapsed < animationDuration) {
            const hourAngle = (startHourAngle + hourDegreesPerMs * elapsed) % 360
            const minuteAngle = (startMinuteAngle + minuteDegreesPerMs * elapsed) % 360

            setHourHandAngle((hourAngle + 360) % 360)
            setMinuteHandleAngle((minuteAngle + 360) % 360)

            animationFrameId = requestAnimationFrame(animate)
          } else {
            const hourAngle = (startHourAngle + hourDegreesPerMs * animationDuration) % 360
            const minuteAngle = (startMinuteAngle + minuteDegreesPerMs * animationDuration) % 360

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