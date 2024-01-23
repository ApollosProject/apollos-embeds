import { useEffect } from 'react';

import { useAnalytics } from '../../providers/AnalyticsProvider';

const TrackEventWhenLoaded = ({ loading, eventName, properties }) => {
  const analytics = useAnalytics();
  useEffect(() => {
    if (!loading) {
      // NOTE: This component usually gets rendered twice, which can potentially cause events to be tracked twice.
      analytics.track(eventName, properties);
    }
  }, [loading]);

  return null;
};

export default TrackEventWhenLoaded;
