import React from 'react';
import {
  TabFeedProvider,
  ContentItemProvider,
  FeatureFeedProvider,
  ContentFeedProvider,
} from '../providers';
import {
  Feed,
  ContentSingle,
  FeatureFeedList,
  ContentChannel,
  Breadcrumbs,
  LivestreamSingle,
} from '../components';
import { Box } from '../ui-kit';
import { useCurrentUser } from '../hooks';
import { useSearchParams, useLocation } from 'react-router-dom';

function RenderFeatures(props) {
  const [searchParams] = useSearchParams();
  const { currentUser } = useCurrentUser();
  const _id = searchParams.get('id');

  const [type, randomId] = _id?.split(/-(.*)/s) ?? [];

  switch (type) {
    case 'EventContentItem':
    case 'InformationalContentItem':
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'UniversalContentItem':
    case 'ContentSeriesContentItem': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return (
        <ContentItemProvider Component={ContentSingle} options={options} />
      );
    }
    case 'Livestream': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return (
        <ContentItemProvider Component={LivestreamSingle} options={options} />
      );
    }
    case 'ContentChannel': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };
      return (
        <ContentFeedProvider Component={ContentChannel} options={options} />
      );
    }
    case 'Url': {
      return <h1>External Url</h1>;
    }
    case 'FeatureFeed': {
      const options = {
        variables: { itemId: `${type}:${randomId}` },
      };
      return (
        <FeatureFeedProvider Component={FeatureFeedList} options={options} />
      );
    }
    default: {
      return (
        <Box>
          <TabFeedProvider
            Component={Feed}
            options={{
              variables: {
                campusId: currentUser?.campus?.id,
                tab: 'TV',
              },
            }}
            {...props}
          />
        </Box>
      );
    }
  }
}

const FeatureFeed = (props) => {
  const location = useLocation();

  return (
    <Box>
      <Breadcrumbs />
      <RenderFeatures {...props} />
    </Box>
  );
};

FeatureFeed.propTypes = {};

export default FeatureFeed;
