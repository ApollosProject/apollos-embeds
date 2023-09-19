import React from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box, Avatar } from '../../../ui-kit';
import Styled from './PrayerListFeature.styles';
import { Plus } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

function PrayerListFeature(props = {}) {
  console.log(props);

  const AddDailyPrayer = (
    <Box position="relative" display="inline-block" padding="2px 5px">
      <Styled.Avatar>
        <Plus size={36} />
      </Styled.Avatar>
      <Styled.Notification />
    </Box>
  );
  return (
    <Box>
      <Styled.List>
        {/* This should be a lis that scrolls horizontially */}
        {AddDailyPrayer}
        {props.feature?.prayers?.map((item) => {
          return (
            <Styled.Avatar>
              <Styled.Image src={item.requestor?.photo?.uri} />
            </Styled.Avatar>
          );
        })}

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
