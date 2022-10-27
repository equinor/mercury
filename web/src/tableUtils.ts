/**
 * format a number to scientific notation.
 *
 * @param {number} number - Number to format
 * @param {number} precision - number of significant digits in scientific notation
 * @param {number} threshold - limit on when to convert a number to scientific notation
 * @returns {string} number formatted in scientific notation
 */
export function formatNumber(
  number: number,
  precision = 4,
  threshold = 4
): string {
  if (number < 1 / 10 ** (threshold - 1) || number > 10 ** threshold) {
    return number.toExponential(precision).replace('e', 'E')
  } else {
    // Set precision to given number of digits
    return number.toPrecision(precision).toString()
  }
}

export function getCorrectUnit(phase: string): string {
  return phase === 'Vapor' ? ' μg/Sm3' : ' μg/kg'
}
