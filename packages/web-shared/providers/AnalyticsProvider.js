import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const AnalyticsContext = createContext();

function AnalyticsProvider({ init, track, children }) {
  useEffect(() => {
    // init;
    // track('Button Clicked', { buttonColor: 'primary' });
  }, [init]);

  return <AnalyticsContext.Provider value={{}}>{children}</AnalyticsContext.Provider>;
}

export const useAnalytics = () => useContext(AnalyticsContext);

export default AnalyticsProvider;
