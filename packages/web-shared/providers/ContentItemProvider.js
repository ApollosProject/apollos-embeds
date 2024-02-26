import React from 'react';
import PropTypes from 'prop-types';

import { useContentItem } from '../hooks';

function ContentItemProvider({ Component, options }) {
  const { loading, error, item } = useContentItem(options);

  console.log(item, 'item', error);

  return <Component data={item} loading={loading} error={error} />;
}

ContentItemProvider.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
  options: PropTypes.shape({}),
};

export default ContentItemProvider;
