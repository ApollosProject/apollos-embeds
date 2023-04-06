/**
 * LiveChip.js
 *
 * Displays an absolutely positioned chip that says "LIVE"
 */

import React from 'react';

import { SmallSystemText } from '../Typography';
import { LiveChipContainer } from './MediaItem.styles';

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
