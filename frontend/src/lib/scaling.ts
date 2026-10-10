// Pure functions that turn an emotion percentage into a character size.

// Smallest allowed diameter, as a fraction of the largest possible one. It keeps a
// near-zero emotion visible as a small seed instead of vanishing.
export const MIN_DIAMETER = 0.18

// Percentage used for every character before any result exists ("standby").
export const STANDBY_PERCENT = 20

function clampPercent(percent: number): number {
  return Math.min(100, Math.max(0, Number.isFinite(percent) ? percent : 0))
}

// Maps 0-100% to a 0-1 "intensity" that drives how strongly a character moves.
// The square root is deliberate: see diameterForPercent below.
export function intensityForPercent(percent: number): number {
  return Math.sqrt(clampPercent(percent) / 100)
}

// Diameter of a character as a fraction (0.18 to 1) of the biggest possible size.
// The AREA of a circle grows with the square of its diameter, so using the square root of
// the percentage makes the area of each character proportional to its percentage:
// 50% looks twice as big as 25%, not 4x. Below about 3% the floor takes over.
export function diameterForPercent(percent: number): number {
  return Math.max(MIN_DIAMETER, intensityForPercent(percent))
}
