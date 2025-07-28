import type { ClockThemeColours, Theme, ThemeColours } from './types'

export const getThemeColours = (theme: Theme): ThemeColours => {
  const darkClockTheme: ClockThemeColours = {
    centreDotColour: '#ffffff',
    backgroundColour: '#131313',
    borderColour: '#131313',
    outerShadowColour: 'rgba(31,31,31,0.3)',
    innerShadowColour: 'rgba(0,0,0,0.3)',
    hourHandColour: '#ffffff',
    minuteHandColour: '#ffffff',
    handPulseStartColour: '#ffffff',
    handPulseEndColour: '#626262'
  }

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
        settingsButtonColour: '#000000',
        digitClock: lightClockTheme,
        borderClocks: lightClockTheme,
        colonClocks: lightClockTheme,
        mantineColourScheme: 'light'
      }
    }
    case 'dark': {
      return {
        backgroundColour: '#252525',
        settingsButtonColour: '#ffffff',
        digitClock: darkClockTheme,
        borderClocks: darkClockTheme,
        colonClocks: darkClockTheme,
        mantineColourScheme: 'dark'
      }
    }
    case 'matrix': {
      return {
        backgroundColour: '#1a1a1a',
        settingsButtonColour: '#34c226',
        digitClock: {
          ...darkClockTheme,
          centreDotColour: '#196b12',
          hourHandColour: '#34c226',
          minuteHandColour: '#34c226'
        },
        colonClocks: darkClockTheme,
        borderClocks: darkClockTheme,
        mantineColourScheme: 'dark'
      }
    }
  }
}