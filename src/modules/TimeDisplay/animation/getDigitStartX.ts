import { digitWidth, horizontalColonWidth, padding } from '../grid'

export const getDigitStartX = (digitIndex: number, vertical: boolean): number => {
  // If its an hour digit
  if (digitIndex <= 1) {
    return padding + digitIndex * digitWidth
  }

  // If its a minute digit
  if (digitIndex >= 2) {
    if (vertical) {
      return padding + (digitIndex - 2) * digitWidth
    }

    const twoDigitWidths = 2 * digitWidth
    return padding + twoDigitWidths + horizontalColonWidth + (digitIndex - 2) * digitWidth
  }

  throw new Error('Invalid digit index')
}