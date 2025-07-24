import styles from './Clock.module.scss'
import type { ClockProps } from './types.ts'
import { HandDirection } from '../TimeDisplay'

export const Clock = ({ id, digit, hourDirection, minuteDirection }: ClockProps) => {
  const directionToAngle = (direction: HandDirection) => {
    switch (direction) {
      case HandDirection.UP: {
        return 0
      }
      case HandDirection.RIGHT: {
        return 90
      }
      case HandDirection.DOWN: {
        return 180
      }
      case HandDirection.LEFT: {
        return 270
      }
    }
  }

  return (
    <div
      className={styles.Clock}
      data-testid={`clock-${id}-number-${digit ?? 'none'}`}
    >
      <div
        className={styles.Clock__HourHand}
        data-testid={`hour-hand-${hourDirection}`}
        style={{ transform: `rotate(${directionToAngle(hourDirection)}deg)` }}
      />

      <div
        className={styles.Clock__MinuteHand}
        data-testid={`minute-hand-${minuteDirection}`}
        style={{ transform: `rotate(${directionToAngle(minuteDirection)}deg)` }}
      />

      <div className={styles.Clock__CenterDot} />
    </div>
  )
}