/**
 * filterVideoSources.js
 *
 * description
 */

import * as Sentry from '@sentry/react';

/* This currently doesn't handle the case where the domain contains 'youtube' as part of the name
 * (eg). https://definitelynotyoutube.com/watch=?blah
 *  - this will get blocked as well
 */
const youtubeRegex = new RegExp(
  /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)/
);

const filterVideoSources = (sources) => {
  if (!Array.isArray(sources)) {
    return [];
  }

  return sources.filter((source) => {
    const uri = source?.uri;
    if (!uri || typeof uri !== 'string') {
      Sentry.captureMessage(`Invalid uri of ${uri} included in video sources`);
      return false;
    }

    return !uri.match(youtubeRegex);
  });
};

const hasValidVideoMedia = (videos) =>
  videos
    ?.map((video) => filterVideoSources(video?.sources)?.length)
    .some((validVideoCount) => validVideoCount);

export { filterVideoSources, hasValidVideoMedia };
