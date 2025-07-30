import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Clock } from './Clock'

describe('Clock', () => {
  const angles = [0, 90, 180, 270, 110, 55]

  angles.forEach((hourAngle) => {
    angles.forEach((minuteAngle) => {
      it(`should render the clock with the hour=${hourAngle} and minute=${minuteAngle} minute hands at the correct angles`, async () => {
        render(
          <Clock
            id='0,0'
            hourHandAngle={hourAngle}
            minuteHandAngle={minuteAngle}
          />
        )

        const hourHand = screen.getByTestId('clock-0,0-hour-hand')
        const minuteHand = screen.getByTestId('clock-0,0-minute-hand')

        await waitFor(() => {
          expect(hourHand.style.transform).toBe(`rotate(${hourAngle}deg)`)
          expect(minuteHand.style.transform).toBe(`rotate(${minuteAngle}deg)`)
        })
      })
    })
  })
})