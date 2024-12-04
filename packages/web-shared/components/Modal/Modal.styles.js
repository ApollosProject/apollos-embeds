import { withTheme } from 'styled-components';
import styled, { css, keyframes } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../../ui-kit/_lib/system';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Define a keyframe animation for sliding out
const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const Modal = withTheme(styled.div`
  width: 100%;
  height: 100%;
  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    height: 100vh;
  }
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${(props) => (props?.show ? slideIn : slideOut)} 0.3s ease-in-out;
  transform: translateY(${(props) => (props?.show ? '0' : '100%')});
  ${system};
`);

const ModalContainer = withTheme(styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  overflow-y: scroll;
  padding: 40px;
  box-sizing: border-box;
  @media screen and (max-width: ${themeGet('breakpoints.sm')}) {
    padding: 16px;
  }
  position: relative;
  ${system};
`);

const Icon = withTheme(styled.div`
  align-items: center;
  background-color: #ffffff;
  background: rgba(242, 242, 247, 0.8);
  border-radius: 50%;
  display: flex;
  height: 32px;
  min-height: 32px;
  min-width: 32px;
  justify-content: center;
  line-height: 0;
  padding: 8px;
  transition: 0.2s;
  width: 32px;

  &:hover {
    color: ${themeGet('colors.base.secondary')};
    cursor: pointer;
  }
  ${system};
`);

const Styled = {
  Modal,
  ModalContainer,
  Icon,
};

export default Styled;
