import React, { useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import Styled from './Search.styles';
import {
  Searchbar,
  ContentChannel,
  ContentSeriesSingle,
  ContentSingle,
  FeatureFeedList,
  LivestreamSingle,
  Modal,
} from '../components';
import { ContentItemProvider, FeatureFeedProvider, ContentFeedProvider } from '../providers';
import { useModalState } from '../providers/ModalProvider';
import { useNavigation } from '../providers/NavigationProvider';
import { useSearchState } from '../providers/SearchProvider';
import { Box } from '../ui-kit';

function RenderFeatures(props) {
  const { id } = useNavigation();

  const [type, randomId] = id?.split(/-(.*)/s) ?? [];

  switch (type) {
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'UniversalContentItem': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return <ContentItemProvider Component={ContentSingle} options={options} />;
    }
    case 'ContentSeriesContentItem': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return <ContentItemProvider Component={ContentSeriesSingle} options={options} />;
    }
    case 'Livestream': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };

      return <ContentItemProvider Component={LivestreamSingle} options={options} />;
    }
    case 'ContentChannel': {
      const options = {
        variables: { id: `${type}:${randomId}` },
      };
      return <ContentFeedProvider Component={ContentChannel} options={options} />;
    }
    case 'Url': {
      return <h1>External Url</h1>;
    }
    case 'FeatureFeed': {
      const options = {
        variables: { itemId: `${type}:${randomId}` },
      };
      return <FeatureFeedProvider Component={FeatureFeedList} options={options} />;
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
  const modalState = useModalState();
  const searchState = useSearchState();

  return (
    <Box>
      {modalState.modal ? (
        <Box>
          <Modal />
          <Styled.Search in={!searchState.loading} timeout={300} classNames="fade" unmountOnExit>
            <Searchbar width="100%" />
          </Styled.Search>
        </Box>
      ) : (
        <>
          <RenderFeatures {...props} />
        </>
      )}
    </Box>
  );
};

Search.propTypes = {};

export default Search;
