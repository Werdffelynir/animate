/**
 * Create special object to indicate a point
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
export function Point (x = 0, y = 0) {
  const point = [x, y];
  point['x'] = x;
  point['y'] = y;
  return point;
}
