/**
 * Numeric value that our units are calculated based on.
 */
export const BASE_UNIT = 4;

/**
 * Options for formatting the return value of your unit calculation.
 */
export const UnitFormats = {
  NUMBER: 'number',
  PX: 'px',
};

/**
 * Calculates a spacing unit by multiplying an input from our base unit
 * @param {number} multiplier
 * @param {string} [format="number"] - Sets the format of the return value (either "number" or "px")
 * @returns {number|string}
 */
export default function unit(multiplier, format = UnitFormats.NUMBER) {
  if (typeof multiplier !== 'number') {
    throw new TypeError("[unit] 'multiplier' must be a number");
  }

  if (!Object.values(UnitFormats).includes(format)) {
    throw new TypeError(
      `[unit] 'format' must be ${Object.values(UnitFormats).join(
        ' or '
      )}. Consider using UnitFormats instead of passing in a raw string.`
    );
  }

  if (multiplier === 0) {
    console.warn(
      "[unit] multiplying by 0 will just return 0, so there's no need to use this method to do so"
    );
  }

  const value = multiplier * BASE_UNIT;

  if (format === UnitFormats.PX) {
    return `${value}px`;
  }

  return value;
}
