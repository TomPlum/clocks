import { Clock } from '../Clock'
import styles from './TimeDisplay.module.scss'
import { useEffect, useState } from 'react'
import { getHandDirections, totalHeight, totalWidth } from './utils'
import { useThemeContext } from 'context/ThemeContext'
import { ThemeSelector } from 'components/ThemeSelector'

export const TimeDisplay = () => {
  const { themeColours } = useThemeContext()

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.Container} style={{ backgroundColor: themeColours.background }}>
      <div>
        <ThemeSelector />
      </div>
      
      <div className={styles.TimeDisplay}>
        {Array.from({ length: totalWidth }, (_, i) => i).flatMap((x: number) => (
          <div className={styles.TimeDisplay__Column} key={`row-${x}`}>
            {Array.from({ length: totalHeight }, (_, i) => i).map((y: number) => {
              const { hour, minute, digit, isColon } = getHandDirections(time, x, y)

              return (
                <Clock
                  digit={digit}
                  pulse={isColon}
                  id={`(${x},${y})`}
                  hourDirection={hour}
                  minuteDirection={minute}
                  key={`clock-${x}-${y}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}