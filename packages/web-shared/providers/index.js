import AppProvider from './AppProvider';
import AnalyticsProvider from './AnalyticsProvider';
import BreadcrumbProvider from './BreadcrumbProvider';
import ContentFeedProvider from './ContentFeedProvider';
import ContentItemProvider from './ContentItemProvider';
import FeatureFeedProvider from './FeatureFeedProvider';
import ModalProvider from './ModalProvider';
import SearchProvider from './SearchProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  StaticRouterProvider,
  createStaticRouter,
  createStaticHandler,
} from 'react-router-dom/server';

export {
  AppProvider,
  AnalyticsProvider,
  BreadcrumbProvider,
  ContentFeedProvider,
  ContentItemProvider,
  FeatureFeedProvider,
  ModalProvider,
  SearchProvider,
  createBrowserRouter,
  RouterProvider,
  StaticRouterProvider,
  createStaticRouter,
  createStaticHandler,
};
