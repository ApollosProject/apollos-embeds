import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import { Box, Button } from '../../ui-kit';
import Styled from './ShareButton.styles';
import options from './options';
import icons from './icons';
import { Share } from 'phosphor-react';

const ShareButton = (props = {}) => {
  // Define state variable isMessageVisible with initial value false
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [copyLabel, setCopyLabel] = useState('Copy Link');

  useEffect(() => {
    // Define event listener to handle clicks outside of message
    function handleClickOutside(event) {
      // Check if message is visible and click is outside of message
      if (isMessageVisible && !event.target.closest('#menu')) {
        // If both conditions are true, hide message by updating state
        setMessageVisible(false);
      }
    }

    // Add event listener to document object
    document.addEventListener('click', handleClickOutside);

    // Remove event listener when component unmounts to avoid memory leaks
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMessageVisible]);

  const link = window.location.href;

  const copyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopyLabel('Link copied!');
        setTimeout(() => {
          setCopyLabel('Copy Link');
        }, 1500);
      })
      .catch((error) => {
        setCopyLabel('Failed to copy');
        setTimeout(() => {
          setCopyLabel('Copy Link');
        }, 1500);
      });
  };

  return (
    <Box position="relative">
      <Button
        title="Share"
        icon={<Share weight="bold" size={18} />}
        onClick={() => setMessageVisible(!isMessageVisible)}
        {...props}
      />
      {isMessageVisible && (
        <Styled.Wrapper id="menu">
          <Styled.List>
            {options.map((option) => {
              return (
                <Styled.Option onClick={() => option.onClick(link)}>
                  <Styled.Icon>{option.icon}</Styled.Icon>
                  <Styled.Label>{option.label}</Styled.Label>
                </Styled.Option>
              );
            })}
            <Styled.BorderlessOption onClick={copyLink}>
              <Styled.Icon>{icons.copy}</Styled.Icon>
              <Styled.Label>{copyLabel}</Styled.Label>
            </Styled.BorderlessOption>
          </Styled.List>
        </Styled.Wrapper>
      )}
    </Box>
  );
};

ShareButton.propTypes = {
  ...systemPropTypes,
};

export default ShareButton;
