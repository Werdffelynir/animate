/**
 * Проверяет наличие значения
 * @param value         проверяемое значение
 * @param defaultValue  значение поумолчанию
 * @returns {boolean}
 */
export function isset (value, defaultValue) {
  const is = value !== undefined;
  return (defaultValue === undefined) ? is : ( is ? is : defaultValue);
}