import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, systemPropTypes, SystemText } from '..';
import Styled from './Input.styles';

const Input = ({ placeholder, ...props }) => {
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

    props.handleOnChange(text.target.value);
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
  console.log(props);
  if (props.error) {
    textInputRef.current.value = '';
  }
  return (
    <Box {...props}>
      <Box position="relative" display="flex">
        <Styled.Input
          ref={textInputRef}
          maxLength={props.maxLength}
          type={props.type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeText}
          flex="1"
          {...props}
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
  placeholder: PropTypes.string,
  handleOnChange: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  type: PropTypes.string,
  ...systemPropTypes,
};

export default Input;
