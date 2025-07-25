import { HandDirection } from '../TimeDisplay'

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
}