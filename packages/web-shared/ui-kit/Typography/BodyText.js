import React from 'react';

import styled, { withTheme } from 'styled-components';

import TypeStyles from './_typeStyles';
import { system, systemPropTypes } from '../_lib/system';

const Text = withTheme(styled.p`
  ${TypeStyles.BodyText}
  ${system}
`);

const BodyText = (props = {}) => <Text {...props} />;

BodyText.propTypes = {
  ...systemPropTypes,
};

export default BodyText;
