import React from 'react';

import { Check } from '@phosphor-icons/react';
import isNil from 'lodash/isNil';
import { withTheme } from 'styled-components';

import LiveChip from './LiveChip';
import { Title, Image, BottomSlot, CompleteIndicator, Ellipsis } from './MediaItem.styles';
import { useVideoMediaProgress, useLivestreamStatus } from '../../hooks';
import { BodyText, SmallBodyText, Box, H4, systemPropTypes, ProgressBar } from '../../ui-kit';
import { unit, getPercentWatched } from '../../utils';

function MediaItem(props = {}) {
  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress({
    variables: { id: props.videoMedia?.id },
    skip: !props.videoMedia?.id,
  });

  const percentWatched = getPercentWatched({
    duration: props.videoMedia?.duration,
    userProgress,
  });

  const { status } = useLivestreamStatus(props.relatedNode);

  return (
    <Box
      flex={1}
      cursor={props.onClick ? 'pointer' : 'default'}
      height="100%"
      display={props.horizontal ? 'flex' : ''}
      {...props}
    >
      <Box position="relative" width={props.horizontal ? '50%' : ''}>
        {/* Image */}
        <Box
          backgroundColor="material.regular"
          backgroundImage={`url(${
            props.image?.sources[0].uri ? props.image.sources[0].uri : null
          })`}
          backgroundPosition="center"
          backgroundSize="cover"
          borderRadius="xl"
          height="100%"
          overflow="hidden"
          paddingBottom="56.25%"
        />
        {status ? (
          <Box position="absolute" top={unit(4)} left={unit(4)} zIndex={1}>
            <LiveChip status={status} />
          </Box>
        ) : null}
        {/* Progress / Completed Indicators */}
        <BottomSlot>
          {userProgress?.complete ? (
            <CompleteIndicator color="fill.paper" alignSelf="flex-end">
              <Check size={18} />
            </CompleteIndicator>
          ) : null}

          {percentWatched > 0 ? <ProgressBar percent={percentWatched} /> : null}
        </BottomSlot>
      </Box>
      {/* Masthead */}
      <Box
        marginTop={unit(2)}
        background="material.regular"
        backdropFilter="blur(64px)"
        width={props.horizontal ? '50%' : ''}
      >
        <H4>
          <Ellipsis>{props.title}</Ellipsis>
        </H4>
      </Box>
    </Box>
  );
}

MediaItem.propTypes = {
  ...systemPropTypes,
};

export default withTheme(MediaItem);
