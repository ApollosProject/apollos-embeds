import { themeGet } from '@styled-system/theme-get';

import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { TypeStyles } from '../../../ui-kit';

const splitBoxStateStyle = ({ theme, focused }) => {
  if (focused) {
    return css`
      border-color: ${theme.colors.base.primary};
    `;
  }

  return null;
};

const splitBoxPlatformStyle = ({ theme }) => {
  return css`
    width: 80px;
    height: 80px;
  `;
};

export const SplitOTPBoxesContainer = withTheme(styled.div`
  flex-direction: row;
  align-self: center;
`);

export const SplitBoxes = withTheme(styled.div`
  background-color: ${themeGet('colors.neutral.gray6')};
  border-color: ${themeGet('colors.text.secondary')};
  border-radius: 8px;
  border-width: 2px;
  margin-right: ${themeGet('space.xs')};
  align-items: center;
  justify-content: center;

  ${splitBoxPlatformStyle}
  ${splitBoxStateStyle};
`);

export const SplitBoxText = withTheme(styled(Text)`
  ${TypeStyles.LargeSystemText}

  text-align: center;
  color: ${themeGet('colors.text.primary')};
`);

export const TextInputHidden = styled.input`
  position: absolute;
  opacity: 0;
`;
