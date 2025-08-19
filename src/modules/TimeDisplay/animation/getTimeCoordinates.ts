import { digitHeight, digitSegments, padding, verticalColonHeight } from 'modules/TimeDisplay/grid'
import { getDigitStartX } from './getDigitStartX'

export const getHandAnglesForTime = (time: Date, vertical: boolean) => {
  const hours = time.getHours()
  const minutes = time.getMinutes()

  const [h1, h2] = hours.toString().padStart(2, '0').split('').map(Number)
  const [m1, m2] = minutes.toString().padStart(2, '0').split('').map(Number)

  const digits = [h1, h2, m1, m2] as const

  const positionToDirections = new Map<string, [number, number, number]>()

  digits.forEach((digit, index) => {
    const startX = getDigitStartX(index, vertical)
    const yVerticalOffset = index <= 1 ? 0 : digitHeight + verticalColonHeight
    const startY = vertical ? padding + yVerticalOffset  : padding
    const segments = digitSegments[digit]

    for (const segment of segments) {
      const globalX = startX + segment.x
      const globalY = startY + segment.y
      const key = `${globalX},${globalY}`

      positionToDirections.set(key, [segment.hourHandAngle, segment.minuteHandAngle, digit])
    }
  })

  return positionToDirections
}