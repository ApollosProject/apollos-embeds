import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

import { Feed } from '..';
import { Box, Loader } from '../../ui-kit';

import FeatureFeedListGrid from './FeatureFeedListGrid';
import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FeedBox = styled.div`
  animation: 0.3s linear ${fade};
`;

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
    <FeedBox>
      <FeatureListComponent {...props} />
    </FeedBox>
  );
};

FeatureFeedList.propTypes = {
  loading: PropTypes.bool,
};

export default FeatureFeedList;
