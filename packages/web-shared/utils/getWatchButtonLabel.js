import isNil from 'lodash/isNil';

export default function getWatchButtonLabel(userProgress) {
  // In progress
  if (!isNil(userProgress?.playhead)) {
    return 'Continue Watching';
  }

  // Complete
  if (userProgress?.complete) {
    return 'Watch again';
  }

  // Default (hasn't started, or unexpected case)
  return 'Watch now';
}
