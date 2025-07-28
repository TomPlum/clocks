import { createContext } from 'react'
import type { ConfigContextBag } from './types'

export const ConfigContext = createContext<ConfigContextBag>({
  enableColonAnimation: true,
  setEnableColonAnimation: (value: boolean) => {
    console.log(`Tried to call setEnableColonAnimation(${value}) before the ConfigContext was initialised.`)
  },
  setManualTime: (time?: Date) => {
    console.log(`Tried to call setManualTime(${time}) before the ConfigContext was initialised.`)
  },
  reloadTime: () => {
    console.log('Tried to call reloadTime() before the ConfigContext was initialised.')
  }
})