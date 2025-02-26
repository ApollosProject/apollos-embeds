import React, { createContext, useContext, useMemo, useEffect, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useCurrentChurch, useCurrentUser } from '../hooks';
import amplitude from '../analytics/amplitude';
import clientFactory from '../analytics/segment';
import { useAuth } from './AuthProvider';
import { isbot } from 'isbot';

const Context = createContext();
const isBot = isbot(navigator.userAgent);
const isDev = process.env.NODE_ENV !== 'production';

export const GET_ANALYTICS_USER = gql`
  query GetWebAnalyticsUser {
    currentUser {
      id
      originId
      originType
      profile {
        id
        firstName
        lastName
        email
        phone
        campus {
          id
          name
        }
        gender
        birthDate
        photo {
          uri
        }
      }
    }
  }
`;

export const GET_CHURCH_ANALYTICS = gql`
  query {
    currentChurch {
      webAmplitudeKey
      webSegmentKey
    }
  }
`;

/**
 * Multi-client analytics provider. Allows you to track events to multiple analytics services.
 * It models analytics.js's API, with the analytics functions that it defines
 * https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/#tracking-methods
 * Emulating this library was chosen as analytics.js is a very widely used analytics library, and most
 * other providers have a similar or even identical API.
 *
 * Long-term, if we adopt other analytic providers, we should map these functions to their API.
 * You can see an example of this in the Amplitude Provider (templates/mobile/src/analytics/amplitude)
 * - screen: Used to track screen views
 * - track: Used to track arbitrary analytics events
 * - identify: Used to identify the current user
 * - group): Associate users with a group -> we use this to associate users with a church
 * - flush: Flushes all events to the analytics service (overrides segment's batching)
 * - alias: Used to alias a user to another user
 * - reset: Used to reset the current user (when a user logs out)
 * @param {Array} clients An array of analytics clients to track events to.
 * Each client should have the functions (or subset of) defined above.
 * @param {church} church The church slug to pass to the analytics client's group function.
 */
export const AnalyticsProvider = ({ children, church }) => {
  const [authState] = useAuth();
  const { data: churchData } = useQuery(GET_CHURCH_ANALYTICS);
  const { currentUser } = useCurrentUser({ skip: !authState.authenticated });
  const clients = useMemo(() => {
    if (isBot || isDev) {
      return [];
    }
    amplitude.init(churchData?.currentChurch?.webAmplitudeKey, currentUser);
    const segmentClients = [
      clientFactory('YxKgDjmwjTQrTdm6mO34kArQIYFmfnAY', true),
      clientFactory(churchData?.currentChurch?.webSegmentKey, true),
    ].filter(Boolean);
    return [{ track: amplitude.trackEvent, identify: amplitude.init }, ...segmentClients];
  }, [isBot, churchData, currentUser]);

  // Auto track user
  const { data } = useQuery(GET_ANALYTICS_USER, {
    returnPartialData: true,
    errorPolicy: 'ignore',
    skip: !authState.authenticated,
  });

  const client = useMemo(() => {
    // add some standard properties to all events
    const addProperties = (properties) => {
      const newProps = { ...properties };
      if (data?.currentUser?.originId) {
        newProps.userOriginId = data?.currentUser?.originId;
        newProps.userOriginType = data?.currentUser?.originType;
      }

      if (church) {
        newProps.church = church;
      }
      return newProps;
    };
    return {
      screen: (screenName, properties, ...args) =>
        Promise.all(
          clients?.map((c) => {
            // backwards compatibility: if no screen method is provided, use track
            // This is mainly used to support Legacy Amplitude + CoreAnalytics
            // which does not provide a "screen" method.
            const apollosProperties = addProperties(properties);
            if (!c?.screen && c.track) {
              return c.track(screenName, apollosProperties, ...args);
            }
            return c?.screen && c.screen(screenName, apollosProperties, ...args);
          })
        ),
      track: (eventName, properties, ...args) => {
        // backwards compatibility, older method syntax was to pass an object
        if (typeof eventName === 'object') {
          properties = eventName.properties;
          eventName = eventName.eventName;
        }

        const apollosProperties = addProperties(properties);

        return Promise.all(
          clients?.map((c) => c?.track && c.track(eventName, apollosProperties, ...args))
        );
      },
      identify: (...args) => Promise.all(clients?.map((c) => c?.identify && c.identify(...args))),
      flush: (...args) => Promise.all(clients?.map((c) => c?.flush && c.flush(...args))),
      group: (...args) => Promise.all(clients?.map((c) => c?.group && c.group(...args))),
      alias: (...args) => Promise.all(clients?.map((c) => c?.alias && c.alias(...args))),
      reset: (...args) => Promise.all(clients?.map((c) => c?.reset && c.reset(...args))),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients, data?.currentUser?.originId, data?.currentUser?.originType, church]);
  useEffect(() => {
    if (!data?.currentUser?.profile?.id) {
      return;
    }
    client.identify(data.currentUser.profile.id, {
      ...data.currentUser.profile,
      originId: data.currentUser.originId,
      originType: data.currentUser.originType,
      avatar: data.currentUser.profile.photo?.uri,
      church, // this is set in group but also setting here as some services don't support group
    });
  }, [data?.currentUser?.profile]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset when changing users
  const lastId = useRef();
  useEffect(() => {
    if (data?.currentUser?.profile?.id) {
      if (lastId.current && lastId.current !== data?.currentUser?.profile?.id) {
        client.reset(); // only call reset after a logout and log back in as a different user
        client.group(church); // needs to be re-called after reset
      }
      lastId.current = data?.currentUser?.profile?.id;
    }
  }, [client, church, data?.currentUser?.profile?.id]);

  // Auto-set group
  useEffect(() => {
    client.group(church); // also called on reset
  }, [client, church, data?.currentUser?.profile?.id]);

  return <Context.Provider value={client}>{children}</Context.Provider>;
};

export const AnalyticsConsumer = Context.Consumer;

/**
 * useAnalytics hook allows you to access an analytics object and call analytics events from a component
 * @example
 * const analytics = useAnalytics();
 * analytics.track('Event Name', { property: 'value' });
 * @returns {Object} An analytics object with the functions defined above in the PRovider
 */
export const useAnalytics = () => useContext(Context);

// provided mainly for backwards compatibility. useAnalytics is preferred.
export const useTrack = () => {
  const analytics = useAnalytics();
  return analytics.track;
};

export default AnalyticsProvider;
