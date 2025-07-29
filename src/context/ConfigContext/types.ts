import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'

export interface ConfigContextBag {
  manualTime?: Date
  setManualTime: (time?: Date) => void
  loadingAnimation: ClockLoadingAnimation
  setLoadingAnimation: (animation: ClockLoadingAnimation) => void
  reloadTime?: () => void
  enableColonAnimation: boolean
  setEnableColonAnimation: (value: boolean) => void
  clearStoredConfig: () => void
  resetToDefaults: () => void
}

export interface SerialisedConfig {
  manualTime?: string
  loadingAnimation: ClockLoadingAnimation
  enableColonAnimation: boolean
}

export interface ConfigContextProviderProps {
  onResetTime?: () => void
}