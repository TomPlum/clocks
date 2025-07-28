export interface ConfigContextBag {
  manualTime?: Date
  setManualTime: (time?: Date) => void
  reloadTime?: () => void
}

export interface Config {
  manualTime?: string
}

export interface ConfigContextProviderProps {
  onResetTime?: () => void
}