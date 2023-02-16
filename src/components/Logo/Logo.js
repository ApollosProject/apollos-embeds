import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { Box, systemPropTypes } from '../../ui-kit';

const DEFAULT_ICON_SIZE = 40;
const DEFAULT_FILL = 'white';

function Logo({ fill, size, theme, ...rest }) {
  const newSize = size || DEFAULT_ICON_SIZE;
  const platformSize = newSize;

  const themeFillValue = themeGet(`colors.${fill}`)({ theme });
  const newFill = themeFillValue || fill || DEFAULT_FILL;

  return (
    <Box {...rest}>
      <svg
        width={platformSize}
        height={platformSize}
        viewBox={`0 0 ${DEFAULT_ICON_SIZE} ${DEFAULT_ICON_SIZE}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 40L15.8734 0H24.1266L39 40H1ZM19.7738 9.72716L11.9695 32.3998H28.0507L20.2464 9.72716H19.7738Z"
          fill={newFill}
        />
      </svg>
    </Box>
  );
}

Logo.propTypes = {
  ...systemPropTypes,
  fill: PropTypes.string,
  size: PropTypes.number,
};

export default withTheme(Logo);
