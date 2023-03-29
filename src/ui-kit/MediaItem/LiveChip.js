/**
 * LiveChip.js
 *
 * Displays an absolutely positioned chip that says "LIVE"
 */

import React, { useEffect, useState } from 'react';

import { SmallSystemText } from '../Typography';
import { LiveChipContainer } from './MediaItem.styles';

export const ANIMATION_DURATION = 1300;

const LiveChip = ({}) => {
  return (
    <LiveChipContainer>
      <SmallSystemText color="white">LIVE</SmallSystemText>
    </LiveChipContainer>
  );
};

export default LiveChip;
