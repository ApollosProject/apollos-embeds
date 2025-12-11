import { themeGet } from '@styled-system/theme-get';
import styled, { css, withTheme } from 'styled-components';

import { system } from '../_lib/system';

const Box = withTheme(styled.div`
  transition: all ${themeGet('timing.base')} ease-out;
  ${system}
`);

export default Box;
