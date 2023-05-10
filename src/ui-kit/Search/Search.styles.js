import Color from 'color';
import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../Typography';
import { system } from '../_lib/system';

const showDropdown = ({ dropdown }) => {
  if (dropdown) {
    return css`
      border-radius: 30px 30px 0px 0px;
    `;
  } else {
    return css`
      border-radius: 30px;
    `;
  }
};

const Wrapper = withTheme(styled.div`
  align-items: center;
  background: #ffffff;
  display: flex;
  height: 60px;
  justify-content: space-between;
  width: 520px;
  box-shadow: ${themeGet('shadows.medium')};
  margin-bottom: ${themeGet('space.s')};

  ${showDropdown}

  ${system}
`);

const TextPrompt = withTheme(styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 17px;
  ${system}
`);

const Profile = withTheme(styled.div`
  background: ${(props) => props.theme.colors.text.action};
  padding: 9px;
  border-radius: 50%;
  line-height: 0;
  color: ${(props) => props.theme.colors.base.white};
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

const Dropdown = withTheme(styled.div`
  display: flex;
  top: 60px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
  position: absolute;
`);

const Styled = {
  Wrapper,
  Profile,
  Interface,
  SearchIcon,
  InterfaceWrapper,
  Input,
  Dropdown,
  TextPrompt,
};

export default Styled;
