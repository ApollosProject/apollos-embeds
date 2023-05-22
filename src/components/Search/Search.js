import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../../ui-kit/_lib/system';
import { Box, Avatar } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass, X } from 'phosphor-react';
import { useCurrentUser, useSearchQuery } from '../../hooks';
import Profile from '../Profile';
import Dropdown from './Dropdown';

import { useSearchBox, useConnector } from 'react-instantsearch-hooks-web';
import Autocomplete from './Autocomplete';
import algoliasearch from 'algoliasearch/lite';

const MOBILE_BREAKPOINT = 428;
const PAGE_SIZE = 21;

const Search = (props = {}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const { currentUser } = useCurrentUser();
  const userExist = !!currentUser;
  const firstName = currentUser?.profile?.firstName || '';
  const [isMobile, setIsMobile] = useState(false);
  const { refine, query, clear } = useSearchBox();

  const [search, { loading, contentItems, fetchMore }] = useSearchQuery({
    notifyOnNetworkStatusChange: true,
  });

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
    function handleClickOutside(event) {
      if (showDropdown && !event.target.closest('#search')) {
        if (!isMobile) {
          setShowDropdown(false);
        }
        if (inputValue.trim() === '') {
          setShowTextPrompt(true);
        }
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown, inputValue, isMobile]);

  const handleClick = () => {
    if (!showDropdown) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
    setShowTextPrompt(false);
  };

  const handleX = () => {
    if (isMobile) {
      setShowDropdown(false);
      if (inputValue.trim() === '') {
        setShowTextPrompt(true);
      }
    } else {
      setInputValue('');
      clear();
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    refine(event.currentTarget.value);
    setInputValue(value);
    const dropdown = document.querySelector('#dropdown');

    if (value.trim() === '') {
      // Input is empty, do something
    } else {
      // Input is not empty, do something else
      search({
        variables: {
          query: inputValue,
          first: PAGE_SIZE,
        },
      });
    }
    if (isMobile && dropdown) {
      dropdown.scrollTop = 0;
    }
  };

  const handleProfile = () => {
    console.log('Opening Profile menu...');
    setShowProfile(!showProfile);
  };

  const searchClient = algoliasearch(
    'Z0GWPR8XBE',
    '251ec8d76f6c62ac793c1337b39bda58'
  );

  return (
    <Box
      position="relative"
      alignItems="center"
      display="flex"
      flexDirection="column"
      id="search"
      {...props}
    >
      <Styled.Wrapper dropdown={showDropdown}>
        <Styled.Interface onClick={handleClick}>
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
            <Box width="100%" height="58px" position="relative">
              <Styled.Input
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                ref={inputRef}
              />
              {/* <Autocomplete
                placeholder="Search products"
                detachedMediaQuery="none"
                searchClient={searchClient}
                onStateChange={handleInputChange}
              /> */}
              {showTextPrompt ? textPrompt : null}
            </Box>
          </Styled.InterfaceWrapper>
          {showDropdown ? (
            <Styled.X>
              <X size={18} weight="fill" onClick={handleX} />
            </Styled.X>
          ) : null}
          <Box
            px="xxs"
            onClick={() => {
              !isMobile && setShowDropdown(!showDropdown);
            }}
          >
            <CaretDown size={14} weight="fill" color="#27272E54" />
          </Box>
        </Styled.Interface>
        <Box padding="12px 12px 12px 0;" onClick={handleProfile}>
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
      {showDropdown ? (
        <Dropdown
          loading={loading}
          fetchMore={fetchMore}
          contentItems={contentItems}
          searchQuery={inputValue}
          setShowDropdown={setShowDropdown}
        />
      ) : (
        <div id="panel" style={{ display: 'none' }}></div>
      )}
      {showProfile ? <Profile handleCloseProfile={handleProfile} /> : null}
    </Box>
  );
};

Search.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Search;
