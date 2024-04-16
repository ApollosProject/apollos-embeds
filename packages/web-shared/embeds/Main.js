import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';

import { Searchbar } from '../components';

import { ContentItemProvider, FeatureFeedProvider, ContentFeedProvider } from '../providers';
import {
  ContentSingle,
  FeatureFeedList,
  ContentChannel,
  LivestreamSingle,
  Breadcrumbs,
  Modal,
} from '../components';
import { useModalState } from '../providers/ModalProvider';
import { useSearchState } from '../providers/SearchProvider';
import { Box } from '../ui-kit';

import Styled from './Search.styles';

function RenderEmbed(props) {
  const searchState = useSearchState();

  switch (props.type) {
    case 'FeatureFeed': {
      return (
        <FeatureFeedProvider
          Component={FeatureFeedList}
          options={{
            variables: {
              itemId: props.featureFeed,
            },
          }}
          {...props}
        />
      );
    }
    case 'Search': {
      return (
        <Styled.Search in={!searchState.loading} timeout={300} classNames="fade" unmountOnExit>
          <Searchbar width="100%" />
        </Styled.Search>
      );
    }
    default: {
      return (
        <Styled.Search in={!searchState.loading} timeout={300} classNames="fade" unmountOnExit>
          <Searchbar width="100%" />
        </Styled.Search>
      );
    }
  }
}

const Main = ({ type }) => {
  const widgetDivs = Array.from(document.querySelectorAll('.apollos-widget')); // Convert NodeList to Array

  return (
    <Box>
      <Box>
        <Modal />
        {/* Portal all widgets component */}
        {widgetDivs.map((widget, index) => {
          return createPortal(
            <RenderEmbed
              key={index}
              type={widget.dataset.type}
              church={widget.dataset.church}
              searchFeed={widget.dataset.searchFeed}
              featureFeed={widget.dataset.featureFeed}
              modal={widget.dataset.modal}
              emptyPlaceholderText={widget.dataset.emptyPlaceholderText}
            />,
            widget
          );
        })}
      </Box>
    </Box>
  );
};

Main.propTypes = {};

export default Main;
