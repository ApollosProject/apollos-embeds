import amplitudeJS from 'amplitude-js';

export const trackEvent = (eventName, properties = null) => {
  amplitudeJS.getInstance().logEvent(eventName, properties);
};

export const init = (currentUser) => {
  const ampInstance = amplitudeJS.getInstance();
  ampInstance.init(process.env.REACT_APP_AMPLITUDE_KEY);

  if (currentUser) {
    const userProperties = {
      campusName: currentUser?.profile?.campus?.name,
      email: currentUser?.profile?.email,
      firstName: currentUser?.profile?.firstName,
      lastName: currentUser?.profile?.lastName,
      nickName: currentUser?.profile?.nickName,
      userId: currentUser?.profile?.id,
    };

    amplitudeJS.getInstance().setUserId(currentUser?.profile?.id);

    amplitudeJS.getInstance().setUserProperties(userProperties);
  }

  return null;
};

const amplitude = {
  init,
  trackEvent,
};

export default amplitude;
