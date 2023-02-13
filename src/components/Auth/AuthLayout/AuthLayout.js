import React from 'react';
import PropTypes from 'prop-types';

import { Box, Card } from '../../../ui-kit';
import customizations from './customizations';
import { Heading, SubHeading } from './AuthLayout.styles';

function AuthLayout(props = {}) {
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
      <Card
        p="l"
        display="flex"
        flexDirection="column"
        width="440px"
        {...props}
      >
        <Heading>{props.heading || customizations.defaulthHeading}</Heading>
        <SubHeading>
          {props.subHeading || customizations.defaultSubHeading}
        </SubHeading>
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
