import { type CSSProperties, forwardRef, useImperativeHandle, useMemo } from 'react'
import styles from './Clock.module.scss'
import type { ClockProps, ClockRefHandler } from './types'
import classNames from 'classnames'
import { type ClockThemeColours, useThemeContext } from 'context/ThemeContext'
import { useClockAnimation } from 'modules/TimeDisplay/hooks/useClockAnimation'
import { useAnimationContext } from 'context/AnimationContext'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useClockDiameter } from 'modules/TimeDisplay/hooks/useClockDiameter'

export const Clock = forwardRef<ClockRefHandler, ClockProps>(({
  id,
  size,
  position,
  colon = false,
  digit,
  className,
  styles: styleOverrides
}: ClockProps, ref) => {
  const clockDiameter = useClockDiameter()
  const { initialAnimating } = useAnimationContext()
  const { enableColonAnimation } = useConfigContext()
  const { themeColours: currentThemeColours } = useThemeContext()

  const {
    easeToTime,
    runAnimation,
    hourHandAngle,
    minuteHandleAngle,
    easeToCurrentPattern
  } = useClockAnimation({
    id,
    position
  })

  const themeColours = useMemo<ClockThemeColours>(() => ({
    ...(digit !== undefined ? currentThemeColours.digitClock : currentThemeColours.borderClocks),
    ...styleOverrides
  }), [currentThemeColours.borderClocks, currentThemeColours.digitClock, digit, styleOverrides])

  useImperativeHandle(ref, () => ({
    runAnimation,
    easeToTime,
    easeToCurrentPattern
  }))

  const clockStyle = useMemo<CSSProperties>(() => {
    return {
      borderColor: themeColours.borderColour,
      backgroundColor: themeColours.backgroundColour,
      '--clock-diameter': `${size ?? clockDiameter}px`,
      '--hand-width': `${Math.round(clockDiameter * 0.045)}px`,
      '--shadow-colour-outer': themeColours.outerShadowColour,
      '--shadow-colour-inner': themeColours.innerShadowColour,
      '--colon-pulse-start-colour': themeColours.handPulseStartColour,
      '--colon-pulse-end-colour': themeColours.handPulseEndColour
    } as CSSProperties
  }, [clockDiameter, size, themeColours.backgroundColour, themeColours.borderColour, themeColours.handPulseEndColour, themeColours.handPulseStartColour, themeColours.innerShadowColour, themeColours.outerShadowColour])

  const enablePulseAnimation = enableColonAnimation && colon && !initialAnimating

  return (
    <div
      style={clockStyle}
      className={classNames(styles.Clock, className)}
      data-testid={`clock-${id}-number-${digit ?? 'none'}`}
    >
      <div
        data-testid={`clock-${id}-hour-hand`}
        className={classNames(
          styles.Clock__HourHand,
          { [styles.Clock__Pulse]: enablePulseAnimation }
        )}
        style={{
          transform: `rotate(${hourHandAngle}deg)`,
          backgroundColor: themeColours.hourHandColour
        }}
      />

      <div
        data-testid={`clock-${id}-minute-hand`}
        className={classNames(
          styles.Clock__MinuteHand,
          { [styles.Clock__Pulse]: enablePulseAnimation }
        )}
        style={{
          transform: `rotate(${minuteHandleAngle}deg)`,
          backgroundColor: themeColours.minuteHandColour
        }}
      />

      <div
        className={classNames(
          styles.Clock__CenterDot,
          { [styles.Clock__Pulse]: enablePulseAnimation }
        )}
        style={{
          backgroundColor: themeColours.centreDotColour
        }}
      />
    </div>
  )
})