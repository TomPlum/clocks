import { createContext } from 'react'
import type { Theme, ThemeContextBag } from './types'
import { getThemeColours } from './getThemeColours'

export const ThemeContext = createContext<ThemeContextBag>({
  theme: 'dark',
  themeColours: getThemeColours('dark'),
  setTheme: (theme: Theme) => {
    console.debug(`Tried to call setTheme(${theme}) before the ThemeContext was initialised.`)
  },
  viewportSize: {
    width: 1920,
    height: 1080
  },
  isMobile: false
})