import React from 'react';

import { systemPropTypes } from '../_lib/system';
import Styled from './Longform.styles';

function Longform(props = {}) {
  return <Styled {...props} />;
}

Longform.propTypes = {
  ...systemPropTypes,
};

export default Longform;
