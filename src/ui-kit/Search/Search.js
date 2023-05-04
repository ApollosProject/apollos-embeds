import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import { Box, Button } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass } from 'phosphor-react';
import { useCurrentUser } from '../../hooks';
import { first } from 'lodash';
import { te } from 'date-fns/locale';

const Search = (props = {}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { currentUser } = useCurrentUser();
  const firstName = currentUser?.profile?.firstName || '';

  const textPrompt = (
    <Styled.TextPrompt>
      {firstName === '' ? (
        <Box>
          <strong>Hey!</strong>
        </Box>
      ) : (
        <Box>
          <strong>Hey {firstName}!&nbsp; </strong>
        </Box>
      )}
      <Box>Find what's next</Box>
    </Styled.TextPrompt>
  );

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
        <Styled.Interface>
          <Styled.InterfaceWrapper>
            <Styled.SearchIcon>
              <MagnifyingGlass size={18} weight="bold" color="white" />
            </Styled.SearchIcon>
            <Box width="100%" position="relative">
              <Styled.Input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={inputValue}
              />
              {showTextPrompt ? textPrompt : null}
            </Box>
          </Styled.InterfaceWrapper>
          <CaretDown size={9} weight="bold" />
        </Styled.Interface>
        <Styled.Profile>
          <User size={18} color="white" weight="bold" />
        </Styled.Profile>
      </Styled.Wrapper>
      {showDropdown ? <Styled.Dropdown>Hello</Styled.Dropdown> : null}
    </Box>
  );
};

Search.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Search;
