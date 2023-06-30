import isNil from 'lodash/isNil';

/**
 * Returns a human friendly string like "1h 5m".
 * @example
    getDurationString(0) // --> ""
    getDurationString(45) // --> "45s"
    getDurationString(59) // --> "59s"
    getDurationString(60) // --> "1m"
    getDurationString(65) // --> "1m 5s"
    getDurationString(90) // --> "1m 30s"
    getDurationString(195) // --> "3m 15s"
    getDurationString(360) // --> "6m"
    getDurationString(404) // --> "6m 44s"
    getDurationString(512) // --> "8m 32s"
    getDurationString(3500) // --> "58m 20s"
    getDurationString(3600) // --> "1h"
    getDurationString(3940) // --> "1h 5m"
 */
export default function getDurationString(seconds) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const secondsRemainder = seconds % 60;
  const minutesRemainder = minutes % 60;

  const secondsString = secondsRemainder ? `${secondsRemainder}s` : null;
  const minutesString = minutesRemainder ? `${minutesRemainder}m` : null;
  const hoursString = hours ? `${hours}h` : null;

  const output = [hoursString, minutesString, secondsString]
    .filter((value) => !isNil(value))
    .slice(0, 2) // Only show up to 2 unit values (h/m or m/s)
    .join(' ')
    .trim();

  return output;
}

// "Testing"
// [0, 45, 59, 60, 65, 90, 195, 360, 404, 512, 3500, 3600, 3940].forEach((val) =>
//   console.log(`getDurationString(${val}) // "${getDurationString(val)}"`)
// );
