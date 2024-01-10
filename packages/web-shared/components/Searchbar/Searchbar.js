import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { User, MagnifyingGlass, ArrowLeft } from 'phosphor-react';

import { systemPropTypes } from '../../ui-kit/_lib/system';
import { Box, Avatar } from '../../ui-kit';
import { useCurrentUser } from '../../hooks';
import { useSearchState } from '../../providers/SearchProvider';

import Profile from '../Profile';
import Autocomplete from '../Searchbar/Autocomplete';

import Styled from './Search.styles';

const MOBILE_BREAKPOINT = 428;

const Searchbar = (props = {}) => {
  const searchState = useSearchState();
  const [showProfile, setShowProfile] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(true);
  const [autocompleteInstance, setAutocompleteInstance] = useState(null);
  const [autocompleteState, setAutocompleteState] = useState({
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
    firstName === '' ? <strong>Hey!&nbsp;</strong> : <strong>Hey {firstName}!&nbsp; </strong>;

  const textPrompt = searchState.customPlaceholder ? (
    <Styled.TextPrompt>
      <Box
        as="span"
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        width={{
          _: '225px',
          sm: '400px',
        }}
      >
        {searchState.customPlaceholder}
      </Box>
    </Styled.TextPrompt>
  ) : (
    <Styled.TextPrompt>
      {!isMobile ? textWelcome : null}

      <Box
        as="span"
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        width={{
          _: '225px',
          sm: '400px',
        }}
      >
        What can we help you find?
      </Box>
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

  const handleOpenProfile = () => {
    setShowProfile(true);
  };
  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleGetAutocompleteInstance = (instance) => {
    setAutocompleteInstance(instance);
  };

  const handleClick = () => {
    if (isMobile && autocompleteState.isOpen) {
      autocompleteInstance.setIsOpen(false);
      autocompleteInstance.setQuery('');
      setShowTextPrompt(true);
    }
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
            <Box padding="12px" onClick={handleClick}>
              <Styled.SearchIcon>
                {isMobile && autocompleteState.isOpen ? (
                  <ArrowLeft size={18} weight="bold" color={userExist ? 'white' : null} />
                ) : (
                  <MagnifyingGlass size={18} weight="bold" color={userExist ? 'white' : null} />
                )}
              </Styled.SearchIcon>
            </Box>
            <Box width="100%">
              <Autocomplete
                autocompleteState={autocompleteState}
                setAutocompleteState={setAutocompleteState}
                setShowTextPrompt={setShowTextPrompt}
                getAutocompleteInstance={handleGetAutocompleteInstance}
              />
              {showTextPrompt ? textPrompt : null}
            </Box>
          </Styled.InterfaceWrapper>
        </Styled.Interface>
        <Box padding="12px" onClick={handleOpenProfile}>
          {currentUser?.profile?.photo?.uri ? (
            <Avatar src={currentUser?.profile?.photo?.uri} width="38px" alt="avatar" />
          ) : (
            <Styled.Profile>
              <User size={18} weight="bold" color={userExist ? 'white' : null} />
            </Styled.Profile>
          )}
        </Box>
      </Styled.Wrapper>

      {showProfile ? <Profile handleCloseProfile={handleCloseProfile} /> : null}
    </Box>
  );
};

Searchbar.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Searchbar;
