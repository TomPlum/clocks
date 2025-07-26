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

  const [randomHourAngle, setRandomHourAngle] = useState(Math.random() * 360)
  const [randomMinuteAngle, setRandomMinuteAngle] = useState(Math.random() * 360)

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
    }, 100)

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

  const clockStyle = useMemo<CSSProperties>(() => {
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

  const hourHandStyle = useMemo<CSSProperties>(() => {
    const handDirectionAngle = animate ? hourAngle : 0
    const rotationAngle = animation === 'random' ? randomHourAngle : handDirectionAngle

    return {
      backgroundColor: themeColours.hourHandColour,
      transform: `rotate(${rotationAngle}deg)`,
      transition: animation === 'ease-to-time' ? `transform ${animationDuration}ms ease` : 'none'
    }
  }, [animate, animation, animationDuration, hourAngle, randomHourAngle, themeColours.hourHandColour])

  const minuteHandStyle = useMemo<CSSProperties>(() => {
    const handDirectionAngle = animate ? minuteAngle : 0
    const rotationAngle = animation === 'random' ? randomMinuteAngle : handDirectionAngle

    return {
      backgroundColor: themeColours.minuteHandColour,
      transform: `rotate(${rotationAngle}deg)`,
      transition: animation === 'ease-to-time' ? `transform ${animationDuration}ms ease` : 'none'
    }
  }, [animate, animation, animationDuration, minuteAngle, randomMinuteAngle, themeColours.minuteHandColour])

  return (
    <div
      style={clockStyle}
      className={classNames(styles.Clock, className)}
      data-testid={`clock-${id}-number-${digit ?? 'none'}`}
    >
      <div
        style={hourHandStyle}
        data-testid={`hour-hand-${hourDirection}`}
        className={classNames(
          styles.Clock__HourHand,
          { [styles.Clock__Pulse]: pulse }
        )}
      />

      <div
        style={minuteHandStyle}
        data-testid={`minute-hand-${minuteDirection}`}
        className={classNames(
          styles.Clock__MinuteHand,
          { [styles.Clock__Pulse]: pulse }
        )}
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