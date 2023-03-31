import React from 'react';
import { withTheme } from 'styled-components';
import isNil from 'lodash/isNil';
import { Check } from 'phosphor-react';
import { unit } from '../../utils';

import {
  BodyText,
  SmallBodyText,
  Box,
  H4,
  systemPropTypes,
  ProgressBar,
} from '../../ui-kit';
import { useVideoMediaProgress } from '../../hooks';
import { getPercentWatched } from '../../utils';
import {
  Title,
  Image,
  BottomSlot,
  CompleteIndicator,
  Ellipsis,
} from './MediaItem.styles';
import LiveChip from './LiveChip';
import { useLivestreamIsActive } from '../../hooks';
function MediaItem(props = {}) {
  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress(
    {
      variables: { id: props.videoMedia?.id },
      skip: !props.videoMedia?.id,
    }
  );

  const percentWatched = getPercentWatched({
    duration: props.videoMedia?.duration,
    userProgress,
  });

  const isLive = useLivestreamIsActive(props.relatedNode);

  return (
    <Box
      flex={1}
      m={'0 10px'}
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
          boxShadow="medium"
          height="100%"
          overflow="hidden"
          paddingBottom="56.25%"
        />
        {isLive ? (
          <Box position="absolute" top={unit(4)} left={unit(4)} zIndex={1}>
            <LiveChip />
          </Box>
        ) : null}
        {/* Progress / Completed Indicators */}
        <BottomSlot>
          {userProgress?.complete ? (
            <CompleteIndicator alignSelf="flex-end">
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
        backdrop-filter="blur(64px)"
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
