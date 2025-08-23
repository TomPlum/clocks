import type { DigitClockCoordinate } from './types'

export const digitHeight = 6
export const digitWidth = 5

export const padding = 2
const paddingSize = padding * 2

export const horizontalColonWidth = 2
export const verticalColonHeight = 2

export const totalHorizontalWidth = paddingSize + (digitWidth * 4) + horizontalColonWidth
export const totalHorizontalHeight = paddingSize + digitHeight

export const totalVerticalWidth = paddingSize + (digitWidth * 2)
export const totalVerticalHeight = paddingSize + (digitHeight * 2) + verticalColonHeight

// TODO: Calc the hardcoded y-orindates
export const horizontalColons = {
  top: {
    x1: (totalHorizontalWidth / 2) - 1,
    y1: 3,
    x2: (totalHorizontalWidth / 2),
    y2: 4,
  },
  bottom: {
    x1: (totalHorizontalWidth / 2) - 1,
    y1: 5,
    x2: (totalHorizontalWidth / 2),
    y2: 6
  }
}

export const verticalColons = {
  left: {
    x1: paddingSize + 1,
    y1: padding + digitHeight,
    x2: paddingSize + 2,
    y2: padding + digitHeight + 1,
  },
  right: {
    x1: totalVerticalWidth - paddingSize - 2,
    y1: padding + digitHeight,
    x2: totalVerticalWidth - paddingSize - 3,
    y2: padding + digitHeight + 1
  }
}

export const mobileViewCollapseWidth = 500

export const horizontalCentreLineCoordinates = [
  // Top Line
  { x: horizontalColons.top.x1, y: 2, hourDirection: 90, minuteDirection: 90 },
  { x: horizontalColons.top.x2, y: 2, hourDirection: 270, minuteDirection: 270 },

  // Bottom Line
  { x: horizontalColons.bottom.x1, y: 7, hourDirection: 90, minuteDirection: 90 },
  { x: horizontalColons.bottom.x2, y: 7, hourDirection: 270, minuteDirection: 270 }
]

export const horizontalColonCoordinates = [
  // Top Colon
  { x: horizontalColons.top.x1, y: horizontalColons.top.y1, hourDirection: 180, minuteDirection: 90 },
  { x: horizontalColons.top.x2, y: horizontalColons.top.y1, hourDirection: 180, minuteDirection: 270 },
  { x: horizontalColons.top.x1, y: horizontalColons.top.y2, hourDirection: 90, minuteDirection: 0 },
  { x: horizontalColons.top.x2, y: horizontalColons.top.y2, hourDirection: 270, minuteDirection: 0 },

  // Bottom Colon
  { x: horizontalColons.bottom.x1, y: horizontalColons.bottom.y1, hourDirection: 180, minuteDirection: 90 },
  { x: horizontalColons.bottom.x2, y: horizontalColons.bottom.y1, hourDirection: 180, minuteDirection: 270 },
  { x: horizontalColons.bottom.x1, y: horizontalColons.bottom.y2, hourDirection: 90, minuteDirection: 0 },
  { x: horizontalColons.bottom.x2, y: horizontalColons.bottom.y2, hourDirection: 270, minuteDirection: 0 }
]

export const verticalCentreLineCoordinates = [
  // Left Line
  { x: paddingSize, y: padding + digitHeight, hourDirection: 180, minuteDirection: 180 },
  { x: paddingSize, y: padding + digitHeight + 1, hourDirection: 0, minuteDirection: 0 },

  // Right Line
  { x: totalVerticalWidth - paddingSize - 1, y: padding + digitHeight, hourDirection: 180, minuteDirection: 180 },
  { x: totalVerticalWidth - paddingSize - 1, y: padding + digitHeight + 1, hourDirection: 0, minuteDirection: 0 }
]

export const verticalColonCoordinates = [
  // Left Colon
  { x: verticalColons.left.x1, y: verticalColons.left.y1, hourDirection: 180, minuteDirection: 90 },
  { x: verticalColons.left.x1, y: verticalColons.left.y2, hourDirection: 90, minuteDirection: 0 },
  { x: verticalColons.left.x2, y: verticalColons.left.y1, hourDirection: 180, minuteDirection: 270 },
  { x: verticalColons.left.x2, y: verticalColons.left.y2, hourDirection: 270, minuteDirection: 0 },

  // Right Colon
  { x: verticalColons.right.x1, y: verticalColons.right.y1, hourDirection: 270, minuteDirection: 180 },
  { x: verticalColons.right.x1, y: verticalColons.right.y2, hourDirection: 0, minuteDirection: 270 },
  { x: verticalColons.right.x2, y: verticalColons.right.y1, hourDirection: 90, minuteDirection: 180 },
  { x: verticalColons.right.x2, y: verticalColons.right.y2, hourDirection: 0, minuteDirection: 90 }
]

export const digitSegments: Record<number, DigitClockCoordinate[]> = {
  0: [
    // Outer Rectangle
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 5, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 3, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 1, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 0, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 0, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },

    // Inner Rectangle
    { x: 1, y: 1, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 3, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 2, y: 4, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 1, y: 4, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 1, y: 3, minuteHandAngle: 180, hourHandAngle: 0 },
    { x: 1, y: 2, minuteHandAngle: 180, hourHandAngle: 0 },

    // Two Middle Clocks (Commented out for now so they don't get coloured in certain themes)
    // { x: 2, y: 2, minuteDirection: 270, hourDirection: 90 },
    // { x: 2, y: 3, minuteDirection: 270, hourDirection: 90 }
  ],
  1: [
    // The Number 1 Itself
    { x: 2, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 5, minuteHandAngle: 270, hourHandAngle: 0 },
    { x: 3, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 2, y: 1, minuteHandAngle: 0, hourHandAngle: 90 }
  ],
  2: [
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 1, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 2, minuteHandAngle: 90, hourHandAngle: 180 },
    { x: 1, y: 2, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 2, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 2, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 1, y: 3, minuteHandAngle: 90, hourHandAngle: 180 },
    { x: 2, y: 3, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 3, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 0, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 1, y: 4, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 2, y: 4, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 4, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 4, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 0, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 1, y: 5, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 5, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 5, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 5, minuteHandAngle: 270, hourHandAngle: 0 },
  ],
  3: [
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 0, y: 2, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 0, y: 3, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 1, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 2, minuteHandAngle: 270, hourHandAngle: 0 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 5, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 3, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 1, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 0, y: 4, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 0, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 3, y: 3, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 1, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 1, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 1, y: 3, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 3, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 1, y: 4, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 4, minuteHandAngle: 270, hourHandAngle: 90 }
  ],
  4: [
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 180, hourHandAngle: 270 },
    { x: 3, y: 0, minuteHandAngle: 90, hourHandAngle: 180 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 1, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 1, y: 2, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 2, y: 2, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 2, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 3, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 1, y: 3, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 3, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 3, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 4, y: 5, minuteHandAngle: 0, hourHandAngle: 270 },

  ],
  5: [
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 1, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 3, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 0, y: 4, minuteHandAngle: 90, hourHandAngle: 180 },
    { x: 1, y: 2, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 1, y: 3, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 3, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 3, minuteHandAngle: 180, hourHandAngle: 270 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 4, y: 2, minuteHandAngle: 180, hourHandAngle: 270 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 5, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 3, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 1, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 0, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 1, y: 4, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 4, minuteHandAngle: 270, hourHandAngle: 90 },
  ],
  6: [
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 0, y: 1, minuteHandAngle: 180, hourHandAngle: 0 },
    { x: 1, y: 1, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 1, minuteHandAngle: 270, hourHandAngle: 0 },
    { x: 0, y: 2, minuteHandAngle: 180, hourHandAngle: 0 },
    { x: 1, y: 2, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 2, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 2, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 0, y: 3, minuteHandAngle: 180, hourHandAngle: 0 },
    { x: 1, y: 3, minuteHandAngle: 90, hourHandAngle: 180 },
    { x: 2, y: 3, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 3, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 3, minuteHandAngle: 180, hourHandAngle: 0 },
    { x: 0, y: 4, minuteHandAngle: 180, hourHandAngle: 0 },
    { x: 1, y: 4, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 2, y: 4, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 4, minuteHandAngle: 270, hourHandAngle: 0 },
    { x: 4, y: 4, minuteHandAngle: 180, hourHandAngle: 0 },
    { x: 0, y: 5, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 1, y: 5, minuteHandAngle: 90, hourHandAngle: 90 },
    { x: 2, y: 5, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 5, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 5, minuteHandAngle: 270, hourHandAngle: 0 }
  ],
  7: [
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 1, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 5, minuteHandAngle: 270, hourHandAngle: 0 },
    { x: 3, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 }
  ],
  8: [
    // Outer Rectangle
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 5, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 3, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 1, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 0, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 0, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },

    // Top Inner Square
    { x: 1, y: 1, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 1, y: 2, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 2, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 2, minuteHandAngle: 0, hourHandAngle: 270 },

    // Bottom Inner Square
    { x: 1, y: 3, minuteHandAngle: 90, hourHandAngle: 180 },
    { x: 2, y: 3, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 3, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 1, y: 4, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 2, y: 4, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 270 },
  ],
  9: [
    { x: 0, y: 0, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 1, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 0, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 4, y: 0, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 4, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 3, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 4, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 4, y: 5, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 3, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 1, y: 5, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 0, y: 5, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 0, y: 4, minuteHandAngle: 90, hourHandAngle: 180 },
    { x: 0, y: 3, minuteHandAngle: 0, hourHandAngle: 90 },
    { x: 0, y: 2, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 0, y: 1, minuteHandAngle: 0, hourHandAngle: 180 },
    { x: 1, y: 1, minuteHandAngle: 180, hourHandAngle: 90 },
    { x: 2, y: 1, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 1, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 1, y: 2, minuteHandAngle: 90, hourHandAngle: 0 },
    { x: 2, y: 2, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 3, y: 2, minuteHandAngle: 0, hourHandAngle: 270 },
    { x: 1, y: 3, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 2, y: 3, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 3, minuteHandAngle: 270, hourHandAngle: 180 },
    { x: 1, y: 4, minuteHandAngle: 270, hourHandAngle: 90 },
    { x: 2, y: 4, minuteHandAngle: 90, hourHandAngle: 270 },
    { x: 3, y: 4, minuteHandAngle: 0, hourHandAngle: 270 },
  ]
}