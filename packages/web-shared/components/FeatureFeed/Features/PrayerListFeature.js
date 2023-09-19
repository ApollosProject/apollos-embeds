import React, { useState } from 'react';
import { getURLFromType } from '../../../utils';
import { systemPropTypes, Box, H3 } from '../../../ui-kit';
import Styled from './PrayerListFeature.styles';
import { Plus } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { backgroundColor, textColor } from 'styled-system';

function PrayerListFeature(props = {}) {
  console.log(props);

  function combineAndCapitalizeNames(firstName, lastName) {
    if (firstName === null && lastName === null) {
      return 'NA';
    }
    const capitalizedFirstName =
      firstName === null
        ? ''
        : firstName.charAt(0).toUpperCase() + firstName.slice(1);

    const capitalizedLastName =
      lastName === null
        ? ''
        : lastName.charAt(0).toUpperCase() + lastName.slice(1);

    const combinedNames =
      capitalizedFirstName.charAt(0) + capitalizedLastName.charAt(0);

    return combinedNames;
  }

  function randomHSLA() {
    return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
  }

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
        {AddDailyPrayer}
        {props.feature?.prayers?.map((item) => {
          const Avatar =
            item.requestor?.photo !== null ? (
              <Styled.Avatar>
                <Styled.Image src={item.requestor?.photo?.uri} />
              </Styled.Avatar>
            ) : (
              <Styled.Avatar backgroundColor={randomHSLA()}>
                <H3>
                  {combineAndCapitalizeNames(
                    item.requestor?.firstName,
                    item.requestor?.lastName
                  )}
                </H3>
              </Styled.Avatar>
            );
          return Avatar;
        })}
      </Styled.List>
    </Box>
  );
}

PrayerListFeature.propTypes = {
  ...systemPropTypes,
};

export default PrayerListFeature;
