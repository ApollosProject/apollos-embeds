import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import isNil from 'lodash/isNil';
import compact from 'lodash/compact';
import isFunction from 'lodash/isFunction';

import { useLink } from '../../hooks';
import { Box, Loader } from '../../ui-kit';

import FeatureFeedComponentMap from './FeatureFeedComponentMap';

const Feed = ({ loading, data, emptyPlaceholderText }) => {
  const transformLink = useLink();
  // Clunky, silly workaround for an Apollo query `loading` prop problem.
  // We don't want cache updates or background refetch calls to trigger
  // the loading state when we have data... that unmounts the VideoPlayer.
  // To avoid a flicker of "error" state, also show loader on first query.
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad && !loading) {
      setIsFirstLoad(false);
    }
  }, [loading, isFirstLoad]);

  if (isFirstLoad || (loading && !data)) {
    return (
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        height="100%"
        width="100%"
        flexGrow={1}
      >
        <Loader />
      </Box>
    );
  }

  const features = data.features?.map((feature) => (feature.cards === null ? undefined : feature));
  const renderedFeatures = compact(features);

  if (!renderedFeatures?.length) {
    return (
      <Box textAlign="center">
        <h4>Sorry, something went wrong.</h4>
        <p>No features found in this feed.</p>
      </Box>
    );
  }

  return renderedFeatures?.map((feature, i) => {
    const { __typename } = feature;

    // Lookup the component responsible for rendering this Feature
    const FeatureComponent = FeatureFeedComponentMap[__typename];

    if (!FeatureComponent) {
      // eslint-disable-next-line no-console
      console.log(`⚠️ FeatureFeed could not render feature of type "${__typename}"`);
      return null;
    }

    const handleTransformLink = (url) => {
      // just bulletproofing
      if (!isFunction(transformLink)) return url;
      return transformLink(url);
    };

    return (
      <FeatureComponent
        key={`${feature.id}_${i}`}
        feature={feature}
        transformLink={handleTransformLink}
        emptyPlaceholderText={emptyPlaceholderText}
      />
    );
  });
};

Feed.propTypes = {
  loading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
};

export default Feed;
