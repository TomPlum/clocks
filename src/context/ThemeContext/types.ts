export interface ThemeContextBag {
  theme: Theme
  themeColours: ThemeColours
  setTheme: (theme: Theme) => void
}

export type Theme = 'light' | 'dark'

export interface ThemeColours {
  background: string
  clockBackground: string
  clockBorder: string
  centerDot: string
  minuteHandColour: string
  hourHandColour: string
  clockShadowOuterColour: string
  clockShadowInnerColour: string
  colonPulseStartColour: string
  colonPulseEndColour: string
}