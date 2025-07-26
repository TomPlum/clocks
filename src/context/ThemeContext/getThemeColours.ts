import type { Theme, ThemeColours } from './types.ts'

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
        colonPulseColour: '#7e7e7e'
      }
    }
    case 'dark': {
      return {
        background: '#000000',
        centerDot: '#ffffff',
        clockBackground: '#000000',
        clockBorder: '#000000',
        clockShadowOuterColour: 'rgba(255,255,255,0.3)',
        clockShadowInnerColour: 'rgba(255,255,255,0.4)',
        hourHandColour: '#ffffff',
        minuteHandColour: '#ffffff',
        colonPulseColour: '#7e7e7e'
      }
    }
  }
}