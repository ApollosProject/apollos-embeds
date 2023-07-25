import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import { Feed } from '..';
import { Box, Loader } from '../../ui-kit';

import FeatureFeedListGrid from './FeatureFeedListGrid';
import Styled from './FeatureFeedList.styles';

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
