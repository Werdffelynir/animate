
/**
 * Create special object to indicate a rectangle
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {[*,*,*,*]}
 */
export function Rectangle (x = 0, y = 0, width = 100, height = 100) {
  const rect = [x, y, width, height];
  rect['x'] = x;
  rect['y'] = y;
  rect['width'] = width;
  rect['height'] = height;
  return rect;
}
