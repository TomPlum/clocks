import { getHandAnglesForTime } from './getTimeCoordinates'
import {
  horizontalCentreLineCoordinates,
  horizontalColonCoordinates,
  verticalCentreLineCoordinates,
  verticalColonCoordinates
} from '../grid'
import type { ClockMetadata, GetClockMetadataProps } from 'modules/TimeDisplay'

export const getClockMetadata = ({ time, x, y, vertical = false }: GetClockMetadataProps): ClockMetadata => {
  const digitHandDirections = getHandAnglesForTime(time, vertical).get(`${x},${y}`)

  if (digitHandDirections) {
    return {
      digit: digitHandDirections[2],
      isColon: false,
      isColonCenterLine: false
    }
  }

  const horizontalColon = [...horizontalColonCoordinates, ...horizontalCentreLineCoordinates]
  const verticalColon = [...verticalColonCoordinates, ...verticalCentreLineCoordinates]

  const colonHandDirections = (vertical ? verticalColon : horizontalColon).find(coords => {
    return coords.x === Number(x) && coords.y === Number(y)
  })

  if (colonHandDirections) {
    const colonCenterLineCoords = vertical ? verticalCentreLineCoordinates : horizontalCentreLineCoordinates
    const colonCoords = vertical ? verticalColonCoordinates : horizontalColonCoordinates

    return {
      digit: undefined,
      isColonCenterLine: !!colonCenterLineCoords.find(coords => {
        return coords.x === Number(x) && coords.y === Number(y)
      }),
      isColon: !!colonCoords.find(coords => {
        return coords.x === Number(x) && coords.y === Number(y)
      })
    }
  }

  return {
    digit: undefined,
    isColon: false,
    isColonCenterLine: false
  }
}