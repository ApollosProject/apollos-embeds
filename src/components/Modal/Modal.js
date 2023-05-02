import React, { useState, useEffect } from 'react';
import { systemPropTypes } from '../../ui-kit/_lib/system';
import Styled from './Modal.styles';
import {
  Box,
  H1,
  H2,
  H4,
  Loader,
  Longform,
  H3,
  MediaItem,
  BodyText,
  ShareButton,
} from '../../ui-kit';

import { close as closeModal, useModal } from '../../providers/ModalProvider';

const Modal = (props = {}) => {
  const [state, dispatch] = useModal();

  function handleCloseModal() {
    dispatch(closeModal());
  }

  console.log('modal', state);

  return (
    <Box>
      {state.isOpen ? (
        <Styled.Modal onClick={handleCloseModal}>
          <Styled.ModalContainer onClick={(e) => e.stopPropagation()}>
            <Box onClick={handleCloseModal}>Buttons</Box>
            <Box width="100%">{state.content}</Box>
          </Styled.ModalContainer>
        </Styled.Modal>
      ) : null}
    </Box>
  );
};

Modal.propTypes = {
  ...systemPropTypes,
};

export default Modal;
