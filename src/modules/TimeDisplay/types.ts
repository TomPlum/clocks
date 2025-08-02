export interface DigitClockCoordinate {
  x: number
  y: number
  minuteHandAngle: number
  hourHandAngle: number
}

export interface TimeDisplayRefHandle {
  reset: () => void
  setManualTime: (time?: Date) => void
}

export type TimeDisplayPattern = 'circular' | 'point-towards-middle'

export interface HandDirections {
  hour: number
  minute: number
}

export interface ClockMetadata {
  digit?: number
  isColon: boolean
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