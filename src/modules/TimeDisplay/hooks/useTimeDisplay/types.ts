import type { RefObject } from 'react'
import type { ClockRefHandler } from 'modules/TimeDisplay/components/Clock'

export type TimeDisplayClockRefs = Map<string, RefObject<ClockRefHandler | null>>

export interface UseTimeDisplayProps {
  currentTime: Date
}