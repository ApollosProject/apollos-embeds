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

const buttonState = ({ theme, type, disabled }) => {
  return css`
    &:hover {
      opacity: 0.5;
      background: ${themeGet('colors.fill.system1')};
    }
    &:disabled {
      opacity: 0.5;
      background: ${type === 'secondary'
        ? 'transparent'
        : theme.colors.fill.system1};
      border: ${type === 'secondary' ? theme.colors.base.gray : 'transparent'};
      cursor: not-allowed;
    }
    &:hover &:disabled {
      opacity: 0.5;
      background: ${themeGet('colors.fill.system1')};
    }
  `;
};

const Button = withTheme(styled.button`
  opacity: 0.8;
  background: ${themeGet('colors.fill.system1')};
  padding: 10px;
  border-radius: 50%;
  border: 0;
  line-height: 0;
  cursor: pointer;
  transition: 0.2s;

  ${buttonState}
`);

const Styled = {
  ButtonGroup,
  Button,
};

export default Styled;
