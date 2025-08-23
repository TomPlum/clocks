import { getHandAnglesForPattern } from './displayPatternFactory'
import { getHandAnglesForTime } from './getTimeCoordinates'
import {
  horizontalCentreLineCoordinates,
  horizontalColonCoordinates,
  verticalCentreLineCoordinates,
  verticalColonCoordinates
} from '../grid'
import type { GetHandDirectionsProps, HandDirections } from 'modules/TimeDisplay'

export const getHandDirections = ({
  time,
  x,
  y,
  pattern,
  vertical = false
}: GetHandDirectionsProps): HandDirections => {
  const angles = getHandAnglesForTime(time, vertical).get(`${x},${y}`)

  if (angles) {
    return {
      hour: angles[0],
      minute: angles[1]
    }
  }

  const horizontalColon = [...horizontalColonCoordinates, ...horizontalCentreLineCoordinates]
  const verticalColon = [...verticalColonCoordinates, ...verticalCentreLineCoordinates]

  const colonHandDirections = (vertical ? verticalColon : horizontalColon).find(coords => {
    return coords.x === Number(x) && coords.y === Number(y)
  })

  if (colonHandDirections) {
    return {
      hour: colonHandDirections.hourDirection,
      minute: colonHandDirections.minuteDirection
    }
  }

  return getHandAnglesForPattern(x, y, pattern, vertical)
}