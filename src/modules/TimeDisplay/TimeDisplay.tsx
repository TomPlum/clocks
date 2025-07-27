import { Clock } from 'modules/TimeDisplay/components/Clock'
import styles from './TimeDisplay.module.scss'
import { useEffect, useState } from 'react'
import { getHandDirections, iterateTimes, totalHeight, totalWidth } from './utils'

const loadingAnimationDuration = 5000
const defaultAnimationDuration = 3000

export const TimeDisplay = () => {
  const [time, setTime] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [animationDuration, setAnimationDuration] = useState(loadingAnimationDuration)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)

      setTimeout(() => {
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
                minuteHandAngle={minute}
                key={`clock-${x}-${y}`}
                pulse={!loading && isColon}
                animationDuration={animationDuration}
                animation={loading ? 'random' : 'ease-to-time'}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}