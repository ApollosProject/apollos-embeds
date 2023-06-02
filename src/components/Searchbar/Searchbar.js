import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../../ui-kit/_lib/system';
import { Box, Avatar } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass, X } from 'phosphor-react';
import { useCurrentUser } from '../../hooks';
import Profile from '../Profile';

import Autocomplete from '../Searchbar/Autocomplete';

const MOBILE_BREAKPOINT = 428;

const Searchbar = (props = {}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(true);
  const [autocompleteState, setAutocompleteState] = React.useState({
    activeItemId: null,
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    status: 'idle',
  });
  const { currentUser } = useCurrentUser();
  const userExist = !!currentUser;
  const firstName = currentUser?.profile?.firstName || '';
  const [isMobile, setIsMobile] = useState(false);

  const textWelcome =
    firstName === '' ? (
      <strong>Hey!&nbsp;</strong>
    ) : (
      <strong>Hey {firstName}!&nbsp; </strong>
    );

  const textPrompt = (
    <Styled.TextPrompt>
      {!isMobile ? textWelcome : null}

      <span
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '150px',
        }}
      >
        Find what's next
      </span>
    </Styled.TextPrompt>
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }

    handleResize(); // set initial state based on screen size
    window.addEventListener('resize', handleResize); // listen for screen size changes

    return () => {
      window.removeEventListener('resize', handleResize); // cleanup
    };
  }, []);

  useEffect(() => {
    if (autocompleteState.isOpen) {
      setShowTextPrompt(false);
    }
  }, [autocompleteState.isOpen]);

  const handleProfile = () => {
    console.log('Opening Profile menu...');
    setShowProfile(!showProfile);
  };

  return (
    <Box
      position="relative"
      alignItems="center"
      display="flex"
      flexDirection="column"
      id="search"
      {...props}
    >
      <Styled.Wrapper dropdown={autocompleteState.isOpen}>
        <Styled.Interface>
          <Styled.InterfaceWrapper>
            <Box padding="12px">
              <Styled.SearchIcon>
                <MagnifyingGlass
                  size={18}
                  weight="bold"
                  color={userExist ? 'white' : null}
                />
              </Styled.SearchIcon>
            </Box>
            <Box width="100%">
              <Autocomplete
                autocompleteState={autocompleteState}
                setAutocompleteState={setAutocompleteState}
                setShowTextPrompt={setShowTextPrompt}
              />
              {showTextPrompt ? textPrompt : null}
            </Box>
          </Styled.InterfaceWrapper>
        </Styled.Interface>
        <Box padding="12px" onClick={handleProfile}>
          {currentUser?.profile?.photo?.uri ? (
            <Avatar
              src={currentUser?.profile?.photo?.uri}
              width="38px"
              alt="avatar"
            />
          ) : (
            <Styled.Profile>
              <User
                size={18}
                weight="bold"
                color={userExist ? 'white' : null}
              />
            </Styled.Profile>
          )}
        </Box>
      </Styled.Wrapper>

      {showProfile ? <Profile handleCloseProfile={handleProfile} /> : null}
    </Box>
  );
};

Searchbar.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Searchbar;
