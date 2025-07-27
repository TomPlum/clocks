import { digitSegments } from './types'

const digitHeight = 6
const padding = 2
export const totalWidth = 26
const colonWidth = 2
export const totalHeight = padding * 2 + digitHeight

const xColonLeft = (totalWidth / 2) - 1
const xColonRight = (totalWidth / 2)

const centreLineCoordinates = [
  // Top Line
  { x: xColonLeft, y: 2, hourDirection: 90, minuteDirection: 90 },
  { x: xColonRight, y: 2, hourDirection: 270, minuteDirection: 270 },

  // Bottom Line
  { x: xColonLeft, y: 7, hourDirection: 90, minuteDirection: 90 },
  { x: xColonRight, y: 7, hourDirection: 270, minuteDirection: 270 }
]

const colonCoordinates = [
  // Top Colon
  { x: xColonLeft, y: 3, hourDirection: 180, minuteDirection: 90 },
  { x: xColonRight, y: 3, hourDirection: 180, minuteDirection: 270 },
  { x: xColonLeft, y: 4, hourDirection: 90, minuteDirection: 0 },
  { x: xColonRight, y: 4, hourDirection: 270, minuteDirection: 0 },

  // Bottom Colon
  { x: xColonLeft, y: 5, hourDirection: 180, minuteDirection: 90 },
  { x: xColonRight, y: 5, hourDirection: 180, minuteDirection: 270 },
  { x: xColonLeft, y: 6, hourDirection: 90, minuteDirection: 0 },
  { x: xColonRight, y: 6, hourDirection: 270, minuteDirection: 0 },
]

const getDigitStartX = (digitIndex: number): number => {
  const digitWidth = 5

  // If its an hour digit
  if (digitIndex <= 1) {
    return 2 + digitIndex * digitWidth
  }

  if (digitIndex >= 2) {
    // digitIndex 2 and 3 are for minutes
    return 2 + 2 * digitWidth + colonWidth + (digitIndex - 2) * digitWidth
  }

  throw new Error('Invalid digit index')
}

const timeCoordinates = (time: Date) => {
  const hours = time.getHours()
  const minutes = time.getMinutes()

  const [h1, h2] = hours.toString().padStart(2, '0').split('').map(Number)
  const [m1, m2] = minutes.toString().padStart(2, '0').split('').map(Number)

  const digits = [h1, h2, m1, m2] as const

  const positionToDirections = new Map<string, [number, number, number]>()

  digits.forEach((digit, index) => {
    const startX = getDigitStartX(index)
    const startY = padding
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

const isInPadding = (
  x: number,
  y: number
): boolean => {
  return (
    x < 2 ||
    x >= totalWidth - 2 ||
    y < 2 ||
    y >= totalHeight - 2
  )
}

export const getHandDirections = (time: Date, x: number, y: number) => {
  if (isInPadding(x, y)) {
    if (x < xColonLeft) {
      return {
        hour: 90,
        minute: 90
      }
    }

    if (x === xColonLeft) {
      const direction = y <= padding ? 180 : 0

      return {
        hour: direction,
        minute: direction
      }
    }

    if (x > xColonRight) {
      return {
        hour: 270,
        minute: 270
      }
    }

    if (x === xColonRight) {
      const direction = y <= padding ? 180 : 0

      return {
        hour: direction,
        minute: direction
      }
    }
  }

  const digitHandDirections = timeCoordinates(time).get(`${x},${y}`)

  if (digitHandDirections) {
    return {
      hour: digitHandDirections[0],
      minute: digitHandDirections[1],
      digit: digitHandDirections[2]
    }
  }

  const colonHandDirections = [...colonCoordinates, ...centreLineCoordinates].find(coords => {
    return coords.x === Number(x) && coords.y === Number(y)
  })

  if (colonHandDirections) {
    return {
      hour: colonHandDirections.hourDirection,
      minute: colonHandDirections.minuteDirection,
      isColon: !!colonCoordinates.find(coords => {
        return coords.x === Number(x) && coords.y === Number(y)
      })
    }
  }

  return {
    hour: 270,
    minute: 90
  }
}

export const iterateTimes = (size: number) => {
  return Array.from({ length: size }, (_, i) => i)
}