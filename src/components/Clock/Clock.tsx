import { useEffect, useState } from 'react'
import styles from './Clock.module.scss'
import type { ClockProps } from './types.ts'
import { HandDirection } from '../TimeDisplay'
import classNames from 'classnames'

export const Clock = ({
  id,
  pulse,
  digit,
  hourDirection,
  minuteDirection,
}: ClockProps) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimate(true)
    })
  }, [])

  const directionToAngle = (direction: HandDirection) => {
    switch (direction) {
      case HandDirection.UP:
        return 0
      case HandDirection.RIGHT:
        return 90
      case HandDirection.DOWN:
        return 180
      case HandDirection.LEFT:
        return 270
    }
  }

  const hourAngle = directionToAngle(hourDirection)
  const minuteAngle = directionToAngle(minuteDirection)

  return (
    <div
      className={styles.Clock}
      data-testid={`clock-${id}-number-${digit ?? 'none'}`}
    >
      <div
        className={classNames(
          styles.Clock__HourHand,
          { [styles.Clock__Pulse]: pulse }
        )}
        data-testid={`hour-hand-${hourDirection}`}
        style={{
          transform: animate ? `rotate(${hourAngle}deg)` : 'rotate(0deg)',
        }}
      />

      <div
        className={classNames(
          styles.Clock__MinuteHand,
          { [styles.Clock__Pulse]: pulse }
        )}
        data-testid={`minute-hand-${minuteDirection}`}
        style={{
          transform: animate ? `rotate(${minuteAngle}deg)` : 'rotate(0deg)',
        }}
      />

      <div className={styles.Clock__CenterDot} />
    </div>
  )
}