import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Styled from './Logo.styles';

import { Box, systemPropTypes } from '../../ui-kit';

function Logo({ fill, size, padding, theme, source, ...rest }) {
  let themeData = '';
  try {
    themeData = JSON.parse(theme);
  } catch (error) {
    console.error('Error parsing JSON');
  }

  return (
    <Box {...rest}>
      <Styled.Image
        src={source || './icon.png'}
        alt="Logo"
        size={size}
        fill={fill}
        padding={padding}
        backgroundColor={themeData?.colors?.primary ?? ''}
      />
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
