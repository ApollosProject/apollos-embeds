import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useInteractWithNode } from '../../hooks';

const InteractWhenLoaded = ({ loading, nodeId, action, data }) => {
  const [interactWhenLoaded] = useInteractWithNode();

  useEffect(() => {
    if (!loading && nodeId && action) {
      interactWhenLoaded({
        variables: {
          nodeId,
          action,
          data,
        },
      });
    }
  }, [loading, nodeId, action, data, interactWhenLoaded]);

  return null;
};

InteractWhenLoaded.propTypes = {
  loading: PropTypes.bool,
  nodeId: PropTypes.string.isRequired,
  action: PropTypes.string,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default InteractWhenLoaded;
