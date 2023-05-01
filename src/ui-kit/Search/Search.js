import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import { Box, Button } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass } from 'phosphor-react';
import { useCurrentUser } from '../../hooks';

const Search = (props = {}) => {
  const { currentUser } = useCurrentUser();
  const firstName = currentUser?.profile?.firstName;
  console.log(currentUser);
  return (
    <Styled.Wrapper>
      <Styled.Interface>
        <Styled.InterfaceWrapper>
          <Styled.SearchIcon>
            <MagnifyingGlass size={18} weight="bold" />
          </Styled.SearchIcon>
          <Styled.Input
            onFocus={() => console.log('FOCUS')}
            onBlur={() => console.log('BLUR')}
          />
        </Styled.InterfaceWrapper>
        <CaretDown size={9} weight="bold" />
      </Styled.Interface>
      <Styled.Profile>
        <User size={18} color="white" weight="bold" />
      </Styled.Profile>
    </Styled.Wrapper>
  );
};

Search.propTypes = {
  ...systemPropTypes,
};

export default Search;
