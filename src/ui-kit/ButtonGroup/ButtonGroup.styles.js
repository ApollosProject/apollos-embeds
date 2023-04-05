import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../_lib/system';
const ButtonGroup = withTheme(styled.div`
  padding-top: 10px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  gap: 20px;
  ${system};
`);

const Button = withTheme(styled.button`
  background: ${themeGet('colors.neutral.gray6')};
  padding: 10px;
  border-radius: 50%;
  border: 0;
  line-height: 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${themeGet('colors.neutral.gray5')};
  }
`);

const Styled = {
  ButtonGroup,
  Button,
};

export default Styled;
