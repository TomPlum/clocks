import type { ReactNode } from 'react'
import type { Theme } from 'context/ThemeContext'

export interface CustomSelectProps<T> {
  label: string
  value: T
  className?: string
  theme: Theme
  width: number
  onChange: (value: T) => void
  options: { label: ReactNode; value: T }[]
}