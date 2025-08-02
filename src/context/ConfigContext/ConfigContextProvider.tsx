import { ConfigContext } from './ConfigContext'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import type { SerialisedConfig, ConfigContextBag, ConfigContextProviderProps } from './types'
import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'
import { useThemeContext } from 'context/ThemeContext'
import type { TimeDisplayPattern } from 'modules/TimeDisplay'

const defaultConfigValues: SerialisedConfig = {
  enableColonAnimation: true,
  loadingAnimation: 'random',
  animationStagger: 10,
  digitAnimationDuration: 3000,
  timeDisplayPattern: 'circular',
  showDebugTools: false
}

export const ConfigContextProvider = ({ onReplayLoadingAnimation, onSetManualTime, children }: PropsWithChildren<ConfigContextProviderProps>) => {
  const [storedValue, setStoredValue, clearStoredValue] = useLocalStorage<SerialisedConfig>({
    key: 'tomplum.github.io/clocks-config',
    defaultValue: defaultConfigValues
  })

  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const { setTheme } = useThemeContext()

  const value = useMemo<ConfigContextBag>(() => ({
    isHydrated,
    manualTime: storedValue.manualTime ? new Date(storedValue.manualTime) : undefined,
    setManualTime: (time?: Date) => {
      onSetManualTime(time)

      setStoredValue({
        ...storedValue,
        manualTime: time?.toString()
      })
    },
    enableColonAnimation: storedValue.enableColonAnimation,
    setEnableColonAnimation: (value: boolean) => {
      setStoredValue({
        ...storedValue,
        enableColonAnimation: value
      })
    },
    reloadTime: onReplayLoadingAnimation,
    clearStoredConfig: clearStoredValue,
    loadingAnimation: storedValue.loadingAnimation,
    setLoadingAnimation: (animation: ClockLoadingAnimation) => {
      setStoredValue({
        ...storedValue,
        loadingAnimation: animation
      })
    },
    resetToDefaults: () => {
      setTheme('dark')
      setStoredValue(defaultConfigValues)
    },
    animationStagger: storedValue.animationStagger,
    setAnimationStagger: (value: number) => {
      setStoredValue({
        ...storedValue,
        animationStagger: value
      })
    },
    digitAnimationDuration: storedValue.digitAnimationDuration,
    setDigitAnimationDuration: (value: number) => {
      setStoredValue({
        ...storedValue,
        digitAnimationDuration: value
      })
    },
    clockDiameter: storedValue.clockDiameter,
    setClockDiameter: (value?: number) => {
      setStoredValue({
        ...storedValue,
        clockDiameter: value
      })
    },
    timeDisplayPattern: storedValue.timeDisplayPattern,
    setTimeDisplayPattern: (value: TimeDisplayPattern) => {
      setStoredValue({
        ...storedValue,
        timeDisplayPattern: value
      })
    },
    showDebugTools: storedValue.showDebugTools,
    setShowDebugTools: (showDebugTools: boolean) => {
      setStoredValue({
        ...storedValue,
        showDebugTools
      })
    }
  }), [clearStoredValue, isHydrated, onReplayLoadingAnimation, onSetManualTime, setStoredValue, setTheme, storedValue])

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}