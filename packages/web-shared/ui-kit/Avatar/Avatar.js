import React from 'react';
import { withTheme } from 'styled-components';

import { Box, systemPropTypes } from '../../ui-kit';

function Avatar(props = {}) {
  return (
    <Box
      as="img"
      position="relative"
      borderRadius="round"
      overflow="hidden"
      boxShadow="medium"
      height="auto"
      width="60px"
      {...props}
    />
  );
}

Avatar.propTypes = {
  ...systemPropTypes,
};

export default withTheme(Avatar);
