/**
 * LiveChip.js
 *
 * Displays an absolutely positioned chip that says "LIVE"
 */

import React from 'react';

import { LiveChipContainer } from './MediaItem.styles';
import { SmallSystemText } from '../Typography';

export const ANIMATION_DURATION = 1300;

const LiveChip = (props) => {
  return (
    <LiveChipContainer {...props}>
      <SmallSystemText fontWeight="700" color="white">
        {props.status === 'isLive' ? 'LIVE' : 'COMING UP'}
      </SmallSystemText>
    </LiveChipContainer>
  );
};

export default LiveChip;
