import { ThemeContext } from './ThemeContext.ts'
import { type PropsWithChildren, useMemo } from 'react'
import type { Theme, ThemeContextBag } from './types'
import { getThemeColours } from './getThemeColours'
import { useLocalStorage } from '@mantine/hooks'

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useLocalStorage<Theme>({
    key: 'tomplum.github.io/clocks-theme',
    defaultValue: 'light'
  })


  const value = useMemo<ThemeContextBag>(() => ({
    theme,
    setTheme,
    themeColours: getThemeColours(theme)
  }), [setTheme, theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}