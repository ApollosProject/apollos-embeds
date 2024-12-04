import React, { forwardRef, useEffect, useRef } from 'react';
import { useCurrentChurch } from '../../hooks';
import { systemPropTypes } from '../../ui-kit/_lib/system';
import Styled from './Modal.styles';
import { Box } from '../../ui-kit';
import { Searchbar } from '../../components';
import { useNavigation } from '../../providers/NavigationProvider';
import { X } from '@phosphor-icons/react';
import Wordmark from '../Wordmark';
import {
  set as setModal,
  useModal,
  close as closeModal,
  open as openModal,
} from '../../providers/ModalProvider';

function ChurchLogo(props) {
  const { currentChurch } = useCurrentChurch();

  const { origin } = window.location;

  return (
    <Wordmark source={currentChurch?.wordmarkLightUrl} padding={10} {...props} href={origin} />
  );
}

const Modal = (props = {}) => {
  const [state, dispatch] = useModal();

  console.log('Modal props: ', props);

  const ref = useRef();
  const imageRef = useRef();
  const { id, navigate } = useNavigation();

  console.log('Navigation ID: ', id);

  useEffect(() => {
    // Watch for changes to the `id` search param
    if (id) {
      dispatch(openModal());
      dispatch(setModal(id));
    }
    if (id === null) {
      dispatch(closeModal());
    }
  }, [dispatch, id]);

  function handleCloseModal() {
    dispatch(closeModal());
    // Navigate to root
    navigate();
  }

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = state.isOpen ? 'hidden' : 'auto';
  }, [state.isOpen]);

  // When the content changes, scroll to the top of the page
  useEffect(() => {
    if (state.content && ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [state.content]);

  // When the modal is open, focus on the modal
  // This is for accessibility
  useEffect(() => {
    if (ref.current && state.isOpen) {
      ref.current.focus();
    }
  }, [ref.current, state.isOpen]);

  return (
    <Box>
      <Styled.Modal className="apollos-modal" show={state.isOpen ?? false}>
        {state.content ? (
          <>
            <Styled.ModalContainer ref={ref} role="dialog" tabIndex={-1} aria-dialog={true}>
              <Box
                width="100%"
                display="flex"
                mb="base"
                alignItems="center"
                justifyContent="center"
                flexDirection={{ _: 'column-reverse', sm: 'row' }}
                maxWidth={{ _: '100%', xs: '70%' }}
              >
                <ChurchLogo
                  display="flex"
                  alignSelf="center"
                  justifyContent="center"
                  margin="20px"
                  p="s"
                  size="60px"
                  borderRadius="xl"
                  ref={imageRef}
                />
              </Box>
              <Box
                width={{ _: '100%', sm: '10%' }}
                mb={{ _: 'xs', sm: '0' }}
                ml={{ _: '0', sm: 'xs' }}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                position="absolute"
                top="xs"
                right="xs"
              >
                <Styled.Icon
                  onClick={handleCloseModal}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCloseModal();
                    }
                  }}
                  ml={{ _: 'auto', sm: '0' }}
                  tabIndex={1}
                >
                  <X size={16} weight="bold" />
                </Styled.Icon>
              </Box>
              <Box
                width="100%"
                display="flex"
                mb="base"
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{ _: 'column-reverse', md: 'row' }}
              >
                <Box width={{ _: '0', sm: '10%' }}></Box>
                <Box
                  width={{
                    _: '100%',
                    md: '700px',
                    lg: '750px',
                  }}
                  mx="auto"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Searchbar width="100%" />
                </Box>
                <Box width={{ _: '0', sm: '10%' }}></Box>
              </Box>
              <Box
                width={{
                  _: '100%',
                  md: '750px',
                  lg: '1180px',
                }}
              >
                {state.content}
              </Box>
            </Styled.ModalContainer>
          </>
        ) : null}
      </Styled.Modal>
    </Box>
  );
};

Modal.propTypes = {
  ...systemPropTypes,
};

export default Modal;
