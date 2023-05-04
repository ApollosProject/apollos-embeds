import Color from 'color';
import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../Typography';
import { system } from '../_lib/system';

const showDropdown = ({ dropdown }) => {
  if (dropdown) {
    return css`
      border-radius: 39px 39px 0px 0px;
    `;
  } else {
    return css`
      border-radius: 39px;
    `;
  }
};

const Wrapper = withTheme(styled.div`
  width: 100%;
  height: 60px;
  background: #ffffff;
  ${showDropdown}
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background: #17b582;
  padding: 9px;
  border-radius: 50%;
  line-height: 0;
  ${system}
`);

const Interface = withTheme(styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${system}
`);

const SearchIcon = withTheme(styled.div`
  background: #17b582;
  padding: 9px;
  border-radius: 50%;
  line-height: 0;
  ${system}
`);

const InterfaceWrapper = withTheme(styled.div`
  width: 100%;
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
  width: 100%;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: none;
  display: flex;
  border-radius: 0px 0px 39px 39px;
  height: 60px;
  ${system}
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
