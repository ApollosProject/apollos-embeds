import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, systemPropTypes, SystemText } from '..';
import Styled from './Input.styles';

const Input = ({ placeholder }, ...props) => {
  const textInputRef = useRef();
  const [hasValue, setHasValue] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleChangeText = (text) => {
    if (text?.length === 0 && hasValue) {
      setHasValue(false);
    }

    if (text?.length >= 1 && !hasValue) {
      setHasValue(true);
    }

    props.onChange(text);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const interactionStateProps = {
    error: Boolean(props.error),
    focused,
    hasValue,
  };

  return (
    <Box {...props}>
      <Box position="relative" display="flex">
        <Styled.Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeText}
          ref={textInputRef}
          flex="1"
        />

        <Styled.Label {...interactionStateProps}>{placeholder}</Styled.Label>
      </Box>
      {props.error && (
        <SystemText color="base.alert" mt="xxs">
          {props.error}
        </SystemText>
      )}
    </Box>
  );
};

Input.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  ...systemPropTypes,
};

export default Input;
