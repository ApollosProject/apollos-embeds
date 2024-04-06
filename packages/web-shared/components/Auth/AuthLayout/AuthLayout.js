import React from 'react';
import PropTypes from 'prop-types';
import { CaretLeft, X } from '@phosphor-icons/react';

import { Box, Card, Button } from '../../../ui-kit';
import customizations from './customizations';
import { Heading, SubHeading } from './AuthLayout.styles';
import { update as updateAuth, useAuth } from '../../../providers/AuthProvider';
import authSteps from '../authSteps';

function AuthLayout(props = {}) {
  const [state, dispatch] = useAuth();

  const onGoBack = () => {
    dispatch(
      updateAuth({
        step: state.prevStep,
        prevStep: authSteps.Welcome,
      })
    );
  };

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
      <Card p="l" pt="base" display="flex" flexDirection="column" width="440px" {...props}>
        {state.prevStep === authSteps.Identity ? (
          <Button
            variant="link"
            title="Back"
            onClick={() => onGoBack()}
            alignSelf="flex-end"
            color="text.action"
            alignItems="center"
            display="flex"
            flexDirection="row-reverse"
            icon={<CaretLeft />}
          />
        ) : (
          <Button
            variant="link"
            title="Close"
            onClick={props.onClose}
            alignSelf="flex-end"
            color="text.action"
            alignItems="center"
            display="flex"
            flexDirection="row-reverse"
            icon={<X />}
          />
        )}
        <Heading>{props.heading || customizations.defaulthHeading}</Heading>
        <SubHeading>{props.subHeading || customizations.defaultSubHeading}</SubHeading>
        {props.children}
      </Card>
    </Box>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default AuthLayout;
