import React from 'react';
import PropTypes from 'prop-types';

import { useFeatureFeed } from '../hooks';

function FeatureFeedProvider({ Component, options, ...props }) {
  const { loading, error, features } = useFeatureFeed(options);

  if (!Component) {
    console.error(
      'FeatureFeedProvider was not given a Component to use. Cannot render.'
    );
    return null;
  }

  return (
    <Component data={features} loading={loading} error={error} {...props} />
  );
}

FeatureFeedProvider.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  options: PropTypes.shape({
    variables: PropTypes.shape({
      itemId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FeatureFeedProvider;
