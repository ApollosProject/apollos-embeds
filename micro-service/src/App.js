import React from 'react';
import * as Sentry from '@sentry/react';
import { FeatureFeed } from '@apollosproject/web-shared/embeds';
import { AppProvider } from '@apollosproject/web-shared/providers';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

function App(props) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <FeatureFeed
          featureFeed={'FeatureFeed:5aae43e6-3526-4cd2-8dfe-771d2ce8a333'}
          church={'cedar_creek'}
        />
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  // Widgets require a church slug to get the correct data
  if ('cedar_creek') {
    return (
      <AppProvider
        church={'cedar_creek'}
        modal="true"
        searchFeed={'FeatureFeed:33b34f30-e57c-4c23-9f28-24d31959a3f4'}
      >
        <RouterProvider router={router} />
      </AppProvider>
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    `⚠️  Feature Feed could not render feed of id "FeatureFeed:5aae43e6-3526-4cd2-8dfe-771d2ce8a333"`
  );

  return <p>Micro Service</p>;
}

export default App;
