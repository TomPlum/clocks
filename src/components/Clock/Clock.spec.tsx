import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Clock } from './Clock'
import { HandDirection } from '../TimeDisplay'

const getExpectedDirectionAngle = (direction: HandDirection): number => {
  switch (direction) {
    case HandDirection.UP:
      return 0
    case HandDirection.RIGHT:
      return 90
    case HandDirection.DOWN:
      return 180
    case HandDirection.LEFT:
      return 270
  }
}

describe('Clock', () => {
  const directions = [
    HandDirection.UP,
    HandDirection.RIGHT,
    HandDirection.DOWN,
    HandDirection.LEFT,
  ]

  directions.forEach((hourDir) => {
    directions.forEach((minuteDir) => {
      it(`should render the clock with the hour=${hourDir} and minute=${minuteDir} minute hands at the correct angles`, () => {
        render(
          <Clock
            id='0,0'
            hourDirection={hourDir}
            minuteDirection={minuteDir}
          />
        )

        const hourHand = screen.getByTestId(`hour-hand-${hourDir}`)
        const minuteHand = screen.getByTestId(`minute-hand-${minuteDir}`)

        const expectedHourAngle = getExpectedDirectionAngle(hourDir)
        const expectedMinuteAngle = getExpectedDirectionAngle(minuteDir)

        expect(hourHand.style.transform).toBe(`rotate(${expectedHourAngle}deg)`)
        expect(minuteHand.style.transform).toBe(`rotate(${expectedMinuteAngle}deg)`)
      })
    })
  })
})