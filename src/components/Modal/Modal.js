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
  useEffect(() => {
    // Define event listener to handle clicks outside of modal
    function handleClickOutside(event) {
      // Check if modal is visible and click is outside of modal
      if (state.isOpen && !event.target.closest('#modal')) {
        // If both conditions are true, hide modal by updating state
        handleCloseModal();
      }
    }

    // Add event listener to document object
    document.addEventListener('click', handleClickOutside);

    // Remove event listener when component unmounts to avoid memory leaks
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [state.isOpen]);

  function handleCloseModal() {
    dispatch(closeModal());
  }

  return (
    <Box>
      {state.isOpen ? (
        <Styled.Modal>
          <Styled.ModalContainer id="modal">
            <Box onClick={handleCloseModal}>Buttons</Box>
            {state.content}
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
