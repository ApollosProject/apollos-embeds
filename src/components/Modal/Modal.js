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
import { X } from 'phosphor-react';

const Modal = (props = {}) => {
  const [state, dispatch] = useModal();

  function handleCloseModal() {
    dispatch(closeModal());
  }

  return (
    <Box>
      {state.isOpen ? (
        <Styled.Modal onClick={handleCloseModal}>
          <Styled.ModalContainer onClick={(e) => e.stopPropagation()}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="end"
              mb="s"
            >
              <Styled.Icon onClick={handleCloseModal}>
                <X size={16} weight="bold" />
              </Styled.Icon>
            </Box>
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
