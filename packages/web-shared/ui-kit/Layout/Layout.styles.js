import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';

const Styled = withTheme(styled.div`
  background-color: ${themeGet('colors.fill.paper')};
  justify-content: flex-start;
  width: 100%;
  max-width: '100vw';
  height: 'auto';
  min-height: '100vh';
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  ${system}
`);

export default Styled;
