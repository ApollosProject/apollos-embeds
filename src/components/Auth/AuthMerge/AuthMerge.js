import React, { useState, useCallback } from 'react';

import { useForm } from '../../../hooks';
import { update as updateAuth, useAuth } from '../../../providers/AuthProvider';
import {
  Avatar,
  Card,
  Box,
  Button,
  Input,
  H2,
  H5,
  H6,
  SmallBodyText,
} from '../../../ui-kit';
import authSteps from '../authSteps';
import { useCompleteRegister } from '../../../hooks';

import { Heading, SubHeading } from './AuthMerge.styles';

function AuthMerge() {
  const [status, setStatus] = useState('IDLE');
  const [error, setError] = useState(null);
  const [state, dispatch] = useAuth();
  const [mergeProfileId, setMergeProfileId] = useState();

  const [completeRegister] = useCompleteRegister();

  const onError = (e) => {
    setStatus('ERROR');
    setError(e);
  };
  const onChange = useCallback((e) => setMergeProfileId(e.target.value), []);

  const { values, handleSubmit, setFieldValue } = useForm(async () => {
    setStatus('LOADING');

    try {
      await completeRegister({ variables: { mergeProfileId } });
      dispatch(updateAuth({ step: authSteps.Details }));
    } catch (e) {
      onError();
      console.log(JSON.stringify(e));
    }
  });

  const isLoading = status === 'LOADING';

  return (
    <Box
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      overflow="scroll"
      zIndex={9999}
      justifyContent="center"
      display="flex"
      alignItems="center"
      backgroundColor="neutral.gray6"
    >
      <Card p="l" display="flex" flexDirection="column" width="440px">
        <Heading>Are any of these people you?</Heading>
        <SubHeading>
          Based on your verified phone number or email, we've matched you to an
          existing profile.
        </SubHeading>

        {state.sharedProfiles.map((item, index) => (
          <Box display="flex" alignItems="center" mb="s">
            <Input
              id="merge"
              type="radio"
              mr="xxs"
              key={item.id}
              value={item.id}
              checked={item.id === mergeProfileId}
              onChange={onChange}
            />
            <Avatar src="http://placebeard.it/250/250" alt="thing" mr="s" />
            <Box>
              <H6>{item.firstName}</H6>
              <SmallBodyText color="text.secondary">
                {item.lastName}
              </SmallBodyText>
            </Box>
            {item.photo?.uri ? (
              <img alt="avatar" src={item.photo?.uri} />
            ) : null}
          </Box>
        ))}
        <Button
          title={isLoading ? 'Submitting...' : 'Next'}
          disabled={!mergeProfileId}
          onClick={handleSubmit}
          mt="base"
        />
      </Card>
    </Box>
  );
}

export default AuthMerge;
