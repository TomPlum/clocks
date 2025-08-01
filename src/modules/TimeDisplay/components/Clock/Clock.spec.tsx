import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Clock } from './Clock'

vi.mock('modules/TimeDisplay/hooks/useClockAnimation', () => ({
  useClockAnimation: () => ({
    easeToTime: vi.fn(),
    runAnimation: vi.fn(),
    hourHandAngle: 90,
    minuteHandleAngle: 180
  })
}))

vi.mock('context/AnimationContext', () => ({
  useAnimationContext: () => ({ initialAnimating: false })
}))

vi.mock('context/ConfigContext/useConfigContext', () => ({
  useConfigContext: () => ({ enableColonAnimation: true })
}))

vi.mock('context/ThemeContext', () => ({
  useThemeContext: () => ({
    themeColours: {
      digitClock: {
        borderColour: 'blue',
        backgroundColour: 'green',
        outerShadowColour: 'black',
        innerShadowColour: 'gray',
        handPulseStartColour: 'white',
        handPulseEndColour: 'purple',
        hourHandColour: 'red',
        minuteHandColour: 'yellow',
        centreDotColour: 'orange'
      },
      borderClocks: {}
    }
  })
}))

describe('Clock', () => {
  it('applies rotation styles from useClockAnimation', () => {
    render(<Clock id="angle-check" position={{ x: 0, y: 0 }} />)
    const hourHand = screen.getByTestId('clock-angle-check-hour-hand')
    const minuteHand = screen.getByTestId('clock-angle-check-minute-hand')

    expect(hourHand).toHaveStyle({ transform: 'rotate(90deg)' })
    expect(minuteHand).toHaveStyle({ transform: 'rotate(180deg)' })
  })

  it('adds pulse animation classes if colon and animation enabled', () => {
    render(<Clock id="pulse-check" position={{ x: 0, y: 0 }}  colon />)
    expect(screen.getByTestId('clock-pulse-check-hour-hand')).toHaveClass('Clock__Pulse')
    expect(screen.getByTestId('clock-pulse-check-minute-hand')).toHaveClass('Clock__Pulse')
  })
})