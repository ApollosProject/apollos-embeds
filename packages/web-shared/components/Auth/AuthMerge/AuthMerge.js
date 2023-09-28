import React, { useState, useCallback, useMemo } from 'react';

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

  const config = useMemo(
    () => ({
      defaultSelection: {
        id: 'none',
        firstName: 'None of these are me',
      },
    }),
    []
  );

  const allOptions = useMemo(() => {
    return [...(state.sharedProfiles || []), config.defaultSelection];
  }, [config.defaultSelection, state.sharedProfiles]);

  const [completeRegister] = useCompleteRegister();

  const onError = (e) => {
    setStatus('ERROR');
    setError(e);
  };

  const onSuccess = ({ birthDate, gender, firstName, lastName }) => {
    setStatus('SUCCESS');
    const needsOnboarding =
      firstName === null ||
      lastName === null ||
      gender === null ||
      birthDate === null;

    if (needsOnboarding) {
      dispatch(
        updateAuth({
          user: { birthDate, gender, firstName, lastName },
          step: authSteps.Details,
        })
      );
    } else {
      dispatch(updateAuth({ step: authSteps.Success }));
    }
  };

  const onChange = useCallback((e) => setMergeProfileId(e.target.value), []);

  const { values, handleSubmit, setFieldValue } = useForm(async () => {
    setStatus('LOADING');
    if (mergeProfileId === 'none') {
      dispatch(
        updateAuth({
          step: authSteps.Details,
        })
      );
    }
    try {
      await completeRegister({
        variables: { mergeProfileId },
        update: (
          cache,
          {
            data: {
              completeRegistration: {
                birthDate,
                gender,
                firstName,
                lastName,
              } = {},
            } = {},
          }
        ) => {
          onSuccess({ birthDate, gender, firstName, lastName });
        },
        onError,
      });
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

        {allOptions.map((item, index) => (
          <Box key={item.id} display="flex" alignItems="center" mb="s">
            <Input
              id="merge"
              type="radio"
              mr="xxs"
              key={item.id}
              value={item.id}
              checked={item.id === mergeProfileId}
              onChange={onChange}
            />
            {item.photo?.uri ? (
              <Avatar src={item.photo?.uri} alt="avatar" mr="s" />
            ) : null}
            <Box>
              <H6>{item.firstName}</H6>
              <SmallBodyText color="text.secondary">
                {item.lastName}
              </SmallBodyText>
            </Box>
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
