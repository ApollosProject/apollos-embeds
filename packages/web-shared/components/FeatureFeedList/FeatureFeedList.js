import React from 'react';

import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import Styled from './FeatureFeedList.styles';
import FeatureFeedListGrid from './FeatureFeedListGrid';
import { Feed } from '..';
import { Box, Loader } from '../../ui-kit';

const FeatureFeedList = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (props.loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Loader />
      </Box>
    );
  }

  const FeatureListComponent =
    searchParams.get('action') === 'viewall' ? FeatureFeedListGrid : Feed;

  return (
    <Styled.Feed>
      <FeatureListComponent {...props} />
    </Styled.Feed>
  );
};

FeatureFeedList.propTypes = {
  loading: PropTypes.bool,
};

export default FeatureFeedList;
