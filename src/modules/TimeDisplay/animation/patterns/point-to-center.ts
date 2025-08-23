import {
  totalHorizontalHeight,
  totalHorizontalWidth,
  totalVerticalHeight,
  totalVerticalWidth
} from 'modules/TimeDisplay/grid'

export const getAngleForPointToCenterPattern = (x: number, y: number, vertical: boolean) => {
  const width = vertical ? totalVerticalWidth : totalHorizontalWidth
  const height = vertical ? totalVerticalHeight : totalHorizontalHeight

  const xCenter = (width - 1) / 2
  const yCenter = (height - 1) / 2

  const fromX = x + 0.5
  const fromY = y + 0.5

  const dx = xCenter - fromX
  const dy = yCenter - fromY

  const radians = Math.atan2(dy, dx)
  const degrees = (radians * 180) / Math.PI

  // Adjust to match CSS rotate (0° = up, clockwise).
  const clockAngle = (degrees + 90 + 360) % 360

  return {
    hour: clockAngle,
    minute: clockAngle
  }
}