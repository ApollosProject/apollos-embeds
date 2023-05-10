import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import { Box, Avatar, Card, utils } from '../../ui-kit';
import Styled from './Search.styles';
import { User, CaretDown, MagnifyingGlass } from 'phosphor-react';
import { useCurrentUser } from '../../hooks';
import { AuthManager, Profile } from '../../components';
import { AUTH_TOKEN_KEY } from '../../config/keys';
import { Auth } from '../../embeds';

const Search = (props = {}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { currentUser } = useCurrentUser();
  const userExist = !!currentUser;
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
    setShowProfile(!showProfile);
  };

  return (
    <Box
      position="relative"
      alignItems="center"
      display="flex"
      flexDirection="column"
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
        <Styled.Dropdown>
          <Card
            p="xs"
            borderRadius={`0 0 ${utils.rem('30px')} ${utils.rem('30px')}`}
            width="520px"
            borderTop="1px solid rgba(0, 0, 0, 0.1)"
          >
            <h4>Search results</h4>
          </Card>
        </Styled.Dropdown>
      ) : null}
      {showProfile ? <Profile handleCloseProfile={handleProfile} /> : null}
    </Box>
  );
};

Search.propTypes = {
  ...systemPropTypes,
  dropdown: PropTypes.bool,
};

export default Search;
