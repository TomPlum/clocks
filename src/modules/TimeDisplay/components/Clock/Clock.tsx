import { type CSSProperties, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import styles from './Clock.module.scss'
import type { ClockProps, ClockRefHandler } from './types'
import classNames from 'classnames'
import { type ClockThemeColours, useThemeContext } from 'context/ThemeContext'

export const Clock = forwardRef<ClockRefHandler, ClockProps>(({
  id,
  size,
  pulse,
  digit,
  className,
  hourHandAngle,
  animationSpeed,
  minuteHandAngle,
  animationDuration,
  styles: styleOverrides,
  animation = 'ease-to-time'
}: ClockProps, ref) => {
  const [animate, setAnimate] = useState(false)

  const [randomHourAngle, setRandomHourAngle] = useState(Math.random() * 360)
  const [randomMinuteAngle, setRandomMinuteAngle] = useState(Math.random() * 360)

  const { themeColours: currentThemeColours } = useThemeContext()

  const themeColours = useMemo<ClockThemeColours>(() => ({
    ...(digit !== undefined ? currentThemeColours.digitClock : currentThemeColours.borderClocks),
    ...styleOverrides
  }), [currentThemeColours.borderClocks, currentThemeColours.digitClock, digit, styleOverrides])

  const randomiseHandPositions = () => {
    setRandomHourAngle(Math.random() *  360)
    setRandomMinuteAngle(Math.random() *  360)
  }

  useImperativeHandle(ref, () => ({
    randomiseHandPositions
  }))

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimate(true)
    })
  }, [])

  useEffect(() => {
    if (animation !== 'random') return

    const tickDuration = 50

    const hourMaxSpeed =
      animationSpeed
        ? 360 / (animationSpeed / tickDuration)
        : 1.2
    const hourMinSpeed = 0.4

    const minuteMaxSpeed =
      animationSpeed
        ? 2 * (360 / (animationSpeed / tickDuration))
        : 2.4
    const minuteMinSpeed = 0.8

    let hourAngle = Math.random() * 360
    let minuteAngle = Math.random() * 360

    let hourSpeed = randomSpeed(hourMinSpeed, hourMaxSpeed)
    let minuteSpeed = randomSpeed(minuteMinSpeed, minuteMaxSpeed)

    let targetHourSpeed = hourSpeed
    let targetMinuteSpeed = minuteSpeed

    const smoothingFactor = 0.05

    function randomSpeed(min: number, max: number) {
      const speed = Math.random() * (max - min) + min
      return Math.random() < 0.5 ? -speed : speed
    }

    const interval = setInterval(() => {
      if (Math.random() < 0.01) {
        targetHourSpeed = randomSpeed(hourMinSpeed, hourMaxSpeed)
      }

      if (Math.random() < 0.01) {
        targetMinuteSpeed = randomSpeed(minuteMinSpeed, minuteMaxSpeed)
      }

      hourSpeed += (targetHourSpeed - hourSpeed) * smoothingFactor
      minuteSpeed += (targetMinuteSpeed - minuteSpeed) * smoothingFactor

      hourAngle = (hourAngle + hourSpeed + 360) % 360
      minuteAngle = (minuteAngle + minuteSpeed + 360) % 360

      setRandomHourAngle(hourAngle)
      setRandomMinuteAngle(minuteAngle)
    }, tickDuration)

    return () => clearInterval(interval)
  }, [animation, animationSpeed])

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
    const handDirectionAngle = animate ? hourHandAngle : 0
    const rotationAngle = animation === 'random' ? randomHourAngle : handDirectionAngle

    return {
      backgroundColor: themeColours.hourHandColour,
      transform: `rotate(${rotationAngle}deg)`,
      transition: animation === 'ease-to-time' ? `transform ${animationDuration}ms ease` : 'none'
    }
  }, [animate, animation, animationDuration, hourHandAngle, randomHourAngle, themeColours.hourHandColour])

  const minuteHandStyle = useMemo<CSSProperties>(() => {
    const handDirectionAngle = animate ? minuteHandAngle : 0
    const rotationAngle = animation === 'random' ? randomMinuteAngle : handDirectionAngle

    return {
      backgroundColor: themeColours.minuteHandColour,
      transform: `rotate(${rotationAngle}deg)`,
      transition: animation === 'ease-to-time' ? `transform ${animationDuration}ms ease` : 'none'
    }
  }, [animate, animation, animationDuration, minuteHandAngle, randomMinuteAngle, themeColours.minuteHandColour])

  return (
    <div
      style={clockStyle}
      className={classNames(styles.Clock, className)}
      data-testid={`clock-${id}-number-${digit ?? 'none'}`}
    >
      <div
        style={hourHandStyle}
        data-testid={`clock-${id}-hour-hand`}
        className={classNames(
          styles.Clock__HourHand,
          { [styles.Clock__Pulse]: pulse }
        )}
      />

      <div
        style={minuteHandStyle}
        data-testid={`clock-${id}-minute-hand`}
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
})