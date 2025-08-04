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

export type TimeDisplayPattern = 'circular' | 'point-towards-middle'

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
  time: Date
  x: number
  y: number
  pattern: TimeDisplayPattern
}

export interface GetClockMetadataProps {
  time: Date
  x: number
  y: number
}