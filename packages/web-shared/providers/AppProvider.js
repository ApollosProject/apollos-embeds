import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';

import initClient from '../client';
import { ThemeProvider } from '../ui-kit';
import AuthProvider from './AuthProvider';
import AnalyticsProvider from './AnalyticsProvider';
import ModalProvider from './ModalProvider';
import SearchProvider from './SearchProvider';

const UseApollosIdParamContext = createContext(false);

export const useApollosIdParam = () => useContext(UseApollosIdParamContext);

const ShouldUsePathRouter = createContext(false);

export const useShouldUsePathRouter = () => useContext(ShouldUsePathRouter);

function AppProvider(props = {}) {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const initialize = async () => {
      const client = await initClient(props.church);
      setClient(client);
    };
    initialize();
  }, [props.church]);

  if (!client) {
    return null;
  }

  return (
    <UseApollosIdParamContext.Provider value={props.useApollosIdParam}>
      <ShouldUsePathRouter.Provider value={props.usePathRouter}>
        <ApolloProvider client={client} {...props}>
          <AuthProvider>
            <AnalyticsProvider church={props.church}>
              <SearchProvider
                church={props.church}
                searchFeed={props.searchFeed}
                searchProfileSize={props.searchProfileSize}
                customPlaceholder={props.customPlaceholder}
              >
                <ModalProvider>
                  <ThemeProvider>{props.children}</ThemeProvider>
                </ModalProvider>
              </SearchProvider>
            </AnalyticsProvider>
          </AuthProvider>
        </ApolloProvider>
      </ShouldUsePathRouter.Provider>
    </UseApollosIdParamContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
  client: PropTypes.shape({}),
  customTheme: PropTypes.shape({}),
};

export default AppProvider;
