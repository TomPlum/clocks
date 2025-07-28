import { ConfigContext } from './ConfigContext'
import { type PropsWithChildren, useMemo } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import type { SerialisedConfig, ConfigContextBag, ConfigContextProviderProps } from './types'

export const ConfigContextProvider = ({ onResetTime, children }: PropsWithChildren<ConfigContextProviderProps>) => {
  const [storedValue, setStoredValue, clearStoredValue] = useLocalStorage<SerialisedConfig>({
    key: 'tomplum.github.io/clocks-config',
    defaultValue: {
      enableColonAnimation: true
    }
  })

  const value = useMemo<ConfigContextBag>(() => ({
    manualTime: storedValue.manualTime ? new Date(storedValue.manualTime) : undefined,
    setManualTime: (time?: Date) => {
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
    clearStoredConfig: clearStoredValue
  }), [clearStoredValue, onResetTime, setStoredValue, storedValue])

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}