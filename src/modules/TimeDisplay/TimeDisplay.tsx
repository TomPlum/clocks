import { Clock, type ClockAnimation, type ClockRefHandler } from 'modules/TimeDisplay/components/Clock'
import styles from './TimeDisplay.module.scss'
import { createRef, forwardRef, type RefObject, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { getHandDirections, iterateTimes, totalHeight, totalWidth } from './utils'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { defaultAnimationDuration, loadingAnimationDuration, type TimeDisplayRefHandle } from './types'

export const TimeDisplay = forwardRef<TimeDisplayRefHandle>((_, ref) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { manualTime, enableColonAnimation } = useConfigContext()

  const [canPulse, setCanPulse] = useState(false)
  const [animation, setAnimation] = useState<ClockAnimation>('random')
  const [animationDuration, setAnimationDuration] = useState(loadingAnimationDuration)

  const clocks = useRef<Map<string, RefObject<ClockRefHandler | null>>>(new Map())
  const startEasingToTime = useRef<NodeJS.Timeout>(null)
  const setDefaultAnimationDuration = useRef<NodeJS.Timeout>(null)
  const tickTimeInterval = useRef<NodeJS.Timeout>(null)

  const animateAndStartTime = () => {
    if (startEasingToTime.current) clearTimeout(startEasingToTime.current)
    if (setDefaultAnimationDuration.current) clearTimeout(setDefaultAnimationDuration.current)
    if (tickTimeInterval.current) clearInterval(tickTimeInterval.current)

    clocks.current.forEach((ref) => {
      if (ref.current) {
        ref.current.randomiseHandPositions()
      }
    })

    startEasingToTime.current = setTimeout(() => {
      setAnimation('ease-to-time')

      setDefaultAnimationDuration.current = setTimeout(() => {
        setCanPulse(true)
        setAnimationDuration(defaultAnimationDuration)
      }, loadingAnimationDuration)
    }, defaultAnimationDuration)

    tickTimeInterval.current = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  }

  useEffect(() => {
    animateAndStartTime()

    return () => {
      if (startEasingToTime.current) {
        clearTimeout(startEasingToTime.current)
      }

      if (setDefaultAnimationDuration.current) {
        clearTimeout(setDefaultAnimationDuration.current)
      }

      if (tickTimeInterval.current) {
        clearInterval(tickTimeInterval.current)
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    reset: () => {
      setAnimation('random')
      setCanPulse(false)
      animateAndStartTime()
    }
  }))

  return (
    <div className={styles.TimeDisplay}>
      {iterateTimes(totalWidth).flatMap((x: number) => (
        <div className={styles.TimeDisplay__Column} key={`row-${x}`}>
          {iterateTimes(totalHeight).map((y: number) => {
            const clockId = `(${x},${y})`

            if (!clocks.current.has(clockId)) {
              clocks.current.set(clockId, createRef<ClockRefHandler>())
            }

            const clockRef = clocks.current.get(clockId)!

            const { hour, minute, digit, isColon } = getHandDirections({
              time: manualTime ?? currentTime,
              x,
              y
            })

            return (
              <Clock
                id={clockId}
                digit={digit}
                ref={clockRef}
                hourHandAngle={hour}
                animation={animation}
                minuteHandAngle={minute}
                key={`clock-${x}-${y}`}
                animationDuration={animationDuration}
                pulse={canPulse && isColon && enableColonAnimation}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
})