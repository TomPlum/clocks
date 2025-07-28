import type { ClockThemeColours } from 'context/ThemeContext'

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
   * Angle of the hour hand.
   */
  hourHandAngle: number

  /**
   * Angle of the minute hand.
   */
  minuteHandAngle: number

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
  styles?: ClockThemeColours

  /**
   * Sets which animation the clock
   * should use.
   */
  animation?: ClockAnimation

  /**
   * Sets the time, in milliseconds, that
   * the clocks' animations should use.
   *
   * Usually, this is how long it should
   * take a hand to move from its source
   * to its target angle.
   */
  animationDuration?: number

  /**
   * Sets the speed, in milliseconds, that
   * the clocks' animations should use.
   *
   * Animations like "random" don't have set
   * hand angles, and so the animationSpeed can
   * be used to set how quickly the animation
   * progresses.
   */
  animationSpeed?: number
}

export type ClockAnimation = 'ease-to-time' | 'random'

export interface ClockRefHandler {
  randomiseHandPositions: () => void
}