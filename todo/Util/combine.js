/**
 * Marge objects
 * @param defaultObject
 * @param object
 * @returns {*}
 */
export function combine (defaultObject, object) {
  for (let key in object) {
    defaultObject[key] = object[key]
  }
  return defaultObject
}