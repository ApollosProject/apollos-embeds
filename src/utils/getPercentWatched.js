import round from 'lodash/round';
import isNil from 'lodash/isNil';

// Given a VideoMedia node, return a percentage between 0–1 representing how much
// of the video the current user has watched. Return null if we don't know the
// video duration, or the user hasn't started the video.
export default function getUserPercentComplete({ duration, userProgress }) {
  const playhead = userProgress?.playhead;
  const hasPlayhead = !isNil(playhead);
  const hasDuration = !isNil(duration);

  if (hasPlayhead && hasDuration) {
    return round(playhead / duration, 2);
  }

  return null;
}
