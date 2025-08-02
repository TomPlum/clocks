import { createContext } from 'react'
import type { ConfigContextBag } from './types'
import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'

export const ConfigContext = createContext<ConfigContextBag>({
  isHydrated: false,
  enableColonAnimation: true,
  setEnableColonAnimation: (value: boolean) => {
    console.error(`Tried to call setEnableColonAnimation(${value}) before the ConfigContext was initialised.`)
  },
  setManualTime: (time?: Date) => {
    console.error(`Tried to call setManualTime(${time}) before the ConfigContext was initialised.`)
  },
  reloadTime: () => {
    console.error('Tried to call reloadTime() before the ConfigContext was initialised.')
  },
  clearStoredConfig: () => {
    console.error('Tried to call clearStoredConfig() before the ConfigContext was initialised.')
  },
  loadingAnimation: 'random',
  setLoadingAnimation: (animation: ClockLoadingAnimation) => {
    console.error(`Tried to call setLoadingAnimation(${animation}) before the ConfigContext was initialised.`)
  },
  resetToDefaults: () => {
    console.error('Tried to call resetToDefaults() before the ConfigContext was initialised.')
  },
  animationStagger: 10,
  setAnimationStagger: (animationStagger: number) => {
    console.error(`Tried to call setAnimationStagger(${animationStagger}) before the ConfigContext was initialised.`)
  },
  digitAnimationDuration: 3000,
  setDigitAnimationDuration: (duration: number) => {
    console.error(`Tried to call setDigitAnimationDuration(${duration}) before the ConfigContext was initialised.`)
  },
  setClockDiameter: (value?: number) => {
    console.error(`Tried to call setClockDiameter(${value}) before the ConfigContext was initialised.`)
  }
})