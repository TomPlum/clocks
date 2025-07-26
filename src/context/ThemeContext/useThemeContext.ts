import { useContext } from 'react'
import { ThemeContext } from './ThemeContext.tsx'

export const useThemeContext = () => useContext(ThemeContext)