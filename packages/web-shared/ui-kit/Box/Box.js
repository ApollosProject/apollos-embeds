import React from 'react';

import Styled from './Box.styles';
import { systemPropTypes } from '../_lib/system';

function Box(props = {}) {
  return <Styled {...props} />;
}

Box.propTypes = {
  ...systemPropTypes,
};

export default Box;
