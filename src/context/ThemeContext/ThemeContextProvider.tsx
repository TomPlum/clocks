import { ThemeContext } from './ThemeContext'
import { type PropsWithChildren, useMemo } from 'react'
import type { Theme, ThemeContextBag } from './types'
import { getThemeColours } from './getThemeColours'
import { useLocalStorage , useViewportSize } from '@mantine/hooks'
import { mobileViewCollapseWidth } from 'modules/TimeDisplay/grid'

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useLocalStorage<Theme>({
    key: 'tomplum.github.io/clocks-theme',
    defaultValue: 'dark'
  })

  const { height, width } = useViewportSize()

  const value = useMemo<ThemeContextBag>(() => ({
    theme,
    setTheme,
    viewportSize: { height, width },
    themeColours: getThemeColours(theme),
    isMobile: width < mobileViewCollapseWidth
  }), [height, setTheme, theme, width])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}