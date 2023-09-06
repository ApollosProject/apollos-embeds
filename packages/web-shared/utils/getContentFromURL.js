import React from 'react';
import {
  ContentItemProvider,
  FeatureFeedProvider,
  ContentFeedProvider,
} from '../providers';
import {
  ContentSingle,
  ContentSeriesSingle,
  FeatureFeedList,
  ContentChannel,
  LivestreamSingle,
} from '../components';
import { Box } from '../ui-kit';

function getContentFromURL(url) {
  const [type, randomId] = url?.split(/-(.*)/s) ?? [];

  switch (type) {
    case 'EventContentItem':
    case 'InformationalContentItem':
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'UniversalContentItem': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return (
        <ContentItemProvider Component={ContentSingle} options={options} />
      );
    }
    case 'ContentSeriesContentItem': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return (
        <ContentItemProvider
          Component={ContentSeriesSingle}
          options={options}
        />
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
      return <Box>No Content</Box>;
    }
  }
}

export default getContentFromURL;
