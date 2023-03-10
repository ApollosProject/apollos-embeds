import clamp from 'lodash/clamp';
import floor from 'lodash/floor';
import isNil from 'lodash/isNil';

// Given a VideoMedia node, return a percentage between 0–1 representing how much
// of the video the current user has watched. Return null if we don't know the
// video duration, or the user hasn't started the video.
export default function getUserPercentComplete({ duration, userProgress }) {
  const playhead = userProgress?.playhead;
  const hasPlayhead = !isNil(playhead);
  const hasDuration = !isNil(duration);

  if (hasPlayhead && hasDuration) {
    return clamp(floor(playhead / duration, 2), 0, 1);
  }

  return null;
}
