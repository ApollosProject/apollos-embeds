import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import { Box, Button } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass } from 'phosphor-react';
import { useCurrentUser } from '../../hooks';

const Search = (props = {}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { currentUser } = useCurrentUser();
  const firstName = currentUser?.profile?.firstName || '';

  const textPrompt = (
    <Styled.TextPrompt>
      {firstName === '' ? (
        <strong>Hey!</strong>
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

  return (
    <Box>
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
        <Box padding="12px">
          <Styled.Profile>
            <User size={18} color="white" weight="bold" />
          </Styled.Profile>
        </Box>
      </Styled.Wrapper>
      {showDropdown ? <Styled.Dropdown></Styled.Dropdown> : null}
    </Box>
  );
};

Search.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Search;
