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
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  gap: 12px;
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
  gap: 16px;
  ${system}
`);

const Input = withTheme(styled.input`
  width: 100%;
  height: 36px;
  border: none;
  font-size: 16px;
  ${system}
`);

const Styled = {
  Wrapper,
  Profile,
  Interface,
  SearchIcon,
  InterfaceWrapper,
  Input,
};

export default Styled;
