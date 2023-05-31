import React, { useEffect } from 'react';
import { systemPropTypes } from '../../ui-kit/_lib/system';
import Styled from './Modal.styles';
import { Box } from '../../ui-kit';
import { Searchbar } from '../../components';
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
            <Box
              width="100%"
              display="flex"
              mb="s"
              alignItems="center"
              justifyContent="space-between"
              flexDirection={{ _: 'column-reverse', sm: 'row' }}
            >
              <Box width={{ _: '0', sm: '10%' }}></Box>
              <Box
                width={{
                  _: '260px',
                  sm: '275px',
                  md: '520px',
                  lg: '700px',
                }}
                mx="auto"
                justifyContent="center"
                alignItems="center"
              >
                <Searchbar width="100%" />
              </Box>
              <Box
                width={{ _: '100%', sm: '10%' }}
                mb={{ _: 'xs', sm: '0' }}
                ml={{ _: '0', sm: 'xs' }}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Styled.Icon
                  onClick={handleCloseModal}
                  ml={{ _: 'auto', sm: '0' }}
                >
                  <X size={16} weight="bold" />
                </Styled.Icon>
              </Box>
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
