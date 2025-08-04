import type { ClockAnimation, ClockPositon } from 'modules/TimeDisplay/components/Clock'

export interface UseClockAnimationProps {
  id: string
  position: ClockPositon
}

export interface RequestAnimationFrameConfig {
  name: ClockAnimation,
  duration: number
  useEasing?: boolean
  shouldNotify?: boolean
  onFrame: (value: number) => void
  onComplete?: (clockId: string) => void
}