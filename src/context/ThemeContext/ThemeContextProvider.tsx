import { ThemeContext } from './ThemeContext.tsx'
import { type PropsWithChildren, useMemo, useState } from 'react'
import type { Theme, ThemeContextBag } from './types.ts'
import { getThemeColours } from './getThemeColours.ts'

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