import { getHandAnglesForPattern } from './displayPatternFactory'
import { timeCoordinates } from './getTimeCoordinates'
import { centreLineCoordinates, colonCoordinates } from '../grid'
import type { GetHandDirectionsProps, HandDirections } from 'modules/TimeDisplay'

export const getHandDirections = ({ time, x, y, pattern }: GetHandDirectionsProps): HandDirections => {
  const digitHandDirections = timeCoordinates(time).get(`${x},${y}`)

  if (digitHandDirections) {
    return {
      hour: digitHandDirections[0],
      minute: digitHandDirections[1]
    }
  }

  const colonHandDirections = [...colonCoordinates, ...centreLineCoordinates].find(coords => {
    return coords.x === Number(x) && coords.y === Number(y)
  })

  if (colonHandDirections) {
    return {
      hour: colonHandDirections.hourDirection,
      minute: colonHandDirections.minuteDirection
    }
  }

  return getHandAnglesForPattern(x, y, pattern)
}