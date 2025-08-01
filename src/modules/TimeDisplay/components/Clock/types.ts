import type { ClockThemeColours } from 'context/ThemeContext'

/**
 * Props for a single clock cell in the digit display.
 */
export interface ClockProps {
  /**
   * Unique identifier for the clock instance.
   */
  id: string

  position: ClockPositon

  /**
   * The digit (0–9) that this clock contributes to rendering.
   * Optional — may be undefined if the clock is not part of
   * an active digit.
   */
  digit?: number

  colon?: boolean

  /**
   * The diameter, in pixels, of the clock.
   */
  size?: number

  /**
   * A CSS class to be passed to the wrapping
   * element of the clock instance.
   */
  className?: string

  /**
   * Overrides the default styles of the
   * current theme.
   */
  styles?: ClockThemeColours
}

export type ClockAnimation = 'ease-to-time' | 'random' | 'clockwise-rotation'

export interface ClockAnimationConfig {
  hourHandStartingAngle?: number
  minuteHandStartingAngle?: number

  /**
   * Sets the speed, in milliseconds, that
   * the clocks' animations should use.
   *
   * Animations like "random" don't have set
   * hand angles, and so the animationSpeed can
   * be used to set how quickly the animation
   * progresses.
   */
  animationSpeed?: number

  animationDuration?: number

  dontNotify?: boolean
}

export type ClockLoadingAnimation = Exclude<ClockAnimation, 'ease-to-time'>

export type AnimationCleanupFunction = (() => void) | undefined

export interface ClockEventHandler {
  onComplete?: () => void
}

export interface PostAnimationInfo {
  postAnimationTimeTarget?: Date
}

export type RunAnimationConfig = ClockAnimationConfig & ClockEventHandler & PostAnimationInfo

export interface ClockRefHandler {
  runAnimation: (animation: ClockAnimation, config?: RunAnimationConfig) => AnimationCleanupFunction
  easeToTime: (time: Date, config?: RunAnimationConfig) => AnimationCleanupFunction
}

export interface ClockPositon {
  x: number
  y: number
}