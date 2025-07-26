import { createContext } from 'react'
import type { Theme, ThemeContextBag } from './types.ts'
import { getThemeColours } from './getThemeColours.ts'

export const ThemeContext = createContext<ThemeContextBag>({
  theme: 'light',
  themeColours: getThemeColours('light'),
  setTheme: (theme: Theme) => {
    console.debug(`Tried to call setTheme(${theme}) before the ThemeContext was initialised.`)
  }
})