export interface ConfigContextBag {
  manualTime?: Date
  setManualTime: (time: Date) => void
}

export interface Config {
  manualTime?: Date
}