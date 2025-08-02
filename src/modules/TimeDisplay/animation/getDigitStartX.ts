import { colonWidth } from '../grid'

export const getDigitStartX = (digitIndex: number): number => {
  const digitWidth = 5

  // If its an hour digit
  if (digitIndex <= 1) {
    return 2 + digitIndex * digitWidth
  }

  if (digitIndex >= 2) {
    // digitIndex 2 and 3 are for minutes
    return 2 + 2 * digitWidth + colonWidth + (digitIndex - 2) * digitWidth
  }

  throw new Error('Invalid digit index')
}