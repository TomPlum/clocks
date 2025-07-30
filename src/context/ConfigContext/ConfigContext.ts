import { createContext } from 'react'
import type { ConfigContextBag } from './types'
import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'

export const ConfigContext = createContext<ConfigContextBag>({
  isHydrated: false,
  enableColonAnimation: true,
  setEnableColonAnimation: (value: boolean) => {
    console.log(`Tried to call setEnableColonAnimation(${value}) before the ConfigContext was initialised.`)
  },
  setManualTime: (time?: Date) => {
    console.log(`Tried to call setManualTime(${time}) before the ConfigContext was initialised.`)
  },
  reloadTime: () => {
    console.log('Tried to call reloadTime() before the ConfigContext was initialised.')
  },
  clearStoredConfig: () => {
    console.log('Tried to call clearStoredConfig() before the ConfigContext was initialised.')
  },
  loadingAnimation: 'random',
  setLoadingAnimation: (animation: ClockLoadingAnimation) => {
    console.log(`Tried to call setLoadingAnimation(${animation}) before the ConfigContext was initialised.`)
  },
  resetToDefaults: () => {
    console.log('Tried to call resetToDefaults() before the ConfigContext was initialised.')
  }
})