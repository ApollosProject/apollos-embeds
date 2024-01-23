import { AnalyticsBrowser } from '@segment/analytics-next';
const clientFactory = (writeKey, clientManaged = false) => {
  if (!writeKey) {
    return null;
  }

  const client = AnalyticsBrowser.load({
    writeKey,
    trackAppLifecycleEvents: true,
  });
  return {
    track: (eventName, properties = null) => {
      client.track(eventName, properties);
    },
    screen: (screenName, properties = null) => {
      client.screen(screenName, properties);
    },
    identify: (userId, properties = null) => {
      if (userId) {
        const userTraits = {
          campusName: properties?.campus,
          church: properties?.church,
          email: properties?.email,
          firstName: properties?.firstName,
          lastName: properties?.lastName,
          nickName: properties?.nickName,
          userId: properties?.id,
          originId: properties?.originId,
          originType: properties?.originType,
          apollosId: userId,
        };
        if (clientManaged && properties?.originId) {
          client.identify(properties?.originId, userTraits);
        } else {
          client.identify(userId, userTraits);
        }
      }
    },
    group: (groupId, properties = null) => {
      if (groupId) {
        client.group(groupId, properties);
      }
    },
    alias: (newUserId) => {
      client.alias(newUserId);
    },
    reset: () => {
      client.reset();
    },
    flush: () => {
      client.flush();
    },
  };
};

export default clientFactory;
