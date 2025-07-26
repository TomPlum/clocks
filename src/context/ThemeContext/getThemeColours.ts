import type { Theme, ThemeColours } from './types'

export const getThemeColours = (theme: Theme): ThemeColours => {
  switch (theme) {
    case 'light': {
      return {
        background: '#ffffff',
        centerDot: '#000000',
        clockBackground: '#ffffff',
        clockBorder: '#ffffff',
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
        background: '#1a1a1a',
        centerDot: '#ffffff',
        clockBackground: '#1e1e1e',
        clockBorder: '#262626',
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