import React from 'react';
import PropTypes from 'prop-types';

import { Box, systemPropTypes } from '../../ui-kit';

function PaginationButton(props = {}) {
  const { children, ...otherProps } = props;
  return (
    <Box
      display="flex"
      borderRadius="0"
      boxShadow="none"
      height="100%"
      alignItems="center"
      opacity={otherProps.disabled ? 0 : 1}
      cursor="pointer"
      onClick={otherProps.onClick}
      {...otherProps}
    >
      {children}
    </Box>
  );
}

PaginationButton.propTypes = {
  ...systemPropTypes,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PaginationButton;
