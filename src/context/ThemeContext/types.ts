export interface ThemeContextBag {
  theme: Theme
  themeColours: ThemeColours
  setTheme: (theme: Theme) => void
}

export type Theme = 'light' | 'dark' | 'matrix'

export interface ClockThemeColours {
  backgroundColour: string
  borderColour: string
  centreDotColour: string
  minuteHandColour: string
  hourHandColour: string
  outerShadowColour: string
  innerShadowColour: string
  handPulseStartColour: string
  handPulseEndColour: string
}

export interface ThemeColours {
  backgroundColour: string
  digitClock: ClockThemeColours
  borderClocks: ClockThemeColours
  colonClocks: ClockThemeColours
}