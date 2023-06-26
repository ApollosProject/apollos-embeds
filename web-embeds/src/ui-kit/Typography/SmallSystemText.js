import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const SmallSystemText = withTheme(styled.p`
  ${TypeStyles.SmallSystemText}
  ${system}
`);

SmallSystemText.propTypes = {
  ...systemPropTypes,
};

export default SmallSystemText;
