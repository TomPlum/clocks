import { Clock } from '../Clock'
import styles from './TimeDisplay.module.scss'
import { useEffect, useState } from 'react'
import { getHandDirections, totalHeight, totalWidth } from './utils.ts'

export const TimeDisplay = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.TimeDisplay}>
      {Array.from({ length: totalWidth }, (_, i) => i).flatMap((x: number) => (
        <div className={styles.TimeDisplay__Column}>
          {Array.from({ length: totalHeight }, (_, i) => i).map((y: number) => {
            const { hour, minute, digit } = getHandDirections(time, x, y)

            return (
              <Clock
                digit={digit}
                hourDirection={hour}
                minuteDirection={minute}
                key={`clock-${x}-${y}`}
                id={`(${x},${y})`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}