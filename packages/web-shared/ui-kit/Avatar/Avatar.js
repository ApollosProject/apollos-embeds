import React from 'react';

import { User } from '@phosphor-icons/react';
import { withTheme } from 'styled-components';

import { Box, systemPropTypes } from '../../ui-kit';

function Avatar(props = {}) {
  return (
    <Box
      as={props.src ? 'img' : undefined}
      backgroundColor="fill.system"
      position="relative"
      borderRadius="round"
      overflow="hidden"
      boxShadow="medium"
      width="60px"
      height={props.width || '60px'}
      {...props}
    >
      {!props.src ? (
        props.firstName && props.lastName ? (
          <Box
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="text.secondary"
          >
            {props.firstName[0]}
            {props.lastName[0]}
          </Box>
        ) : (
          <User size={16} weight="bold" />
        )
      ) : null}
    </Box>
  );
}

Avatar.propTypes = {
  ...systemPropTypes,
};

export default withTheme(Avatar);
