export interface ConfigContextBag {
  manualTime?: Date
  setManualTime: (time?: Date) => void
  reloadTime?: () => void
  enableColonAnimation: boolean
  setEnableColonAnimation: (value: boolean) => void
}

export interface SerialisedConfig {
  manualTime?: string
  enableColonAnimation: boolean
}

export interface ConfigContextProviderProps {
  onResetTime?: () => void
}