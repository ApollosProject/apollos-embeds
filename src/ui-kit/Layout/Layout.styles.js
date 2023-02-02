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
  ${system}
`);

export default Styled;
