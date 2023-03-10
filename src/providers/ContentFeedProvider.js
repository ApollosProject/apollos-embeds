import React from 'react';
import PropTypes from 'prop-types';

import { useContentFeed } from '../hooks';

function ContentFeedProvider({ Component, options, ...props }) {
  const { loading, error, content, fetchMore } = useContentFeed(options);

  return (
    <Component
      data={content}
      loading={loading}
      error={error}
      fetchMore={fetchMore}
      {...props}
    />
  );
}

ContentFeedProvider.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  options: PropTypes.shape({}),
};

export default ContentFeedProvider;
