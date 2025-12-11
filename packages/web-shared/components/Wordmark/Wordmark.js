import React from 'react';

import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import Styled from './Wordmark.styles';
import { systemPropTypes } from '../../ui-kit';

function Wordmark({ size, source, href, ref }) {
  if (href) {
    return (
      <a href={href} ref={ref}>
        <Styled.WrappedImage
          className="wordmark"
          src={source || './icon.png'}
          alt="Logo"
          size={size}
        />
      </a>
    );
  }

  return <Styled.Image className="wordmark" src={source || './icon.png'} alt="Logo" size={size} />;
}

Wordmark.propTypes = {
  ...systemPropTypes,
  size: PropTypes.string,
  source: PropTypes.string,
};

export default withTheme(Wordmark);
