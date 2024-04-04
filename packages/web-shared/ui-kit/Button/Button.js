import React from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import Styled from './Button.styles';

// eslint-disable-next-line no-console
const Button = ({
  onClick = () => console.log('Please attach a method to this component'),
  size = 'large',
  backgroundColor,
  ...props
}) => {
  return (
    <Styled.Button
      disabled={props.disabled}
      onClick={onClick}
      backgroundColor={backgroundColor}
      size={size}
      {...props}
    >
      <Styled.Content flexDirection={props.flexDirection}>
        {props.title ? (
          <Styled.Title disabled={props.disabled} size={size}>
            {props.title}
          </Styled.Title>
        ) : null}
        {props.icon ? <Styled.Icon>{props?.icon}</Styled.Icon> : null}
      </Styled.Content>
    </Styled.Button>
  );
};

Button.propTypes = {
  ...systemPropTypes,
  size: PropTypes.oneOf(['micro', 'small', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'link']),
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
