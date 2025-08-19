import {
  horizontalColons,
  verticalColons
} from 'modules/TimeDisplay/grid'

const horizontalColonTargets = [
  { x: horizontalColons.top.x1, y: horizontalColons.top.y2 },
  { x: horizontalColons.bottom.x2, y: horizontalColons.top.y2 },
  { x: horizontalColons.top.x1, y: horizontalColons.bottom.y1 },
  { x: horizontalColons.bottom.x2, y: horizontalColons.bottom.y1 }
]

const verticalColonTargets = [
  { x: verticalColons.left.x2, y: verticalColons.left.y1 },
  { x: verticalColons.left.x2, y: verticalColons.left.y2 },
  { x: verticalColons.right.x1, y: verticalColons.right.y1 },
  { x: verticalColons.right.x1, y: verticalColons.right.y2 },
]

export const getAngleForCircularPattern = (x: number, y: number, vertical: boolean) => {
  const getAngleToTarget = (fromX: number, fromY: number, toX: number, toY: number): number => {
    const dx = toX - fromX
    const dy = toY - fromY
    const radians = Math.atan2(dy, dx)
    const degrees = (radians * 180) / Math.PI
    return (degrees + 360) % 360 // Normalize to 0–360
  }

  const colonTargets = vertical ? verticalColonTargets : horizontalColonTargets

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