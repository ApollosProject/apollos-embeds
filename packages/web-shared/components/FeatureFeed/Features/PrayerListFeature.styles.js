import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../../../ui-kit/Typography';
import { system } from '../../../ui-kit/_lib/system';

const Avatar = withTheme(styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(103, 103, 134, 0.5);
  background-repeat: no-repeat;
  background-size: cover-contain;
  border-radius: 50%;
  cursor: pointer;
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  overflow: hidden;

  ${system}
`);

const Image = withTheme(styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  ${system}
`);

const Notification = withTheme(styled.a`
  background-color: ${(props) => props.theme.colors.base.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 3px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  ${system}
`);

const List = withTheme(styled.ul`
  display: flex;
  align-items: center;
  overflow: scroll;
  white-space: nowrap;
  width: 100%;
  gap: 8px;

  scrollbar-width: thin; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0); /* Adjust the color as needed */
  }
  ${system}
`);

const Styled = {
  Avatar,
  List,
  Image,
  Notification,
};

export default Styled;
