import React from 'react';
import { Searchbar } from '../components';

import {
  ContentItemProvider,
  FeatureFeedProvider,
  ContentFeedProvider,
} from '../providers';
import {
  ContentSingle,
  FeatureFeedList,
  ContentChannel,
  LivestreamSingle,
  Breadcrumbs,
  Modal,
} from '../components';
import { useModalState } from '../providers/ModalProvider';
import { Box } from '../ui-kit';
import { useSearchParams } from 'react-router-dom';

function RenderFeatures(props) {
  const [searchParams] = useSearchParams();
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
          <Searchbar width="100%" />
        </Box>
      );
    }
  }
}

const Search = (props) => {
  const state = useModalState();

  return (
    <Box>
      {state.modal ? (
        <Box>
          <Modal />
          <Searchbar width="100%" />
        </Box>
      ) : (
        <>
          <Breadcrumbs />
          <RenderFeatures {...props} />
        </>
      )}
    </Box>
  );
};

Search.propTypes = {};

export default Search;
