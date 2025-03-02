import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useInteractWithNode, useLivestreamStatus, useHTMLContent } from '../../hooks';
import { Box } from '../../ui-kit';
import { EmbededPlayer, VideoPlayer as Player } from './VideoPlayer.styles';
import amplitude from '../../analytics/amplitude';
import { useAnalytics } from '../../providers/AnalyticsProvider';
import { get } from 'lodash';

const PROGRESS_CHECK_INTERVAL_SECONDS = 10;

// This object is intentionally in global scope, so the video exited analytics event
// can include the right data. React destroys the state and ref data *before* it invokes
// the useEffect cleanup callback, where we send the analytics event.
const _analyticsData = {
  position: 0,
};

function VideoPlayer(props = {}) {
  const previouslyReportedPlayhead = useRef(0);
  const [_interactWithNode] = useInteractWithNode();
  const parseHTMLContent = useHTMLContent();
  const analytics = useAnalytics();

  const { status } = useLivestreamStatus(props.parentNode);
  const sessionId = useRef(new Date().getTime());
  const isLiveStreaming = status === 'isLive';

  // Player state
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressTime, setProgressTime] = useState(0);
  const [paused, setPaused] = useState(false);

  // will find the first HLS video playlist provided
  const hlsMedia = props.parentNode?.videos?.find(
    (video) => video.sources.length && video.sources[0].uri.includes('.m3u8')
  );
  const youtubeMedia = props.parentNode?.videos?.find(
    (video) => video.sources.length && video.sources[0].uri.includes('youtube.com')
  );
  const videoMedia = youtubeMedia || hlsMedia;

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
    [_interactWithNode, videoMedia, isLiveStreaming]
  );

  // This *could* be extracted to a local hook.
  const trackVideoEvent = useCallback(
    ({ eventName, properties }) => {
      const today = new Date();
      const livestreamProperties = isLiveStreaming
        ? {
            contentAssetId: `livestream_${today.getFullYear()}_${
              today.getMonth() + 1
            }_${today.getDate()}`,
            livestream: true,
            publishedAt: new Date(get(props, 'livestream.eventStartTime')),
          }
        : {};
      const combinedProperties = {
        sessionId: sessionId.current,
        contentAssetId: get(props, 'parentNode.id'),
        parentOriginId: get(props, 'parentNode.originId'),
        originId: get(props, 'parentNode.videos[0].originId'),
        originSource: get(props, 'parentNode.videos[0].originType'),
        videoPlayer: 'Apollos Web',
        sound: 1,
        fullScreen: true,
        livestream: false,
        timestamp: today.toUTCString(),
        title: get(props, 'parentNode.title'),
        totalLength: get(props, 'parentNode.videos[0].duration'),
        publishedAt: new Date(parseInt(get(props, 'parentNode.publishDate', '0'), 10)),
        ...livestreamProperties,
        ..._analyticsData,
        ...properties,
      };
      analytics.track(eventName, combinedProperties);
    },
    [props, amplitude, isLiveStreaming]
  );

  // Trigger VideoPlaybackExited when unmounting
  useEffect(() => {
    return () => {
      trackVideoEvent({ eventName: 'VideoPlaybackExited' });
    };
  }, []);

  const catchUpLivestream = () => {
    const eventStartTime = props.parentNode?.start;
    const millisecondsSinceStart = new Date() - new Date(eventStartTime);
    const livestreamCurrentTime = millisecondsSinceStart / 1000;
    playerRef.current?.seekTo(livestreamCurrentTime);
  };

  // Event Handlers
  // ------------------------------------------

  const handleVideoLoad = async (evt) => {
    // TODO: Is this needed? According to Apollos TV/Roku Segment Events: totalLength => Total length of the video, in seconds
    // Total length of the video is passed in with video source props: props.parentNode.videos[0].duration
    const newDuration = Math.floor(evt.duration, 2);
    // _analyticsData.totalLength = newDuration;
    setDuration(newDuration);

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
    trackVideoEvent({ eventName: 'VideoPlaybackStarted' });
  };

  const handleVideoEnded = async () => {
    interactWithVideo('COMPLETE');
    trackVideoEvent({ eventName: 'VideoPlaybackCompleted' });
    if (props.onVideoEnd instanceof Function) {
      props.onVideoEnd();
    }
  };

  const handleVideoPlayed = () => {
    if (paused) {
      setPaused(false);
      trackVideoEvent({ eventName: 'VideoPlaybackResumed' });
    }
  };

  const handleVideoPaused = () => {
    if (!paused) {
      setPaused(true);
      interactWithVideo('VIEW', {
        progress: currentTime,
      });
      trackVideoEvent({ eventName: 'VideoPlaybackPaused' });
    }
  };

  const handleVideoPlaybackRateChange = (evt) => {
    if (evt.playbackRate === 0) {
      handleVideoPaused();
    } else {
      handleVideoPlayed();
    }
  };

  const handleVideoProgress = (evt) => {
    const newCurrentTime = Math.floor(evt.playedSeconds);
    const oldCurrentTime = Math.floor(currentTime);
    _analyticsData.position = newCurrentTime;
    setCurrentTime(newCurrentTime);

    // covers rewinding
    if (progressTime > currentTime) {
      setProgressTime(currentTime);
    }

    if (Math.abs(newCurrentTime - oldCurrentTime) >= 2) {
      // If the currentTime moves more than 1 second, we know we are skipping
      setProgressTime(newCurrentTime);
      setCurrentTime(newCurrentTime);
      trackVideoEvent({
        eventName: 'VideoPlaybackSeekStarted',
        properties: { position: oldCurrentTime, seekPosition: newCurrentTime },
      });
      trackVideoEvent({ eventName: 'VideoPlaybackSeekCompleted' });
    }

    // Store the users' progress via an Interaction if enough seconds have elapsed
    if (Math.abs(currentTime - progressTime) >= PROGRESS_CHECK_INTERVAL_SECONDS) {
      setProgressTime(currentTime);

      interactWithVideo('VIEW', {
        progress: currentTime,
      });
      trackVideoEvent({ eventName: 'VideoContentPlaying' });
    }
  };

  const handleVideoError = (evt) => {
    // eslint-disable-next-line no-console
    console.error('Video Error', evt);
    trackVideoEvent({ eventName: 'VideoPlaybackInterrupted' });
  };

  const source = isLiveStreaming
    ? props.parentNode?.stream?.sources[0]?.uri
    : videoMedia?.sources[0]?.uri;

  const config = useMemo(() => {
    if (source.includes('youtube.com')) {
      return undefined;
    }
    return { file: { hlsVersion: '1.5.19' } };
  }, [source]);

  if (props.parentNode?.videos?.embedHtml) {
    return (
      <EmbededPlayer
        {...props}
        dangerouslySetInnerHTML={{
          __html: parseHTMLContent(props.parentNode?.videos?.embedHtml, {
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
          config={config}
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
        })
      ),
    }),
  }),
};

export default VideoPlayer;
