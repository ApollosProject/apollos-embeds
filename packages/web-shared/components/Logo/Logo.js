import React from 'react';

import { themeGet } from '@styled-system/theme-get';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Styled from './Logo.styles';
import { Box, systemPropTypes } from '../../ui-kit';

function Logo({ fill, size, padding, theme, source, ...rest }) {
  return (
    <Box backgroundColor={theme?.colors?.primary ?? ''} {...rest}>
      <Styled.Image src={source || './icon.png'} alt="Logo" size={size} fill={fill} />
    </Box>
  );
}

Logo.propTypes = {
  ...systemPropTypes,
  fill: PropTypes.string,
  size: PropTypes.number,
  source: PropTypes.string,
};

export default withTheme(Logo);
