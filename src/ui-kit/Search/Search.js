import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import { Box, Button } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass } from 'phosphor-react';
import { useCurrentUser } from '../../hooks';

const Search = (props = {}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser } = useCurrentUser();
  const firstName = currentUser?.profile?.firstName;
  // console.log(currentUser);

  const handleInputFocus = () => {
    setShowDropdown(true);
    console.log('focus');
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
    console.log('blur');
  };

  return (
    <Box>
      <Styled.Wrapper dropdown={showDropdown}>
        <Styled.Interface>
          <Styled.InterfaceWrapper>
            <Styled.SearchIcon>
              <MagnifyingGlass size={18} weight="bold" color="white" />
            </Styled.SearchIcon>
            <Styled.Input onFocus={handleInputFocus} onBlur={handleInputBlur} />
          </Styled.InterfaceWrapper>
          <CaretDown size={9} weight="bold" />
        </Styled.Interface>
        <Styled.Profile>
          <User size={18} color="white" weight="bold" />
        </Styled.Profile>
      </Styled.Wrapper>
      {showDropdown ? <Box>Hello</Box> : null}
    </Box>
  );
};

Search.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Search;
