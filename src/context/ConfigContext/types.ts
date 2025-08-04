import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'
import type { TimeDisplayPattern } from 'modules/TimeDisplay'

export interface ConfigContextBag {
  isHydrated: boolean
  manualTime?: Date
  setManualTime: (time?: Date) => void
  loadingAnimation: ClockLoadingAnimation
  setLoadingAnimation: (animation: ClockLoadingAnimation) => void
  reloadTime?: () => void
  enableColonAnimation: boolean
  setEnableColonAnimation: (value: boolean) => void
  clearStoredConfig: () => void
  resetToDefaults: () => void
  animationStagger: number
  setAnimationStagger: (value: number) => void
  digitAnimationDuration: number
  setDigitAnimationDuration: (value: number) => void
  clockDiameter?: number
  setClockDiameter: (value?: number) => void
  timeDisplayPattern: TimeDisplayPattern
  setTimeDisplayPattern: (value: TimeDisplayPattern) => void
  showDebugTools: boolean
  setShowDebugTools: (showDebugTools: boolean) => void
}

export interface SerialisedConfig {
  manualTime?: string
  animationStagger: number
  loadingAnimation: ClockLoadingAnimation
  enableColonAnimation: boolean
  digitAnimationDuration: number
  clockDiameter?: number
  showDebugTools: boolean
  timeDisplayPattern: TimeDisplayPattern
  language: string
}

export interface ConfigContextProviderProps {
  onReplayLoadingAnimation?: () => void
  onSetManualTime: (time?: Date) => void
  onChangeDisplayPattern: (pattern: TimeDisplayPattern) => void
}