import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';

import client from '../client';
import { init, track } from '../analytics/amplitude';
import { ThemeProvider } from '../ui-kit';
import AuthProvider from './AuthProvider';
import AnalyticsProvider from './AnalyticsProvider';
import BreadcrumbProvider from './BreadcrumbProvider';
import ModalProvider from './ModalProvider';
import SearchProvider from './SearchProvider';

function AppProvider(props = {}) {
  const analyticsClients = useMemo(
    () => [{ track: amplitude.trackEvent, identify: amplitude.init }],
    []
  );
  const church = Config.APOLLOS_CHURCH_SLUG || 'apollos_demo';

  return (
    <ApolloProvider client={client(props.church)} {...props}>
      <AuthProvider>
        <AnalyticsProvider init={init} track={track} church={props.church}>
          <SearchProvider
            church={props.church}
            searchFeed={props.searchFeed}
            customPlaceholder={props.customPlaceholder}
          >
            <BreadcrumbProvider>
              <ModalProvider>
                <ThemeProvider>{props.children}</ThemeProvider>
              </ModalProvider>
            </BreadcrumbProvider>
          </SearchProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
  client: PropTypes.shape({}),
  customTheme: PropTypes.shape({}),
};

export default AppProvider;
