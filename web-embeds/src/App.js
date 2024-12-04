import React from "react";

import { Main } from "@apollosproject/web-shared/embeds";
import { AppProvider } from "@apollosproject/web-shared/providers";
import * as Sentry from "@sentry/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

function App() {
  const searchElement = document.querySelector("[data-search-feed]");
  const churchElement = document.querySelector("[data-church]");
  const placeholderElement = document.querySelector("[data-placeholder]");
  const pathRouter = document.querySelector("[data-use-path-router]");
  const apollosIdParamElement = document.querySelector(
    "[data-apollos-id-param]"
  );

  const searchFeed = searchElement
    ? searchElement.getAttribute("data-search-feed")
    : null;
  const searchProfileSize = searchElement
    ? searchElement.getAttribute("data-search-profile-size")
    : null;
  const church = churchElement
    ? churchElement.getAttribute("data-church")
    : null;
  const customPlaceholder = placeholderElement
    ? placeholderElement.getAttribute("data-placeholder")
    : null;

  const usePathRouter = pathRouter
    ? pathRouter.getAttribute("data-use-path-router") === "true"
    : false;

  const useApollosIdParam = apollosIdParamElement
    ? apollosIdParamElement.getAttribute("data-apollos-id-param") === "true"
    : false;

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Main />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/ac/:contentId",
      element: <Main type="content" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/af/:feedId",
      element: <Main type="feed" />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <AppProvider
      church={church}
      searchFeed={searchFeed}
      searchProfileSize={searchProfileSize}
      customPlaceholder={customPlaceholder}
      usePathRouter={usePathRouter}
      useApollosIdParam={useApollosIdParam}
    >
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
