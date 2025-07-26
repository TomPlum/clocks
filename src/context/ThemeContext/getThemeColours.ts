import type { Theme, ThemeColours } from './types'

export const getThemeColours = (theme: Theme): ThemeColours => {
  switch (theme) {
    case 'light': {
      return {
        backgroundColour: '#ffffff',
        centreDotColour: '#000000',
        clockBackgroundColour: '#ffffff',
        clockBorderColour: '#ffffff',
        clockShadowOuterColour: 'rgba(0, 0, 0, 0.3)',
        clockShadowInnerColour: 'rgba(0, 0, 0, 0.4)',
        hourHandColour: '#000000',
        minuteHandColour: '#000000',
        colonPulseStartColour: '#000000',
        colonPulseEndColour: '#7e7e7e'
      }
    }
    case 'dark': {
      return {
        backgroundColour: '#1a1a1a',
        centreDotColour: '#ffffff',
        clockBackgroundColour: '#1e1e1e',
        clockBorderColour: '#262626',
        clockShadowOuterColour: 'rgba(255,255,255,0.3)',
        clockShadowInnerColour: 'rgba(255,255,255,0.4)',
        hourHandColour: '#ffffff',
        minuteHandColour: '#ffffff',
        colonPulseStartColour: '#ffffff',
        colonPulseEndColour: '#7e7e7e'
      }
    }
  }
}