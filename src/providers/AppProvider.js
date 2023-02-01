import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';

import client from '../client';
import { ThemeProvider } from '../ui-kit';
import BreakpointProvider from './BreakpointProvider';

function AppProvider(props = {}) {
  return (
    <ApolloProvider client={client} {...props}>
      <BreakpointProvider>
        <ThemeProvider>{props.children}</ThemeProvider>
      </BreakpointProvider>
    </ApolloProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  client: PropTypes.shape({}),
  customTheme: PropTypes.shape({}),
};

export default AppProvider;
