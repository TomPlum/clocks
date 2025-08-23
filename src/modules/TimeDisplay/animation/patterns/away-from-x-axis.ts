import { totalHorizontalHeight, totalVerticalHeight } from 'modules/TimeDisplay/grid'

export const getAnglesForAwayFromXAxisPattern = (y: number, vertical: boolean) => {
  const height = vertical ? totalVerticalHeight : totalHorizontalHeight
  const yCenter = (height - 1) / 2
  const angle = y <= yCenter ? 0 : 180

  return {
    hour: angle,
    minute: angle
  }
}