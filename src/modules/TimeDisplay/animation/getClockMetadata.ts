import { getHandAnglesForTime } from './getTimeCoordinates'
import { centreLineCoordinates, colonCoordinates } from '../grid'
import type { ClockMetadata, GetClockMetadataProps } from 'modules/TimeDisplay'

export const getClockMetadata = ({ time, x, y }: GetClockMetadataProps): ClockMetadata => {
  const digitHandDirections = getHandAnglesForTime(time).get(`${x},${y}`)

  if (digitHandDirections) {
    return {
      digit: digitHandDirections[2],
      isColon: false
    }
  }

  const colonHandDirections = [...colonCoordinates, ...centreLineCoordinates].find(coords => {
    return coords.x === Number(x) && coords.y === Number(y)
  })

  if (colonHandDirections) {
    return {
      digit: undefined,
      isColon: !!colonCoordinates.find(coords => {
        return coords.x === Number(x) && coords.y === Number(y)
      })
    }
  }

  return {
    digit: undefined,
    isColon: false
  }
}