import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MagnifyingGlass, ArrowLeft } from '@phosphor-icons/react';
import { themeGet } from '@styled-system/theme-get';

import { systemPropTypes } from '../../ui-kit/_lib/system';
import { Box } from '../../ui-kit';
import { useCurrentUser } from '../../hooks';
import { useSearchState } from '../../providers/SearchProvider';

import Autocomplete from '../Searchbar/Autocomplete';
import SearchResults from '../Searchbar/SearchResults';

import ProfileButton from '../Profile/ProfileButton';

import Styled from './Search.styles';

const MOBILE_BREAKPOINT = 428;

const Searchbar = (props = {}) => {
  const searchState = useSearchState();
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
  const [scrollPosition, setScrollPosition] = useState(0);

  const textWelcome = (
    // 0.35ch works out visually to be the width of a &nbsp;
    <strong style={{ marginRight: '0.35ch' }}>Hey{firstName !== '' ? ` ${firstName}` : ''}!</strong>
  );

  const placeholderWidth = isMobile ? { width: '400px' } : { width: '225px' };

  const textPrompt = searchState.customPlaceholder ? (
    <Styled.TextPrompt>
      <Box
        as="span"
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          ...placeholderWidth,
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
          ...placeholderWidth,
        }}
      >
        What are you looking for?
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

  useEffect(() => {
    if (isMobile && autocompleteState.isOpen) {
      // Save the current scroll position
      setScrollPosition(window.scrollY);

      // Set body to fixed position to prevent scrolling
      document.body.style.position = 'fixed';
    } else {
      // Restore body to normal position
      document.body.style.position = '';

      // Restore the scroll position
      window.scrollTo(0, scrollPosition);
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.position = '';
    };
  }, [autocompleteState.isOpen, scrollPosition, isMobile]);

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
        <Box display="flex" flexDirection="row" h="60px" w="100%">
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
          <Box p={16}>
            <ProfileButton />
          </Box>
        </Box>
        <SearchResults autocompleteState={autocompleteState} autocomplete={autocompleteInstance} />
      </Styled.Wrapper>
    </Box>
  );
};

Searchbar.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Searchbar;
