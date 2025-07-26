import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import styles from './Clock.module.scss'
import type { ClockProps } from './types'
import { HandDirection } from '../TimeDisplay'
import classNames from 'classnames'
import { type ClockThemeColours, useThemeContext } from 'context/ThemeContext'

export const Clock = ({
  id,
  size,
  pulse,
  digit,
  className,
  hourDirection,
  minuteDirection,
  animationDuration,
  styles: styleOverrides,
  animation = 'ease-to-time'
}: ClockProps) => {
  const [animate, setAnimate] = useState(false)
  const [randomHourAngle, setRandomHourAngle] = useState(90)
  const [randomMinuteAngle, setRandomMinuteAngle] = useState(0)

  const { themeColours: currentThemeColours } = useThemeContext()

  const themeColours = useMemo<ClockThemeColours>(() => ({
    ...(digit !== undefined ? currentThemeColours.digitClock : currentThemeColours.borderClocks),
    ...styleOverrides
  }), [currentThemeColours.borderClocks, currentThemeColours.digitClock, digit, styleOverrides])

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimate(true)
    })
  }, [])

  useEffect(() => {
    if (animation !== 'random') {
      return
    }

    let hourAngle = Math.random() * 360
    let minuteAngle = Math.random() * 360
    let hourSpeed = (Math.random() * 0.5 + 0.1) * (Math.random() < 0.5 ? -1 : 1)
    let minuteSpeed = (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1)

    const interval = setInterval(() => {
      hourAngle = (hourAngle + hourSpeed + 360) % 360
      minuteAngle = (minuteAngle + minuteSpeed + 360) % 360

      if (Math.random() < 0.05) {
        hourSpeed = (Math.random() * 0.5 + 0.1) * (Math.random() < 0.5 ? -1 : 1)
        minuteSpeed = (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1)
      }

      setRandomHourAngle(hourAngle)
      setRandomMinuteAngle(minuteAngle)
    }, 500)

    return () => clearInterval(interval)
  }, [animation])

  const directionToAngle = (direction: HandDirection) => {
    switch (direction) {
      case HandDirection.UP: return 0
      case HandDirection.RIGHT: return 90
      case HandDirection.DOWN: return 180
      case HandDirection.LEFT: return 270
    }
  }

  const hourAngle = directionToAngle(hourDirection)
  const minuteAngle = directionToAngle(minuteDirection)

  const style = useMemo<CSSProperties>(() => {
    return {
      borderColor: themeColours.borderColour,
      backgroundColor: themeColours.backgroundColour,
      '--clock-diameter': `${size ?? 40}px`,
      '--animation-duration': `${animationDuration ?? 1000}ms`,
      '--shadow-colour-outer': themeColours.outerShadowColour,
      '--shadow-colour-inner': themeColours.innerShadowColour,
      '--colon-pulse-start-colour': themeColours.handPulseStartColour,
      '--colon-pulse-end-colour': themeColours.handPulseEndColour
    } as CSSProperties
  }, [animationDuration, size, themeColours])

  return (
    <div
      style={style}
      className={styles.Clock}
      data-testid={`clock-${id}-number-${digit ?? 'none'}`}
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
          transform: `rotate(${animation === 'random' ? randomHourAngle : animate ? hourAngle : 0}deg)`,
          transition: animation === 'ease-to-time' ? 'transform var(--animation-duration) ease' : 'none'
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
          transform: `rotate(${animation === 'random' ? randomMinuteAngle : animate ? minuteAngle : 0}deg)`,
          transition: animation === 'ease-to-time' ? 'transform var(--animation-duration) ease' : 'none'
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