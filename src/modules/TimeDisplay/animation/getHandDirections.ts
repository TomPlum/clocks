import { getHandAnglesForPattern } from './displayPatternFactory'
import { getHandAnglesForTime } from './getTimeCoordinates'
import { centreLineCoordinates, colonCoordinates } from '../grid'
import type { GetHandDirectionsProps, HandDirections } from 'modules/TimeDisplay'

export const getHandDirections = ({ time, x, y, pattern }: GetHandDirectionsProps): HandDirections => {
  const angles = getHandAnglesForTime(time).get(`${x},${y}`)

  if (angles) {
    return {
      hour: angles[0],
      minute: angles[1]
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