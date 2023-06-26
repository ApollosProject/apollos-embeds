import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Styled from './Logo.styles';

import { Box, systemPropTypes } from '../../ui-kit';

function Logo({ fill, size, theme, ...rest }) {
  return (
    <Box {...rest}>
      <Styled.Image src="./icon.png" alt="Logo" size={size} fill={fill} />
    </Box>
  );
}

Logo.propTypes = {
  ...systemPropTypes,
  fill: PropTypes.string,
  size: PropTypes.number,
};

export default withTheme(Logo);
