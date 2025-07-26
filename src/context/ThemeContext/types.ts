export interface ThemeContextBag {
  theme: Theme
  themeColours: ThemeColours
  setTheme: (theme: Theme) => void
}

export type Theme = 'light' | 'dark' | 'matrix'

export interface ThemeColours {
  backgroundColour: string
  clockBackgroundColour: string
  clockBorderColour: string
  centreDotColour: string
  minuteHandColour: string
  hourHandColour: string
  clockShadowOuterColour: string
  clockShadowInnerColour: string
  colonPulseStartColour: string
  colonPulseEndColour: string
}