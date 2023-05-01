import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system } from '../../ui-kit/_lib/system';

const Modal = withTheme(styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
  ${system};
`);

const ModalContainer = withTheme(styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 30px;
  overflow-y: scroll;
  padding: 20px;
  ${system};
`);

const Styled = {
  Modal,
  ModalContainer,
};

export default Styled;
