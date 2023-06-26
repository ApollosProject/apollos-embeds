const UNITS_REGEX = /px|rem/gi;

function stripUnit(value) {
  return Number(value.replace(UNITS_REGEX, ''));
}

export default stripUnit;
