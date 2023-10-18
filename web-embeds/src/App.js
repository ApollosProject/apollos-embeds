import React from 'react';
import * as Sentry from '@sentry/react';
import { Main } from '@apollosproject/web-shared/embeds';
import { AppProvider } from '@apollosproject/web-shared/providers';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

function App() {
  const searchElement = document.querySelector('[data-search-feed]');
  const churchElement = document.querySelector('[data-church]');
  const customPromptElement = document.querySelector('[data-custom-prompt]');

  const searchFeed = searchElement
    ? searchElement.getAttribute('data-search-feed')
    : null;
  const church = churchElement
    ? churchElement.getAttribute('data-church')
    : null;
  const customPrompt = customPromptElement
    ? customPromptElement.getAttribute('data-custom-prompt')
    : null;

  const router = createBrowserRouter([
    {
      path: '*',
      element: <Main />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <AppProvider
      church={church}
      searchFeed={searchFeed}
      customPrompt={customPrompt}
    >
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
