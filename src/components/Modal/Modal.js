import React, { useEffect } from 'react';
import { systemPropTypes } from '../../ui-kit/_lib/system';
import Styled from './Modal.styles';
import { Box, Search } from '../../ui-kit';
import Breadcrumbs from '../Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import {
  open as openModal,
  close as closeModal,
  set as setModal,
  useModal,
} from '../../providers/ModalProvider';
import { X } from 'phosphor-react';

const Modal = (props = {}) => {
  const [state, dispatch] = useModal();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Watch for changes to the `id` search param
    if (searchParams.get('id')) {
      dispatch(openModal());
      dispatch(setModal(searchParams.get('id')));
    }
    if (searchParams.get('id') === null) {
      dispatch(closeModal());
    }
  }, [dispatch, searchParams]);

  function handleCloseModal() {
    dispatch(closeModal());
  }

  return (
    <Box>
      {state.isOpen ? (
        <Styled.Modal>
          <Styled.ModalContainer>
            <Box width="100%" display="flex" alignItems="center" mb="s">
              <Search flex="1" width="100%" />
              <Styled.Icon onClick={handleCloseModal}>
                <X size={16} weight="bold" />
              </Styled.Icon>
            </Box>
            <Breadcrumbs />
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
