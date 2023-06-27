import { withTheme, css } from 'styled-components';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';

const center = ({ centered }) => {
  if (centered) {
    return css`
      justify-content: center;
    `;
  }
  return null;
};

const firstChildRule = () => {
  return css`
    > *:first-child {
      margin-right: ${themeGet('space.s')};
    }
  `;
};

const Loader = withTheme(styled.div`
  align-items: center;
  display: flex;
  color: ${themeGet('colors.text.primary')};
  height: 100vh;

  ${firstChildRule}
  ${center}
  ${system}
`);

export default Loader;
