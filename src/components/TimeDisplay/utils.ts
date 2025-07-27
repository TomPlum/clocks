import { digitSegments } from './types'

const digitHeight = 6
const padding = 2
export const totalWidth = 26
const colonWidth = 2
export const totalHeight = padding * 2 + digitHeight

const xColonLeft = (totalWidth / 2) - 1
const xColonRight = (totalWidth / 2)
const yTopColonOne = 3
const yTopColonTwo = 4
const yBottomColonOne = 5
const yBottomColonTwo = 6

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
  { x: xColonLeft, y: yTopColonOne, hourDirection: 180, minuteDirection: 90 },
  { x: xColonRight, y: yTopColonOne, hourDirection: 180, minuteDirection: 270 },
  { x: xColonLeft, y: yTopColonTwo, hourDirection: 90, minuteDirection: 0 },
  { x: xColonRight, y: yTopColonTwo, hourDirection: 270, minuteDirection: 0 },

  // Bottom Colon
  { x: xColonLeft, y: yBottomColonOne, hourDirection: 180, minuteDirection: 90 },
  { x: xColonRight, y: yBottomColonOne, hourDirection: 180, minuteDirection: 270 },
  { x: xColonLeft, y: yBottomColonTwo, hourDirection: 90, minuteDirection: 0 },
  { x: xColonRight, y: yBottomColonTwo, hourDirection: 270, minuteDirection: 0 }
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

const getAngleForCircularEffect = (x: number, y: number) => {
  const getAngleToTarget = (fromX: number, fromY: number, toX: number, toY: number): number => {
    const dx = toX - fromX
    const dy = toY - fromY
    const radians = Math.atan2(dy, dx)
    const degrees = (radians * 180) / Math.PI
    return (degrees + 360) % 360 // Normalize to 0–360
  }

  const colonTargets = [
    { x: xColonLeft, y: yTopColonTwo },
    { x: xColonRight, y: yTopColonTwo },
    { x: xColonLeft, y: yBottomColonOne },
    { x: xColonRight, y: yBottomColonOne }
  ]

  const getAngle = (x: number, y: number): number => {
    let closest = colonTargets[0]
    let minDist = Infinity

    for (const target of colonTargets) {
      const dx = target.x - x
      const dy = target.y - y
      const dist = dx * dx + dy * dy
      if (dist < minDist) {
        minDist = dist
        closest = target
      }
    }

    return getAngleToTarget(x, y, closest.x, closest.y)
  }

  const angle = getAngle(x, y)

  return {
    hour: angle,
    minute: angle
  }
}

export const getHandDirections = (time: Date, x: number, y: number) => {
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

  return getAngleForCircularEffect(x, y)
}

export const iterateTimes = (size: number) => {
  return Array.from({ length: size }, (_, i) => i)
}