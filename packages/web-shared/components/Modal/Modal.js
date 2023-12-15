import React, { useEffect } from 'react';
import { useCurrentChurch } from '../../hooks';
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
import {
  reset as resetBreadcrumb,
  useBreadcrumbDispatch,
} from '../../providers/BreadcrumbProvider';
import { X } from 'phosphor-react';
import Logo from '../Logo';

function ChurchLogo(props) {
  const { currentChurch } = useCurrentChurch();
  return <Logo source={currentChurch?.logo} theme={currentChurch?.theme} padding={10} {...props} />;
}

const Modal = (props = {}) => {
  const [state, dispatch] = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatchBreadcrumb = useBreadcrumbDispatch();

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
    setSearchParams('');
    dispatchBreadcrumb(resetBreadcrumb());
  }

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = state.isOpen ? 'hidden' : 'auto';
  }, [state.isOpen]);

  return (
    <Box>
      <Styled.Modal show={state.isOpen}>
        {state.content ? (
          <>
            <Styled.ModalContainer>
              <Box
                width="100%"
                display="flex"
                mb="s"
                alignItems="flex-start"
                justifyContent="space-between"
                flexDirection={{ _: 'column-reverse', sm: 'row' }}
              >
                <Box width={{ _: '0', sm: '10%' }}></Box>
                <ChurchLogo
                  display="flex"
                  alignSelf="center"
                  justifyContent="center"
                  margin="20px"
                  p="s"
                  size="60px"
                  borderRadius="xl"
                />
                <Box
                  width={{ _: '100%', sm: '10%' }}
                  mb={{ _: 'xs', sm: '0' }}
                  ml={{ _: '0', sm: 'xs' }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Styled.Icon onClick={handleCloseModal} ml={{ _: 'auto', sm: '0' }}>
                    <X size={16} weight="bold" />
                  </Styled.Icon>
                </Box>
              </Box>
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
                    _: '100%',
                    md: '700px',
                    lg: '900px',
                  }}
                  mx="auto"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Searchbar width="100%" />
                </Box>
                <Box width={{ _: '0', sm: '10%' }}></Box>
              </Box>
              <Breadcrumbs />
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
