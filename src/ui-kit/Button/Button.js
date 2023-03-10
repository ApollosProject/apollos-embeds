import React from 'react';
import PropTypes from 'prop-types';

import { systemPropTypes } from '../_lib/system';
import Styled from './Button.styles';

const Button = ({ onClick, ...props }) => {
  return (
    <Styled.Button disabled={props.disabled} onClick={onClick} {...props}>
      {props?.icon}
      <Styled.Title disabled={props.disabled} {...props}>
        {props.title}
      </Styled.Title>
    </Styled.Button>
  );
};

Button.propTypes = {
  ...systemPropTypes,
  size: PropTypes.oneOf(['micro', 'small', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary', 'link']),
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
