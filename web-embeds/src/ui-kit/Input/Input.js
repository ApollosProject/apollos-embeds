import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, systemPropTypes, SystemText } from '..';
import Styled from './Input.styles';

const Input = ({ placeholder, value, handleOnChange, ...props }) => {
  const textInputRef = useRef();
  const [hasValue, setHasValue] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleChangeText = (text) => {
    const inputValue = text.target.value;
    setHasValue(inputValue.length > 0);
    handleOnChange(inputValue);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  useEffect(() => {
    setHasValue(value && value.length > 0);
  }, [value]);

  const interactionStateProps = {
    error: Boolean(props.error),
    focused,
    hasValue,
  };

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
          defaultValue={value}
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
