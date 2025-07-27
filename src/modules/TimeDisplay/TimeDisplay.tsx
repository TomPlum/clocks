import { Clock, type ClockAnimation } from 'modules/TimeDisplay/components/Clock'
import styles from './TimeDisplay.module.scss'
import { useEffect, useState } from 'react'
import { getHandDirections, iterateTimes, totalHeight, totalWidth } from './utils'

const loadingAnimationDuration = 5000
const defaultAnimationDuration = 3000

export const TimeDisplay = () => {
  const [time, setTime] = useState(new Date())

  const [canPulse, setCanPulse] = useState(false)
  const [animation, setAnimation] = useState<ClockAnimation>('random')
  const [animationDuration, setAnimationDuration] = useState(loadingAnimationDuration)

  useEffect(() => {
    setTimeout(() => {
      setAnimation('ease-to-time')

      setTimeout(() => {
        setCanPulse(true)
        setAnimationDuration(defaultAnimationDuration)
      }, loadingAnimationDuration)
    }, defaultAnimationDuration)

    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={styles.TimeDisplay}>
      {iterateTimes(totalWidth).flatMap((x: number) => (
        <div className={styles.TimeDisplay__Column} key={`row-${x}`}>
          {iterateTimes(totalHeight).map((y: number) => {
            const { hour, minute, digit, isColon } = getHandDirections(time, x, y)

            return (
              <Clock
                digit={digit}
                id={`(${x},${y})`}
                hourHandAngle={hour}
                animation={animation}
                minuteHandAngle={minute}
                key={`clock-${x}-${y}`}
                pulse={canPulse && isColon}
                animationDuration={animationDuration}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}