import type { ClockThemeColours, Theme, ThemeColours } from './types'

export const getThemeColours = (theme: Theme): ThemeColours => {
  switch (theme) {
    case 'light': {
      const lightClockTheme: ClockThemeColours = {
        centreDotColour: '#000000',
        backgroundColour: '#ffffff',
        borderColour: '#ffffff',
        outerShadowColour: 'rgba(0, 0, 0, 0.3)',
        innerShadowColour: 'rgba(0, 0, 0, 0.4)',
        hourHandColour: '#000000',
        minuteHandColour: '#000000',
        handPulseStartColour: '#000000',
        handPulseEndColour: '#7e7e7e'
      }

      return {
        backgroundColour: '#ffffff',
        digitClock: lightClockTheme,
        borderClocks: lightClockTheme,
        colonClocks: lightClockTheme
      }
    }
    case 'dark': {
      const darkClockTheme: ClockThemeColours = {
        centreDotColour: '#ffffff',
        backgroundColour: '#1e1e1e',
        borderColour: '#262626',
        outerShadowColour: 'rgba(255,255,255,0.3)',
        innerShadowColour: 'rgba(255,255,255,0.4)',
        hourHandColour: '#ffffff',
        minuteHandColour: '#ffffff',
        handPulseStartColour: '#ffffff',
        handPulseEndColour: '#7e7e7e'
      }

      return {
        backgroundColour: '#1a1a1a',
        digitClock: darkClockTheme,
        borderClocks: darkClockTheme,
        colonClocks: darkClockTheme
      }
    }
    case 'matrix': {
      return {
        backgroundColour: '#1a1a1a',
        digitClock: {
          centreDotColour: '#196b12',
          backgroundColour: '#1e1e1e',
          borderColour: '#262626',
          outerShadowColour: 'rgba(255,255,255,0.3)',
          innerShadowColour: 'rgba(255,255,255,0.4)',
          hourHandColour: '#34c226',
          minuteHandColour: '#34c226',
          handPulseStartColour: '#ffffff',
          handPulseEndColour: '#7e7e7e'
        },
        colonClocks: {
          centreDotColour: '#196b12',
          backgroundColour: '#1e1e1e',
          borderColour: '#262626',
          outerShadowColour: 'rgba(255,255,255,0.3)',
          innerShadowColour: 'rgba(255,255,255,0.4)',
          hourHandColour: '#34c226',
          minuteHandColour: '#34c226',
          handPulseStartColour: '#ffffff',
          handPulseEndColour: '#7e7e7e'
        },
        borderClocks: {
          centreDotColour: '#ffffff',
          backgroundColour: '#1e1e1e',
          borderColour: '#262626',
          outerShadowColour: 'rgba(255,255,255,0.3)',
          innerShadowColour: 'rgba(255,255,255,0.4)',
          hourHandColour: '#ffffff',
          minuteHandColour: '#ffffff',
          handPulseStartColour: '#ffffff',
          handPulseEndColour: '#7e7e7e'
        }
      }
    }
  }
}