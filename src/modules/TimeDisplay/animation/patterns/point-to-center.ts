import { totalHeight, totalWidth } from 'modules/TimeDisplay/grid'

export const getAngleForPointToCenterPattern = (x: number, y: number) => {
  const xCenter = (totalWidth - 1) / 2
  const yCenter = (totalHeight - 1) / 2

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