import { HandDirection } from '../TimeDisplay'

export interface ClockProps {
  id: string
  digit?: number
  hourDirection: HandDirection
  minuteDirection: HandDirection
}