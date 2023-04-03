import React from 'react';
import PropTypes from 'prop-types';

import { useTabFeed } from '../hooks';

function TabFeedProvider({ Component, options, ...props }) {
  const { loading, error, tabFeedFeatures } = useTabFeed(options);

  if (!Component) {
    // eslint-disable-next-line no-console
    console.error(
      'TabFeedProvider was not given a Component to use. Cannot render.'
    );
    return null;
  }

  return (
    <Component
      data={tabFeedFeatures}
      loading={loading}
      error={error}
      {...props}
    />
  );
}

TabFeedProvider.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  options: PropTypes.shape({
    variables: PropTypes.shape({
      campusId: PropTypes.string,
      tab: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TabFeedProvider;
