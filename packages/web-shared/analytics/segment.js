import { createClient } from '@segment/analytics-react';
import { useCurrentChurch } from '../hooks';

const APOLLOS_SEGMENT_KEY = 'rwkfWr0HpIW4eSUZqI30BmcMAdwsVrW0';

const clientFactory = (writeKey, clientManaged = false) => {
  const { currentChurch } = useCurrentChurch();
  const clientKey = writeKey ? writeKey : currentChurch?.webSegmentKey;

  if (!clientKey) {
    return null;
  }

  const client = createClient({
    clientKey,
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

const clients = [clientFactory(APOLLOS_SEGMENT_KEY), clientFactory(null, true)].filter(Boolean);

export default clients;
