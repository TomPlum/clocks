import styles from 'modules/TimeDisplay/TimeDisplay.module.scss'
import { Clock } from './Clock'
import { digitSegments } from 'modules/TimeDisplay/grid'

export const DigitDisplay = ({ digit }: { digit: number }) => {
  return (
    <div className={styles.TimeDisplay} style={{ marginTop: 20 }}>
      {digit}
      {Array.from({ length: 5 }, (_, i) => i).flatMap((x: number) => (
        <div>
          {Array.from({ length: 6 }, (_, i) => i).map((y: number) => {
            const { x: xClock, y: yClock } = digitSegments[digit].find(it => it.x === x && it.y === y) ?? {
              x,
              y,
              minuteHandAngle: 270,
              hourHandAngle: 90
            }

            return (
              <Clock
                digit={digit}
                position={{ x, y }}
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