import styled from 'styled-components';
import { withTheme } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../../../ui-kit/Typography';
import { system } from '../../../ui-kit/_lib/system';

const Avatar = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
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

const ModalWrapper = withTheme(styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${themeGet('colors.material.ultrathin')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`);

// background-color is colors.material.chrome with 100% opacity
const ModalContent = withTheme(styled.div`
  background-color: rgba(28, 28, 30, 1);
  padding: ${themeGet('space.l')};
  margin: ${themeGet('space.base')};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 250px;
  color: white;
  box-shadow: ${themeGet('shadows.medium')};
  position: relative;
  box-sizing: border-box;
`);

const ModalIcon = withTheme(styled.div`
  align-items: center;
  background-color: ${themeGet('colors.neutral.gray')};
  opacity: 1;
  border-radius: 50%;
  display: flex;
  height: 32px;
  min-height: 32px;
  min-width: 32px;
  justify-content: center;
  line-height: 0;
  padding: 2px;
  transition: 0.2s;
  width: 32px;
  position: absolute;
  right: ${themeGet('space.l')};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  ${system};
`);

const Styled = {
  Avatar,
  List,
  Image,
  Notification,
  ModalWrapper,
  ModalContent,
  ModalIcon,
};

export default Styled;
