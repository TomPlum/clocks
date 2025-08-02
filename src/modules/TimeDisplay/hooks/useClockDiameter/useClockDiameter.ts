import { useMemo } from 'react'
import { useThemeContext } from 'context/ThemeContext'

export const useClockDiameter = () => {
  const { viewportSize : { width } } = useThemeContext()

  return useMemo<number>(() => {
    const minSize = 20
    const maxSize = 46
    const minViewport = 300
    const maxViewport = 1200

    const clampedWidth = Math.min(Math.max(width, minViewport), maxViewport)

    const sizeRatio = (clampedWidth - minViewport) / (maxViewport - minViewport)
    return minSize + sizeRatio * (maxSize - minSize)
  }, [width])
}