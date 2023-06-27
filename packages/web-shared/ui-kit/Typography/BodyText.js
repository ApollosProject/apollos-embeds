import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import { system, systemPropTypes } from '../_lib/system';

import TypeStyles from './_typeStyles';

const Text = withTheme(styled.p`
  ${TypeStyles.BodyText}
  ${system}
`);

const BodyText = (props = {}) => <Text {...props} />;

BodyText.propTypes = {
  ...systemPropTypes,
};

export default BodyText;
