import React from 'react';

import Styled from './Longform.styles';
import { systemPropTypes } from '../_lib/system';

function Longform(props = {}) {
  return <Styled {...props} />;
}

Longform.propTypes = {
  ...systemPropTypes,
};

export default Longform;
