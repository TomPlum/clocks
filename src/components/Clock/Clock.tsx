import { type CSSProperties, useEffect, useState } from 'react'
import styles from './Clock.module.scss'
import type { ClockProps } from './types'
import { HandDirection } from '../TimeDisplay'
import classNames from 'classnames'
import { useThemeContext } from 'context/ThemeContext'

export const Clock = ({
  id,
  size,
  pulse,
  digit,
  className,
  hourDirection,
  minuteDirection,
  styles: styleOverrides,
}: ClockProps) => {
  const [animate, setAnimate] = useState(false)

  const { themeColours: currentThemeColours } = useThemeContext()

  const themeColours = {
    ...currentThemeColours,
    ...styleOverrides
  }

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
      style={{
        borderColor: themeColours.clockBorderColour,
        backgroundColor: themeColours.clockBackgroundColour,
        '--clock-diameter': `${size ?? 40}px`,
        '--shadow-colour-outer': themeColours.clockShadowOuterColour,
        '--shadow-colour-inner': themeColours.clockShadowInnerColour,
        '--colon-pulse-start-colour': themeColours.colonPulseStartColour,
        '--colon-pulse-end-colour': themeColours.colonPulseEndColour
      } as CSSProperties}
    >
      <div
        className={classNames(
          styles.Clock__HourHand,
          { [styles.Clock__Pulse]: pulse },
          className
        )}
        data-testid={`hour-hand-${hourDirection}`}
        style={{
          backgroundColor: themeColours.hourHandColour,
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
          backgroundColor: themeColours.minuteHandColour,
          transform: animate ? `rotate(${minuteAngle}deg)` : 'rotate(0deg)',
        }}
      />

      <div
        className={classNames(
          styles.Clock__CenterDot,
          { [styles.Clock__Pulse]: pulse }
        )}
        style={{
          backgroundColor: themeColours.centreDotColour
        }}
      />
    </div>
  )
}