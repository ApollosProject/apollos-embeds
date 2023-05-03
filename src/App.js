import React from 'react';
import * as Sentry from '@sentry/react';
import { FeatureFeed, Auth } from './embeds';
import { AppProvider } from './providers';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';

// Maps a widget name to a Component to render it.
const WidgetComponentMap = {
  FeatureFeed,
  Auth,
};

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

function App(props) {
  // Lookup the component responsible for rendering this Widget
  const WidgetComponent = WidgetComponentMap[props.type];
  const router = createBrowserRouter([
    {
      path: '/',
      element: <WidgetComponent symbol={props.symbol} church={props.church} />,
      errorElement: <ErrorPage />,
    },
  ]);

  // Widgets require a church slug to get the correct data
  if (WidgetComponent && props.church) {
    return (
      <AppProvider church={props.church} modal={props.modal}>
        <RouterProvider router={router} />
      </AppProvider>
    );
  }

  // eslint-disable-next-line no-console
  console.log(`⚠️  Widget could not render widget of type "${props.type}"`);

  return null;
}

export default App;
