import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import { Box, Button } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass } from 'phosphor-react';
import { useCurrentUser } from '../../hooks';
import { AuthManager } from '../../components';
import { AUTH_TOKEN_KEY } from '../../config/keys';
import { Auth } from '../../embeds';

const Search = (props = {}) => {
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { currentUser } = useCurrentUser();
  const firstName = currentUser?.profile?.firstName || '';

  const textPrompt = (
    <Styled.TextPrompt>
      {firstName === '' ? (
        <strong>Hey!&nbsp;</strong>
      ) : (
        <strong>Hey {firstName}!&nbsp; </strong>
      )}
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

  const inputRef = useRef(null);

  const handleClick = () => {
    if (!showDropdown) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
    setShowTextPrompt(false);
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
    if (inputValue.trim() === '') {
      setShowTextPrompt(true);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      // Input is empty, do something
      console.log('empty');
      console.log(value);
    } else {
      // Input is not empty, do something else
      console.log(value);
    }
  };

  const handleProfile = () => {
    console.log('Opening Profile menu...');
    setShowAuth(!showAuth);
  };

  return (
    <Box position="relative">
      <Styled.Wrapper dropdown={showDropdown}>
        <Styled.Interface onClick={handleClick}>
          <Styled.InterfaceWrapper>
            <Box padding="12px">
              <Styled.SearchIcon>
                <MagnifyingGlass size={18} weight="bold" color="white" />
              </Styled.SearchIcon>
            </Box>
            <Box width="100%" height="58px" position="relative">
              <Styled.Input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={inputValue}
                ref={inputRef}
              />
              {showTextPrompt ? textPrompt : null}
            </Box>
          </Styled.InterfaceWrapper>
          <CaretDown size={14} weight="fill" color="#27272E54" />
        </Styled.Interface>
        <Box padding="12px" onClick={handleProfile}>
          <Styled.Profile>
            {/* TODO: When there is a user profile image, add conditional to check if user profile image exists and use that instead */}
            <User size={18} color="white" weight="bold" />
          </Styled.Profile>
        </Box>
      </Styled.Wrapper>
      {showDropdown ? <Styled.Dropdown></Styled.Dropdown> : null}
      {/* TODO: Move Auth to signup modal in profile. Currently here just to have some way of logging in until merge */}
      {showAuth ? <Auth /> : null}
    </Box>
  );
};

Search.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Search;
