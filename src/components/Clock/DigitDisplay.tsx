import styles from '../TimeDisplay/TimeDisplay.module.scss'
import { Clock } from './Clock.tsx'
import { digitSegments, HandDirection } from '../TimeDisplay'

export const DigitDisplay = ({ digit }: { digit: number }) => {
  return (
    <div className={styles.TimeDisplay} style={{ marginTop: 20 }}>
      {digit}
      {Array.from({ length: 5 }, (_, i) => i).flatMap((x: number) => (
        <div>
          {Array.from({ length: 6 }, (_, i) => i).map((y: number) => {
            const { x: xClock, y: yClock, hourDirection, minuteDirection } = digitSegments[digit].find(it => it.x === x && it.y === y) ?? {
              x,
              y,
              minuteDirection: HandDirection.LEFT,
              hourDirection: HandDirection.RIGHT
            }

            return (
              <Clock
                digit={digit}
                hourDirection={hourDirection}
                minuteDirection={minuteDirection}
                id={`(${xClock},${yClock})`}
                key={`clock-${xClock}-${yClock}`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}