/**
 * Describes the given object using the code needed to represent it via PropTypes.
 * Does not handle `.isRequired` or advanced things like `arrayOf()`, `arrayOfType`, etc.
 * @example
    getPropTypesFromObject({ car: { make: 'Toyota', model: 'Supra' }, color: 'maroon' });
    -> "{
      car: PropTypes.shape({
        make: PropTypes.string,
        model: PropTypes.string,
      }),
      color: PropTypes.string,
    }"
 */
export default function getPropTypesFromObject(obj, indent = 1) {
  const padding = '  '.repeat(indent);
  const newLine = `${padding}\n`;

  const innerContent = Object.entries(obj)
    .map(([key, value]) => {
      let propType;
      const type = (typeof value).toLowerCase();

      switch (type) {
        case 'boolean':
          propType = 'bool';
          break;
        case 'object':
          if (value === null) {
            propType = null;
          }

          // Recurse!
          propType = `shape(${getPropTypesFromObject(value, indent + 1)})`;
          break;
        case 'string':
        case 'number':
        default:
          propType = type;
          break;
      }

      const outputValue = propType === null ? null : `PropTypes.${propType}`;

      return `${padding}${key}: ${outputValue}`;
    })
    .join(`,${newLine}`);

  return `{\n${innerContent}\n${'  '.repeat(indent - 1)}}`;
}
