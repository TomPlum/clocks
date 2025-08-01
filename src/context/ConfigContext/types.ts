import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'

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
}

export interface SerialisedConfig {
  manualTime?: string
  animationStagger: number
  loadingAnimation: ClockLoadingAnimation
  enableColonAnimation: boolean
}

export interface ConfigContextProviderProps {
  onResetTime?: () => void
  onSetManualTime: (time?: Date) => void
}