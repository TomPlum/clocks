import { ConfigContext } from './ConfigContext'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import type { SerialisedConfig, ConfigContextBag, ConfigContextProviderProps } from './types'
import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'
import { useThemeContext } from 'context/ThemeContext'

const defaultConfigValues: SerialisedConfig = {
  enableColonAnimation: true,
  loadingAnimation: 'random'
}

export const ConfigContextProvider = ({ onResetTime, onSetManualTime, children }: PropsWithChildren<ConfigContextProviderProps>) => {
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
    reloadTime: onResetTime,
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
    }
  }), [clearStoredValue, isHydrated, onResetTime, onSetManualTime, setStoredValue, setTheme, storedValue])

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}