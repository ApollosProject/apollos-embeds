/* eslint-disable react/prop-types */
import React from 'react';
import { Box, SmallBodyText } from '../../ui-kit';

export default function DevVideoDetails({
  parentNode,
  videoMedia,
  paused,
  currentTime,
  duration,
  progressTime,
}) {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      p="s"
      bg="rgba(0,0,0,0.15)"
      pointerEvents="none"
    >
      <SmallBodyText>
        <SmallBodyText fontWeight="bold">parentNode.id:</SmallBodyText>
        {`\n${parentNode.id}`}
      </SmallBodyText>
      <SmallBodyText>
        <SmallBodyText fontWeight="bold">parentNode.title:</SmallBodyText>
        {`\n${parentNode.title}`}
      </SmallBodyText>
      <SmallBodyText>
        <SmallBodyText fontWeight="bold">videoMedia.id:</SmallBodyText>
        {`\n${videoMedia.id}\n`}
      </SmallBodyText>
      <SmallBodyText>
        <SmallBodyText fontWeight="bold">paused:</SmallBodyText>{' '}
        {paused.toString()}
      </SmallBodyText>
      <SmallBodyText>
        <SmallBodyText fontWeight="bold">currentTime:</SmallBodyText>{' '}
        {currentTime}
      </SmallBodyText>
      <SmallBodyText>
        <SmallBodyText fontWeight="bold">progressTime:</SmallBodyText>{' '}
        {progressTime}
      </SmallBodyText>
      <SmallBodyText>
        <SmallBodyText fontWeight="bold">duration:</SmallBodyText> {duration} (
        {Math.round(duration / 60)}min)
      </SmallBodyText>
    </Box>
  );
}
