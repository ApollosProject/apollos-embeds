import amplitudeJS from 'amplitude-js';

export const trackEvent = (eventName, properties = null) => {
  amplitudeJS.getInstance().logEvent(eventName, properties);
};

export const init = (amplitudeKey, currentUser = null) => {
  const ampInstance = amplitudeJS.getInstance();
  if (amplitudeKey) {
    ampInstance.init(amplitudeKey);
    if (currentUser) {
      const userProperties = {
        email: currentUser?.profile?.email,
        firstName: currentUser?.profile?.firstName,
        lastName: currentUser?.profile?.lastName,
        userId: currentUser?.profile?.id,
      };

      amplitudeJS.getInstance().setUserId(currentUser?.profile?.id);

      amplitudeJS.getInstance().setUserProperties(userProperties);
    }
  }

  return null;
};

const amplitude = {
  init,
  trackEvent,
};

export default amplitude;
