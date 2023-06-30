import React from 'react';

import { systemPropTypes } from '../_lib/system';

import Styled from './Layout.styles';

function Layout(props = {}) {
  return <Styled {...props} />;
}

Layout.propTypes = {
  ...systemPropTypes,
};

export default Layout;
