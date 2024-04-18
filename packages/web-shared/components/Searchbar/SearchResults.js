import React, { useEffect, useState, createElement, Fragment } from 'react';

import '@algolia/autocomplete-theme-classic';
import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';

import { useSearchState } from '../../providers/SearchProvider';
import { FeatureFeedProvider } from '../../providers';
import Feed from '../FeatureFeed';
import { ResourceCard, Box } from '../../ui-kit';

import { getURLFromType } from '../../utils';
import { open as openModal, set as setModal, useModal } from '../../providers/ModalProvider';
import { ClockCounterClockwise, MagnifyingGlass, CaretRight, X } from '@phosphor-icons/react';
import { useNavigation } from '../../providers/NavigationProvider';

function Hit({ hit }) {
  return hit?.title;
}

// Highlight text render
function Highlight({ hit, attribute, tagName = 'mark' }) {
  return createElement(
    Fragment,
    {},
    parseAlgoliaHitHighlight({ hit, attribute }).map(({ value, isHighlighted }, index) => {
      if (isHighlighted) {
        return createElement(tagName, { key: index }, value);
      }

      return value;
    })
  );
}

// Query Suggestion Item Render
function QuerySuggestionItem({ item, autocomplete, handleActionPress }) {
  return (
    <Box className="aa-ItemWrapper" px="xs">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <MagnifyingGlass size={24} weight="bold" />
        </div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <Hit hit={item} />
          </div>
        </div>
      </div>
      <div className="aa-ItemActions">
        <button
          className="aa-ItemActionButton"
          title={`Fill query with "${item.title}"`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            autocomplete.setQuery(item.title);
            autocomplete.refresh();
          }}
        >
          <CaretRight size={24} weight="bold" />
        </button>
      </div>
    </Box>
  );
}

// Recent Search Item Render
function PastQueryItem({ item, autocomplete }) {
  function onRemove(id) {
    recentSearchesPlugin.data.removeItem(id);
    autocomplete.refresh();
  }

  function onTapAhead(item) {
    autocomplete.setQuery(item.label);
    autocomplete.setIsOpen(true);
    autocomplete.refresh();
  }
  return (
    <Box className="aa-ItemWrapper" px="xs">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <ClockCounterClockwise size={24} weight="bold" />
        </div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <Highlight hit={item} attribute="label" />
          </div>
        </div>
      </div>
      <div className="aa-ItemActions">
        <button
          className="aa-ItemActionButton"
          title="Remove this search"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove(item.id);
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 7v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-10c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-13zM17 5v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v13c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h10c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-13h1c0.552 0 1-0.448 1-1s-0.448-1-1-1zM9 5v-1c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1zM9 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1zM13 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1z" />
          </svg>
        </button>
        <button
          className="aa-ItemActionButton"
          title={`Fill query with "${item.label}"`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onTapAhead(item);
          }}
        >
          <CaretRight size={24} weight="bold" />
        </button>
      </div>
    </Box>
  );
}

const SearchResults = ({ autocompleteState, autocomplete }) => {
  const searchState = useSearchState();
  const [state, dispatch] = useModal();
  const { navigate, id } = useNavigation();

  const [isResultsEmpty, setIsResultsEmpty] = useState(false);

  useEffect(() => {
    const pagesItems =
      autocompleteState.collections.find((collection) => collection.source.sourceId === 'pages')
        ?.items || [];
    const contentItems =
      autocompleteState.collections.find((collection) => collection.source.sourceId === 'content')
        ?.items || [];

    setIsResultsEmpty(pagesItems.length === 0 && contentItems.length === 0);
  }, [autocompleteState.collections]);

  const handleActionPress = (item) => {
    navigate({ id: getURLFromType(item) });
    if (state.modal) {
      const url = getURLFromType(item);
      dispatch(setModal(url));
      dispatch(openModal());
    }
  };

  const handleStaticActionPress = (item) => {
    window.location.href = item.url;
  };

  if (!autocompleteState || !autocomplete) {
    return null;
  }

  // Makes SSR consistent on aria aspects
  const inputProps = autocomplete.getInputProps({});

  // Hack: join results from each collection back to a single array, and re-sort them by Algolia's ranking
  // TODO: Remove once we have a single index for all content
  const allResults = [];
  autocompleteState.collections
    .filter((collection) => ['pages', 'content'].includes(collection.source.sourceId))
    .forEach((collection) => {
      allResults.push(...collection.items.map((item) => ({ ...item, source: collection.source })));
    });
  // Algolia adds a _rankingInfo property to each item, which we can use to sort the results
  // We want to sort the results first by nbExactWords (desc), then proximityDistance (asc), then last by userScore (desc)
  // This is super hacky and results are not to be guaranteed, but should improve results over displaying them in the order they come back
  allResults.sort((a, b) => {
    if (a._rankingInfo.nbExactWords > b._rankingInfo.nbExactWords) {
      return -1;
    }
    if (a._rankingInfo.nbExactWords < b._rankingInfo.nbExactWords) {
      return 1;
    }
    if (a._rankingInfo.proximityDistance < b._rankingInfo.proximityDistance) {
      return -1;
    }
    if (a._rankingInfo.proximityDistance > b._rankingInfo.proximityDistance) {
      return 1;
    }
    if (a._rankingInfo.userScore > b._rankingInfo.userScore) {
      return -1;
    }
    if (a._rankingInfo.userScore < b._rankingInfo.userScore) {
      return 1;
    }
    return 0;
  });

  return (
    <Box
      id="panel"
      className="aa-Panel"
      dropdown={autocompleteState.isOpen}
      {...autocomplete.getPanelProps({})}
    >
      {autocompleteState.isOpen && <div id="panel-top"></div>}
      {isResultsEmpty &&
        autocompleteState.collections.some((collection) =>
          ['pages', 'content'].includes(collection.source.sourceId)
        ) && (
          <Box
            padding="xs"
            fontWeight="500"
            color="base.gray"
            textAlign="center"
            fontStyle="italic"
          >
            No results found
          </Box>
        )}
      {autocompleteState.isOpen &&
        autocompleteState.collections.map((collection, index) => {
          const { source, items } = collection;
          // Rendering of Query Suggestions
          if (['querySuggestionsPlugin'].includes(collection.source.sourceId)) {
            return (
              <div key={`source-${index}`} className="aa-Source">
                {collection.source.sourceId === 'querySuggestionsPlugin' && !inputProps.value && (
                  <Box padding="xs" fontWeight="600" color="base.gray">
                    Trending Searches
                  </Box>
                )}
                {collection.source.sourceId === 'recentSearchesPlugin' && !inputProps.value && (
                  <Box padding="xs" fontWeight="600" color="base.gray">
                    Search History
                  </Box>
                )}
                <ul className="aa-List" {...autocomplete.getListProps()}>
                  {items.map((item, index) => {
                    if (
                      collection.source.sourceId === 'querySuggestionsPlugin' &&
                      !inputProps.value
                    ) {
                      return (
                        <li
                          key={`${item.objectID ? item.objectID : index}-${
                            collection.source.sourceId
                          }`}
                          className="aa-Item"
                          {...autocomplete.getItemProps({
                            item,
                            source,
                          })}
                        >
                          <QuerySuggestionItem
                            item={item}
                            autocomplete={autocomplete}
                            handleActionPress={handleActionPress}
                            {...autocomplete.getItemProps({
                              item,
                              source,
                            })}
                          />
                        </li>
                      );
                    } else if (
                      collection.source.sourceId === 'recentSearchesPlugin' &&
                      !inputProps.value
                    ) {
                      return (
                        <li
                          key={`${item.objectID ? item.objectID : index}-${
                            collection.source.sourceId
                          }`}
                          className="aa-Item"
                          {...autocomplete.getItemProps({
                            item,
                            source,
                          })}
                        >
                          <PastQueryItem
                            item={item}
                            autocomplete={autocomplete}
                            {...autocomplete.getItemProps({
                              item,
                              source,
                            })}
                          />
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            );
          }
        })}
      {
        // Rendering of regular items
        autocompleteState.query !== '' ? (
          <div className="aa-Source">
            <ul className="aa-List" {...autocomplete.getListProps()}>
              {allResults.map((item) => (
                <Box
                  as="li"
                  borderRadius="0"
                  padding="0"
                  key={item.objectID}
                  className="aa-Item"
                  {...autocomplete.getItemProps({
                    item,
                    source: item.source,
                  })}
                >
                  <ResourceCard
                    leadingAsset={item?.coverImage}
                    title={item?.title}
                    subtitle={item?.summary}
                    onClick={() => {
                      if (item.source.sourceId === 'pages') {
                        return handleStaticActionPress(item);
                      }
                      return handleActionPress(item);
                    }}
                    background="none"
                  />
                </Box>
              ))}
            </ul>
          </div>
        ) : null
      }
      {autocompleteState.isOpen && autocompleteState.query === '' && searchState.searchFeed ? (
        <Box className="empty-feed">
          <FeatureFeedProvider
            Component={Feed}
            options={{
              variables: {
                itemId: searchState.searchFeed,
              },
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchResults;
