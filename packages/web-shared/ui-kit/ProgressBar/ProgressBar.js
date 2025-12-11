import React from 'react';

import PropTypes from 'prop-types';

import { Container, Bar } from './ProgressBar.styles';
import { systemPropTypes } from '../_lib/system';

function ProgressBar(props = {}) {
  return (
    <Container {...props}>
      <Bar percent={props.percent} />
    </Container>
  );
}

ProgressBar.propTypes = {
  ...systemPropTypes,
  percent: PropTypes.number,
};

ProgressBar.defaultProps = {};

export default ProgressBar;
