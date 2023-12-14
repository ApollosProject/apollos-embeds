import { useEffect } from 'react';

import amplitude from '../../analytics/amplitude';

const TrackEventWhenLoaded = ({ loading, eventName, properties }) => {
  useEffect(() => {
    if (!loading) {
      // NOTE: This component usually gets rendered twice, which can potentially cause events to be tracked twice.
      amplitude.trackEvent({ eventName, properties });
    }
  }, [loading]);

  return null;
};

export default TrackEventWhenLoaded;
