import React from 'react';

import parseSlugToIdAndType from './parseSlugToIdAndType';
import {
  ContentSingle,
  ContentSeriesSingle,
  FeatureFeedList,
  ContentChannel,
  InformationalContentSingle,
  LivestreamSingle,
} from '../components';
import { ContentItemProvider, FeatureFeedProvider, ContentFeedProvider } from '../providers';
import { Box } from '../ui-kit';

export function getComponentFromType({ type, id }) {
  switch (type) {
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'Event':
    case 'UniversalContentItem': {
      const options = {
        variables: { id: `${type}:${id}` },
      };

      return <ContentItemProvider Component={ContentSingle} options={options} />;
    }
    case 'ContentSeriesContentItem': {
      const options = {
        variables: { id: `${type}:${id}` },
      };

      return <ContentItemProvider Component={ContentSeriesSingle} options={options} />;
    }
    case 'Livestream': {
      const options = {
        variables: { id: `${type}:${id}` },
      };

      return <ContentItemProvider Component={LivestreamSingle} options={options} />;
    }
    case 'ContentChannel': {
      const options = {
        variables: { id: `${type}:${id}` },
      };
      return <ContentFeedProvider Component={ContentChannel} options={options} />;
    }
    case 'Url': {
      return <h1>External Url</h1>;
    }
    case 'FeatureFeed': {
      const options = {
        variables: { itemId: `${type}:${id}` },
      };
      return <FeatureFeedProvider Component={FeatureFeedList} options={options} />;
    }
    default: {
      return null;
    }
  }
}

function getContentFromURL(url) {
  const { type, randomId } = parseSlugToIdAndType(url) ?? {};

  return getComponentFromType({ type, id: randomId });
}

export default getContentFromURL;
