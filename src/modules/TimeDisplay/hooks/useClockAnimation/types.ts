//TODO Move clock animation type here

import type { ClockAnimation, ClockPositon } from 'modules/TimeDisplay/components/Clock'

export interface UseClockAnimationProps {
  position: ClockPositon
}

export interface RequestAnimationFrameConfig {
  name: ClockAnimation,
  duration: number
  useEasing?: boolean
  shouldNotify?: boolean
  onFrame: (value: number) => void
  onComplete?: () => void
}