import React from 'react';

import { themeGet } from '@styled-system/theme-get';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { systemPropTypes } from '../_lib/system';
import Box from '../Box';

function Dot({ fill = 'white', size = 20, theme, ...rest }) {
  const themeFillValue = themeGet(`colors.${fill}`)({ theme });
  const newFill = themeFillValue || fill;

  return (
    <Box {...rest}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${20} ${20}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={10} cy={10} r={10} fill={newFill} />
      </svg>
    </Box>
  );
}

Dot.propTypes = {
  ...systemPropTypes,
  fill: PropTypes.string,
  r: PropTypes.number,
};

export default withTheme(Dot);
