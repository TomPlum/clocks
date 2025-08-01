/**
 * Interpolates between two angles, taking the shortest rotation path.
 *
 * This function ensures that the interpolation travels the shortest
 * direction around the circle (clockwise or counter-clockwise).
 * It correctly wraps around the 0/360° boundary.
 *
 * @param start - The starting angle in degrees (0–359).
 * @param end - The target angle in degrees (0–359).
 * @param t - The normalised interpolation factor (from 0 to 1).
 * @returns The interpolated angle in degrees, wrapped to the range [0, 360].
 *
 * @example
 * interpolateAngle(350, 10, 0.5) // → 0 (halfway via the shortest path)
 */
export const interpolateAngle = (start: number, end: number, t: number): number => {
  const delta = ((end - start + 540) % 360) - 180
  return (start + delta * t + 360) % 360
}