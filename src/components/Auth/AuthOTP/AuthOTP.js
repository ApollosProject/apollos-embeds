import React, { useEffect, useRef, useState } from 'react';

import { Box, SystemText } from '../../../ui-kit';
import {
  SplitBoxes,
  SplitBoxText,
  SplitOTPBoxesContainer,
  TextInputHidden,
} from './AuthOTP.styles';

interface Props {
  code: String;
  codeLength: Number;
  error: String;
  isPinReady: Boolean;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setIsPinReady: React.Dispatch<React.SetStateAction<Boolean>>;
}

const AuthOTP = (props: Props) => {
  const inputRef = useRef();
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const boxInputs = new Array(props.codeLength).fill(0);
  const boxDigit = (_, index) => {
    const digit = props?.code[index] || '';

    const isCurrentValue = index === props.code.length - 1;
    const isCodeComplete = props.code.length === props.codeLength;
    const isValueFocused = isCurrentValue || (isCurrentValue && isCodeComplete);

    const splitBoxFocused = isInputBoxFocused && isValueFocused;

    return (
      <SplitBoxes key={index} focused={splitBoxFocused}>
        <SplitBoxText>{digit}</SplitBoxText>
      </SplitBoxes>
    );
  };

  useEffect(() => {
    props.setIsPinReady(props.code.length === props.codeLength);

    return () => {
      props.setIsPinReady(false);
    };
  }, [props.code, props]);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    props.setCode('');
    inputRef.current.focus();
  };

  const handleOnFocus = () => {
    setIsInputBoxFocused(true);
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  return (
    <Box>
      <SplitOTPBoxesContainer
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onClick={handleOnPress}
        underlayColor={'transparent'}
      >
        <>{boxInputs.map(boxDigit)}</>
      </SplitOTPBoxesContainer>
      <TextInputHidden
        id="code"
        placeholder="Enter code"
        maxLength={props.codeLength}
        keyboardType="numeric"
        value={props.code}
        onChangeText={props.setCode}
        ref={inputRef}
        mb="base"
        mt="l"
      />
      <Box alignSelf="center">
        {props.error && (
          <SystemText color="base.alert" mt="xxs">
            {props.error}
          </SystemText>
        )}
      </Box>
    </Box>
  );
};

export default AuthOTP;
