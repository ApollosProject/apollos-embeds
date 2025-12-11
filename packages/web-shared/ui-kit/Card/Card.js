import React from 'react';

import { withTheme } from 'styled-components';

import { Box, systemPropTypes } from '../../ui-kit';

function ContentCard(props = {}) {
  return (
    <Box
      position="relative"
      backgroundColor="fill.paper"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="medium"
      {...props}
    >
      {props.children}
    </Box>
  );
}

ContentCard.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ContentCard);
