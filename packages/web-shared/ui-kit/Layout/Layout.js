import React from 'react';

import Styled from './Layout.styles';
import { systemPropTypes } from '../_lib/system';

function Layout(props = {}) {
  return <Styled {...props} />;
}

Layout.propTypes = {
  ...systemPropTypes,
};

export default Layout;
