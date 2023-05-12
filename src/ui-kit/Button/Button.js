import React from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import Styled from './Button.styles';

const Button = ({ onClick, backgroundColor, ...props }) => {
  return (
    <Styled.Button
      disabled={props.disabled}
      onClick={onClick}
      backgroundColor={backgroundColor}
      {...props}
    >
      <Styled.Content flexDirection={props.flexDirection}>
        <Styled.Title disabled={props.disabled} size={props.size}>
          {props.title}
        </Styled.Title>
        <Styled.Icon>{props?.icon}</Styled.Icon>
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

Button.defaultProps = {
  size: 'large',
  // eslint-disable-next-line no-console
  onClick: () => console.log('Please attach a method to this component'),
  icon: null,
};

export default Button;
