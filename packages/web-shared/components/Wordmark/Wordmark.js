import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Styled from './Wordmark.styles';

import { systemPropTypes } from '../../ui-kit';

function Wordmark({ size, source }) {

  return (
    <Styled.Image src={source || './icon.png'} alt="Logo" size={size} />
  );
}

Wordmark.propTypes = {
  ...systemPropTypes,
  size: PropTypes.number,
  source: PropTypes.string,
};

export default withTheme(Wordmark);
