/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
export function random (min, max) {
  min = min || 0;
  max = max || 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
}