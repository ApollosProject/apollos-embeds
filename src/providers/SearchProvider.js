import React from 'react';
import PropTypes from 'prop-types';

import { useSearchQuery } from '../hooks';

function SearchProvider({ Component, options, ...props }) {
  const { loading, error, contentItems, fetchMore } = useSearchQuery(options);

  return (
    <Component
      data={contentItems}
      loading={loading}
      error={error}
      fetchMore={fetchMore}
      {...props}
    />
  );
}

SearchProvider.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  options: PropTypes.shape({}),
};

export default SearchProvider;
