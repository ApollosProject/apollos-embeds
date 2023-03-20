import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';

import client from '../client';
import { ThemeProvider } from '../ui-kit';
import AuthProvider from './AuthProvider';
import BreadcrumbProvider from './BreadcrumbProvider';

function AppProvider(props = {}) {
  return (
    <ApolloProvider client={client(props.church)} {...props}>
      <AuthProvider>
        <BreadcrumbProvider>
          <ThemeProvider>{props.children}</ThemeProvider>
        </BreadcrumbProvider>
      </AuthProvider>
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
