'use client';
import React from 'react';
import * as Sentry from '@sentry/react';
import { FeatureFeed } from '@apollosproject/web-shared/embeds';
import {
  AppProvider,
  createBrowserRouter,
  RouterProvider,
} from '@apollosproject/web-shared/providers';

import { Button, Box, BodyText } from '@apollosproject/web-shared/ui-kit';
import { Logo } from '@apollosproject/web-shared/components';
import { useCurrentChurch } from '@apollosproject/web-shared/hooks';
import Styled from './App.styles';

import ErrorPage from './error-page';
import { parseSlugToIdAndType } from '@apollosproject/web-shared/utils';
import { getChurchSlug } from './utils';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

function ChurchLogo(props) {
  const { currentChurch } = useCurrentChurch();
  return <Logo source={currentChurch?.logo} {...props} />;
}

function App({ searchParams, url }) {
  const churchSlug = getChurchSlug(url);
  const _root = searchParams?.root;

  const { type, randomId } = parseSlugToIdAndType(_root) ?? {};

  const ssr = typeof document === 'undefined';

  const mainRoute = (
    <Styled.FeedWrapper>
      <FeatureFeed featureFeed={`${type}:${randomId}`} church={churchSlug} />
    </Styled.FeedWrapper>
  );

  const routerConfig = [
    {
      path: '/',
      element: mainRoute,
      errorElement: <ErrorPage />,
    },
  ];

  const router = ssr ? null : createBrowserRouter(routerConfig);

  // Widgets require a church slug to get the correct data
  if (churchSlug) {
    return (
      <AppProvider church={churchSlug} modal="true">
        <ChurchLogo display="flex" alignItems="center" justifyContent="center" marginTop="40px" />
        {/** When using SSR, avoid the router. it crashes */}
        {ssr ? mainRoute : <RouterProvider router={router} />}
      </AppProvider>
    );
  }

  // eslint-disable-next-line no-console
  console.log(`⚠️  Feature Feed could not render feed of id ${searchParams?.root}`);

  return (
    <AppProvider>
      <Styled.Main
        pt={{ _: 'base', md: 'xl' }}
        px={{ _: 'base', md: 'xl' }}
        display="flex"
        flexDirection={{ _: 'column', md: 'row' }}
        m={{ _: 's', md: 'l' }}
        alignItems="center"
      >
        <Styled.Content>
          <Styled.Title mb="base">
            Discover <br />
            <span>Apollos Preview</span>
          </Styled.Title>
          <BodyText>
            Ready to experience the dynamic features of an Apollos feed or app? Head over to the
            Apollos Admin for your exclusive access link.
          </BodyText>
          <Button mt="l" justifySelf="center" title="Start ->" onClick={() => {}} />
        </Styled.Content>
        <Box>
          <Box as="img" src={'./apollos-mock-up.png'} />
        </Box>
      </Styled.Main>
    </AppProvider>
  );
}

export default App;
