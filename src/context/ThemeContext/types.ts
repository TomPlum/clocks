/**
 * A union type representing the available themes in the app.
 */
export type Theme = 'light' | 'dark' | 'matrix'

/**
 * Defines the full set of colour values used by a single clock type.
 *
 * All `*ShadowColour` properties must be specified in `rgba()` format for proper rendering.
 */
export interface ClockThemeColours {
  /** Background colour of the clock face */
  backgroundColour: string

  /** colour of the clock border */
  borderColour: string

  /** colour of the small centre dot in the clock face */
  centreDotColour: string

  /** colour of the minute hand */
  minuteHandColour: string

  /** colour of the hour hand */
  hourHandColour: string

  /** Outer shadow colour (must be in rgba format) */
  outerShadowColour: string

  /** Inner shadow colour (must be in rgba format) */
  innerShadowColour: string

  /** Starting colour of the animated pulse effect on the hands */
  handPulseStartColour: string

  /** Ending colour of the animated pulse effect on the hands */
  handPulseEndColour: string
}

/**
 * Defines the full set of colour values used for the app's UI and all clock variants.
 */
export interface ThemeColours {
  /** Overall app background colour */
  backgroundColour: string

  /** colour of the settings/configuration button */
  settingsButtonColour: string

  /** Theme colours for the main digital clock display */
  digitClock: ClockThemeColours

  /** Theme colours for the decorative border clocks */
  borderClocks: ClockThemeColours

  /** Theme colours for the colon separator clocks */
  colonClocks: ClockThemeColours

  /**
   * The colour scheme to apply to Mantine UI
   * components.
   */
  mantineColourScheme: 'light' | 'dark'
}

/**
 * Context object provided by the app’s theme provider.
 */
export interface ThemeContextBag {
  /** Currently selected theme name */
  theme: Theme

  /** Colour palette derived from the selected theme */
  themeColours: ThemeColours

  /**
   * Updates the active theme and recalculates derived theme colours.
   *
   * @param theme - The new theme to apply
   */
  setTheme: (theme: Theme) => void

  /**
   * The current size of the viewport.
   */
  viewportSize: {
    /**
     * The height, in pixels, of the viewport.
     */
    height: number

    /**
     * The width, in pixels, of the viewport.
     */
    width: number
  }

  isMobile: boolean
}