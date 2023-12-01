import React, { createContext, useContext, useEffect, useReducer } from 'react';

const AnalyticsContext = createContext();

function AnalyticsProvider(props = {}) {
  return <AnalyticsContext.Provider value={{}}>{props.children}</AnalyticsContext.Provider>;
}

export const useAnalytics = () => useContext(AnalyticsContext);

export default AnalyticsProvider;
