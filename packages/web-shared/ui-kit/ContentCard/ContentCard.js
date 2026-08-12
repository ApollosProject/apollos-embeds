import React, { useMemo } from 'react';

import { Check } from '@phosphor-icons/react';
import { withTheme } from 'styled-components';

import { BottomSlot, CompleteIndicator, Title, Summary, ChannelLabel } from './ContentCard.styles';
import { useVideoMediaProgress } from '../../hooks';
import { SmallBodyText, Box, systemPropTypes, ProgressBar } from '../../ui-kit';
import { getPercentWatched } from '../../utils';

function ContentCard({
  videoMedia,
  image,
  title,
  subtitle,
  summary,
  channelLabel,
  horizontal,
  onClick,
  relatedNode,
  ...props
}) {
  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress({
    variables: { id: videoMedia?.id },
    skip: !videoMedia?.id,
  });

  const format = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const finalSummary = useMemo(() => {
    let finalSummary = summary;
    if (relatedNode?.__typename === 'Event') {
      let start = relatedNode.start;
      let end = relatedNode.end;

      if (start && end) {
        start = format(start);
        end = format(end);
        if (start === end) {
          finalSummary = start;
        } else {
          finalSummary = `${start} - ${end}`;
        }
      }
    }

    return finalSummary;
  }, [relatedNode, summary]);

  const percentWatched = getPercentWatched({
    duration: videoMedia?.duration,
    userProgress,
  });

  return (
    <Box
      flex={1}
      cursor={onClick ? 'pointer' : 'default'}
      borderRadius="xl"
      overflow="hidden"
      backgroundColor="neutral.gray6"
      height="100%"
      display={horizontal ? 'flex' : ''}
      onClick={onClick}
      className="content-card"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick(e);
        }
      }}
      {...props}
    >
      <Box position="relative" width={horizontal ? '50%' : ''}>
        {/* Image */}
        <Box
          backgroundSize="cover"
          paddingBottom="56.25%"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundColor="material.regular"
          backgroundImage={`url(${image?.sources[0].uri ? image.sources[0].uri : null})`}
          height="100%"
        />
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
      <Box padding="base" backdropFilter="blur(64px)" width={horizontal ? '50%' : ''}>
        {channelLabel ? <ChannelLabel color="text.secondary">{channelLabel}</ChannelLabel> : null}
        <SmallBodyText color="text.secondary">{subtitle}</SmallBodyText>
        <Title>{title}</Title>
        <Summary color="text.secondary">{finalSummary} </Summary>
      </Box>
    </Box>
  );
}

ContentCard.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ContentCard);
