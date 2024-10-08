import Color from 'color';
import styled, { css, withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../Typography';
import { system } from '../_lib/system';

// Button
// --------------------------------------------------------

function darken(c, by) {
  return Color(c).darken(by).toString();
}

const buttonState = ({ theme, variant, disabled, focused, hovered, pressed }) => {
  if (disabled) {
    return css`
      opacity: 0.5;
      background: ${variant === 'secondary' ? 'transparent' : theme.colors.base.gray};
      border: ${variant === 'secondary' ? theme.colors.base.gray : 'transparent'};
      cursor: not-allowed;
    `;
  }

  if (pressed) {
    return css`
      background: ${theme.colors.base.gray};
      border: ${variant === 'secondary' ? theme.colors.fill.system : 'transparent'};
      transform: scale(0.98);
    `;
  }

  if (focused || hovered) {
    return css`
      border: transparent;
    `;
  }

  return null;
};

const webTransition = ({ theme }) => {
  return css`
    transition: all ${theme.timing.base} ease-out;
  `;
};

const buttonTypeProp = ({ theme, variant }) => {
  switch (variant) {
    default:
      return css`
        background: ${theme.colors.text.action};
        &:focus,
        &:hover {
          background: ${darken(theme.colors.text.action, 0.06)};
        }
      `;
    case 'primary':
      return css`
        background: ${theme.colors.base.primary};
        &:focus,
        &:hover {
          background: ${darken(theme.colors.text.primary, 0.06)};
        }
      `;

    case 'secondary':
      return css`
        border-width: 2px;
        border: ${theme.colors.base.secondary};
        &:focus,
        &:hover {
          border: ${darken(theme.colors.text.secondary, 0.06)};
        }
      `;
    case 'link':
      return css`
        border-width: 2px;
        background: none;
      `;
  }
};

const buttonSizeProp = ({ size, ...props }) => {
  switch (size) {
    default:
    case 'large':
      return css`
        padding: ${themeGet('space.xs')} ${themeGet('space.l')};
      `;
    case 'small':
      return css`
        padding: ${themeGet('space.xxs')} ${themeGet('space.base')};
      `;
    case 'micro':
      return css`
        padding: ${themeGet('space.xxs')} ${themeGet('space.xs')};
      `;
  }
};

const activeLink = ({ focused, hovered, pressed, variant }) => {
  if (pressed && variant === 'link') {
    return css`
      background: none;
      border: transparent;
    `;
  }

  if ((focused || hovered) && variant === 'link') {
    return css`
      background: none;
      border: transparent;
    `;
  }
  return null;
};
const buttonTypeLink = ({ variant }) => {
  if (variant === 'link') {
    return css`
      padding: 0;
    `;
  }
  return null;
};

const buttonWidth = ({ width }) => {
  return css`
    width: ${width};
  `;
};

const buttonColorState = ({ theme, variant, disabled, focused, hovered }) => {
  if (disabled) {
    return css`
      color: ${theme.colors.text.secondary};
    `;
  }

  if (focused || hovered) {
    return css`
      color: ${theme.colors.text.primary};
    `;
  }

  return null;
};

const buttonColorStateLink = ({ theme, disabled, focused, hovered, variant }) => {
  if (disabled && variant === 'link') {
    return css`
      color: ${theme.colors.text.secondary};
    `;
  }

  if ((focused || hovered) && variant === 'link') {
    return css`
      color: ${theme.colors.text.primary};
    `;
  }

  return null;
};

const buttonColorTypeProp = ({ variant }) => {
  switch (variant) {
    default:
      return css`
        color: ${themeGet('colors.fill.paper')};
      `;
    case 'primary':
      return null;

    case 'secondary':
      return css`
        color: ${themeGet('colors.text.secondary')};
      `;
    case 'link':
      return css`
        color: ${themeGet('colors.text.action')};
      `;
  }
};

const Button = withTheme(styled.button`
  border-width: 2px;
  text-align: center;
  border: transparent;
  border-radius: ${themeGet('radii.xl')};
  cursor: pointer;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  ${buttonTypeProp}
  ${webTransition}
  ${buttonState}
  ${buttonSizeProp}
  ${buttonTypeLink}
  ${activeLink}
  ${buttonWidth}
  ${buttonColorTypeProp}
  ${buttonColorState}
  ${buttonColorStateLink}
  ${system}
`);

// Title
// --------------------------------------------------------

const titleSizeProp = ({ size }) => {
  switch (size) {
    default:
    case 'large':
      return css`
        ${TypeStyles.SystemText}
      `;
    case 'small':
      return css`
        ${TypeStyles.SmallSystemText}
      `;
    case 'micro':
      return css`
        ${TypeStyles.SmallSystemText}
      `;
  }
};

const Title = withTheme(styled.span`
  ${titleSizeProp}
  color: inherit;
  font-weight: 600;
  ${system}
`);

const Content = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${themeGet('space.xxs')};
  ${system}
`);

const Icon = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${system}
`);

export default {
  Button,
  Title,
  Content,
  Icon,
};
