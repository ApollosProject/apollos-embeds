import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const SmallBodyText = withTheme(styled.p`
  ${TypeStyles.SmallBodyText}
  ${system}
`);

SmallBodyText.propTypes = {
  ...systemPropTypes,
};

export default SmallBodyText;
