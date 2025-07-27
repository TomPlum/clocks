import { ThemeContext } from './ThemeContext'
import { type PropsWithChildren, useMemo, useState } from 'react'
import type { Theme, ThemeContextBag } from './types'
import { getThemeColours } from './getThemeColours'

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('light')

  const value = useMemo<ThemeContextBag>(() => ({
    theme,
    setTheme,
    themeColours: getThemeColours(theme)
  }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}