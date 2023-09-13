import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box } from '../../../ui-kit';
import Styled from './PrayerListFeature.styles';
import { Plus } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

function PrayerListFeature(props = {}) {
  console.log(props);
  return (
    <Box>
      <Styled.List>
        {/* This should be a lis that scrolls horizontially */}
        <Box position="relative" display="inline-block" padding="2px 5px">
          <Styled.Avatar>
            <Plus size={36} />
          </Styled.Avatar>
          <Styled.Notification></Styled.Notification>
        </Box>
        <Styled.Avatar></Styled.Avatar>
        <Styled.Avatar></Styled.Avatar>
        <Styled.Avatar></Styled.Avatar>
        <Styled.Avatar></Styled.Avatar>
      </Styled.List>
    </Box>
  );
}

PrayerListFeature.propTypes = {
  ...systemPropTypes,
};

export default PrayerListFeature;
