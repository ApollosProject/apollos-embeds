import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../../ui-kit/Typography';
import { system } from '../../ui-kit/_lib/system';

const showDropdown = ({ dropdown }) => {
  if (dropdown) {
    return css`
      border-radius: ${themeGet('radii.xxl')} ${themeGet('radii.xxl')} 0px 0px;
      @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
        border-radius: 0px;
        position: fixed;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
      }
    `;
  } else {
    return css`
      border-radius: ${themeGet('radii.xxl')};
    `;
  }
};

const Wrapper = withTheme(styled.div`
  align-items: center;
  background: ${themeGet('colors.base.white')};
  box-shadow: ${themeGet('shadows.medium')};
  display: flex;
  height: 60px;
  justify-content: space-between;
  width: 100%;
  z-index: 9999;
  ${showDropdown}

  ${system}
`);

const TextPrompt = withTheme(styled.div`
  ${TypeStyles.BodyText}

  display: flex;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  text-overflow: ellipsis;
  top: 50%;
  transform: translate(0, -50%);
  white-space: nowrap;
  width: 100%;

  ${system}
`);

const Profile = withTheme(styled.div`
  background: ${(props) => props.theme.colors.text.action};
  border-radius: 50%;
  color: ${(props) => props.theme.colors.base.white};
  line-height: 0;
  padding: 9px;

  ${system}
`);

const SearchIcon = withTheme(styled.div`
  background: ${(props) => props.theme.colors.text.action};
  padding: 9px;
  border-radius: 50%;
  line-height: 0;
  color: ${(props) => props.theme.colors.base.white};
  ${system}
`);

const Interface = withTheme(styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${system}
`);

const InterfaceWrapper = withTheme(styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  ${system}
`);

const Input = withTheme(styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 20px;
  ${system}
`);

const X = withTheme(styled.div`
  color: #27272e54;
  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system}
`);

const Styled = {
  Wrapper,
  Profile,
  Interface,
  SearchIcon,
  InterfaceWrapper,
  Input,
  TextPrompt,
  X,
};

export default Styled;
