import { totalHeight } from 'modules/TimeDisplay/grid'

export const getAnglesForAwayFromXAxisPattern = (y: number) => {
  const yCenter = (totalHeight - 1) / 2
  const angle = y <= yCenter ? 0 : 180

  return {
    hour: angle,
    minute: angle
  }
}