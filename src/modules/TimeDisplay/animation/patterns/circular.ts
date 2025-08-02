import { xColonLeft, xColonRight, yBottomColonOne, yTopColonTwo } from 'modules/TimeDisplay/grid'

export const getAngleForCircularPattern = (x: number, y: number) => {
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