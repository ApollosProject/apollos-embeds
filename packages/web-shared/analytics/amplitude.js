import * as amplitude from '@amplitude/analytics-browser';

export const init = amplitude.init(process.env.REACT_APP_AMPLITUDE_KEY, { defaultTracking: true });

export const track = (eventName, properties = null) => amplitude.track(eventName, properties);
