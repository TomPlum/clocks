export interface DigitClockCoordinate {
  x: number
  y: number
  minuteHandAngle: number
  hourHandAngle: number
}

export interface TimeDisplayRefHandle {
  replayLoadingAnimation: () => void
  setManualTime: (time?: Date) => void
  changePattern: (pattern: TimeDisplayPattern) => void
}

export interface TimeDisplayDimensions {
  width: number
  height: number
}

export type TimeDisplayPattern = 'circular' | 'point-towards-middle' | 'horizontal' | 'vertical' | 'away-from-x-axis' | 'diagonal'

export interface HandDirections {
  hour: number
  minute: number
}

export interface ClockMetadata {
  digit?: number
  isColon: boolean
  isColonCenterLine: boolean
}

export interface GetHandDirectionsProps {
  /**
   * The time that is being displayed
   * on the time display.
   */
  time: Date

  /**
   * The x-ordinate of the clock to
   * get the angles for.
   */
  x: number

  /**
   * The y-ordinate of the clock to
   * get the angles for.
   */
  y: number

  /**
   * The pattern that the non-digit clocks
   * are being rendered in on the display.
   */
  pattern: TimeDisplayPattern

  /**
   * If the time display is being
   * rendered in vertical mode with
   * the digits stacked vertically.
   */
  vertical?: boolean
}

export interface GetClockMetadataProps {
  /**
   * The time that is being displayed
   * on the time display.
   */
  time: Date

  /**
   * The x-ordinate of the clock to
   * get the angles for.
   */
  x: number

  /**
   * The y-ordinate of the clock to
   * get the angles for.
   */
  y: number

  /**
   * If the time display is being
   * rendered in vertical mode with
   * the digits stacked vertically.
   */
  vertical?: boolean
}