import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useInteractWithNode, useLivestreamStatus, useDescriptionHTML } from '../../hooks';
import { Box } from '../../ui-kit';

import { videoFilters } from '../../utils';
import { EmbededPlayer, VideoPlayer as Player } from './VideoPlayer.styles';

const PROGRESS_CHECK_INTERVAL_SECONDS = 10;

// This object is intentionally in global scope, so the video exited analytics event
// can include the right data. React destroys the state and ref data *before* it invokes
// the useEffect cleanup callback, where we send the analytics event.
const _analyticsData = {
  position: 0,
  totalLength: undefined,
};

function VideoPlayer(props = {}) {
  const previouslyReportedPlayhead = useRef(0);
  const [_interactWithNode] = useInteractWithNode();
  const parseDescriptionHTML = useDescriptionHTML();

  const { status } = useLivestreamStatus(props.parentNode);
  const isLiveStreaming = status === 'isLive';

  // Player state
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressTime, setProgressTime] = useState(0);
  const [paused, setPaused] = useState(false);

  // will find the first HLS video playlist provided
  const videoMedia = props.parentNode?.videos?.find(video => {
    const sources = videoFilters.filterVideoSources(video.sources);

    return sources.length > 0;
  });

  const userProgress = props.userProgress || { playhead: 0, complete: false };
  // Callback wrapper for more concise invocation syntax, and so we can
  // automatically keep cache in sync with new interaction data.
  const interactWithVideo = useCallback(
    (action, data) => {
      console.table(data?.progress, previouslyReportedPlayhead.current);
      if (isLiveStreaming || data?.progress === previouslyReportedPlayhead.current) {
        return null;
      }
      previouslyReportedPlayhead.current = data?.progress;

      if (videoMedia.id) {
        _interactWithNode({
          variables: {
            nodeId: videoMedia.id,
            action,
            data,
          },
          ignoreResults: true,
          update: (cache, _, { variables }) => {
            const playhead =
              variables.action === 'COMPLETE'
                ? 0
                : variables.data.find(({ field }) => field === 'progress')?.value;

            cache.modify({
              id: cache.identify({
                __typename: 'VideoMedia',
                id: variables.nodeId,
              }),
              fields: {
                userProgress(existingUserProgress) {
                  return {
                    ...existingUserProgress,
                    playhead: playhead || 0,
                  };
                },
              },
            });
          },
        });
      }
    },
    [_interactWithNode, videoMedia, isLiveStreaming],
  );

  const catchUpLivestream = () => {
    const eventStartTime = props.parentNode?.start;
    const millisecondsSinceStart = new Date() - new Date(eventStartTime);
    const livestreamCurrentTime = millisecondsSinceStart / 1000;
    playerRef.current?.seekTo(livestreamCurrentTime);
  };

  // Event Handlers
  // ------------------------------------------

  const handleVideoLoad = async evt => {
    const newDuration = Math.floor(evt.duration, 2);
    setDuration(newDuration);
    _analyticsData.totalLength = newDuration;
    if (isLiveStreaming) {
      catchUpLivestream();
    } else if (!isLiveStreaming && (!userProgress || userProgress?.complete)) {
      // If the user hasn't started watching this video yet OR they completed it...
      // Record an interaction to set their progress at 0
      interactWithVideo('VIEW', {
        progress: 0,
      });
    } else if (!isLiveStreaming && userProgress?.playhead) {
      // Else if they've started watching, and are somewhere in the middle.
      // For development, you can manually specify where to fast forward to:
      // const playhead = 1313;
      const { playhead } = userProgress;
      playerRef.current?.seekTo(playhead);
    }
  };

  const handleVideoEnded = async () => {
    interactWithVideo('COMPLETE');
    if (props.onVideoEnd instanceof Function) {
      props.onVideoEnd();
    }
  };

  const handleVideoPlayed = () => {
    if (paused) {
      setPaused(false);
    }
  };

  const handleVideoPaused = () => {
    if (!paused) {
      setPaused(true);
      interactWithVideo('VIEW', {
        progress: currentTime,
      });
    }
  };

  const handleVideoPlaybackRateChange = evt => {
    if (evt.playbackRate === 0) {
      handleVideoPaused();
    } else {
      handleVideoPlayed();
    }
  };

  const handleVideoProgress = evt => {
    const newCurrentTime = Math.floor(evt.playedSeconds);

    setCurrentTime(newCurrentTime);
    _analyticsData.position = newCurrentTime;

    // covers rewinding
    if (progressTime > currentTime) {
      setProgressTime(currentTime);
    }

    // Store the users' progress via an Interaction if enough seconds have elapsed
    if (Math.abs(currentTime - progressTime) >= PROGRESS_CHECK_INTERVAL_SECONDS) {
      setProgressTime(currentTime);

      interactWithVideo('VIEW', {
        progress: currentTime,
      });
    }
  };

  const handleVideoError = evt => {
    // eslint-disable-next-line no-console
    console.error('Video Error', evt);
  };

  const source = isLiveStreaming
    ? props.parentNode?.stream?.sources[0]?.uri
    : videoMedia?.sources[0]?.uri;

  if (props.parentNode?.videos?.embedHtml) {
    return (
      <EmbededPlayer
        {...props}
        dangerouslySetInnerHTML={{
          __html: parseDescriptionHTML(props.parentNode?.videos?.embedHtml, {
            sanitizeOptions: {
              ALLOWED_TAGS: ['iframe'],
              ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
            },
          }),
        }}
      />
    );
  } else if (source) {
    return (
      <Box position="relative" paddingTop="56.25%">
        <Player
          ref={playerRef}
          controls={true}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          onReady={handleVideoLoad}
          onPlaybackRateChange={handleVideoPlaybackRateChange}
          onProgress={handleVideoProgress}
          onPause={handleVideoPaused}
          onPlay={handleVideoPlayed}
          url={source}
          light={props.coverImage}
          width="100%"
          height="100%"
        />
      </Box>
    );
  }

  return null;
}

// type VideoMediaSource implements MediaSource
export const VideoMediaSource = PropTypes.shape({
  __typename: PropTypes.string,
  uri: PropTypes.string,
});

// type MediaUserProgress
export const MediaUserProgress = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  playhead: PropTypes.number,
  complete: PropTypes.bool,
});

// type VideoMedia implements Media
export const VideoMedia = PropTypes.shape({
  __typename: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  key: PropTypes.string,
  sources: PropTypes.arrayOf(VideoMediaSource),
  userProgress: MediaUserProgress,
  embedHtml: PropTypes.string,
});

VideoPlayer.propTypes = {
  dangerouslySetInnerHTML: PropTypes.string,
  parentNode: PropTypes.shape({
    id: PropTypes.string,
    publishDate: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string,
    videos: PropTypes.arrayOf(VideoMedia),
  }),
  onVideoEnd: PropTypes.func,
  livestream: PropTypes.shape({
    isLive: PropTypes.bool,
    eventStartTime: PropTypes.string,
    media: PropTypes.shape({
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
        }),
      ),
    }),
  }),
};

export default VideoPlayer;
