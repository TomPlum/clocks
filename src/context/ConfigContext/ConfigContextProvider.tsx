import { ConfigContext } from './ConfigContext'
import { type PropsWithChildren, useMemo } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import type { Config, ConfigContextBag } from './types'

export const ConfigContextProvider = ({ children }: PropsWithChildren) => {
  const [storedValue, setStoredValue] = useLocalStorage<Config>({
    key: 'tomplum.github.io/clocks-config',
    defaultValue: { }
  })

  const value = useMemo<ConfigContextBag>(() => ({
    manualTime: storedValue.manualTime ? new Date(storedValue.manualTime) : undefined,
    setManualTime: (time?: Date) => {
      setStoredValue({
        ...value,
        manualTime: time?.toString()
      })
    }
  }), [setStoredValue, storedValue.manualTime])

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}