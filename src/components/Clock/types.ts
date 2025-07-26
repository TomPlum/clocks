import { HandDirection } from '../TimeDisplay'
import type { ThemeColours } from 'context/ThemeContext'

/**
 * Props for a single clock cell in the digit display.
 */
export interface ClockProps {
  /**
   * Unique identifier for the clock instance.
   */
  id: string

  /**
   * The digit (0–9) that this clock contributes to rendering.
   * Optional — may be undefined if the clock is not part of
   * an active digit.
   */
  digit?: number

  /**
   * Direction of the hour hand.
   */
  hourDirection: HandDirection

  /**
   * Direction of the minute hand.
   */
  minuteDirection: HandDirection

  /**
   * Whether this clock should pulse.
   * (used for animation or highlighting).
   */
  pulse?: boolean

  /**
   * The diameter, in pixels, of the clock.
   */
  size?: number

  /**
   * A CSS class to be passed to the wrapping
   * element of the clock instance.
   */
  className?: string

  /**
   * Overrides the default styles of the
   * current theme.
   */
  styles?: Pick<
    ThemeColours,
    'clockBackgroundColour' |
    'clockBorderColour' |
    'clockShadowInnerColour' |
    'clockShadowOuterColour' |
    'minuteHandColour' |
    'hourHandColour' |
    'centreDotColour'
  >
}