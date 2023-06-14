import React, { useEffect, createElement, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClockCounterClockwise,
  MagnifyingGlass,
  CaretDown,
  CaretRight,
  X,
} from 'phosphor-react';

import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import {
  getAlgoliaResults,
  parseAlgoliaHitHighlight,
} from '@algolia/autocomplete-preset-algolia';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import '@algolia/autocomplete-theme-classic';

import { FeatureFeedProvider } from '../../providers';
import Feed from '../FeatureFeed';
import { ResourceCard, Box } from '../../ui-kit';

import { useSearchState } from '../../providers/SearchProvider';
import { getURLFromType } from '../../utils';
import Styled from './Search.styles';

const MOBILE_BREAKPOINT = 428;
const appId = process.env.REACT_APP_ALGOLIA_APP_ID;
const apiKey = process.env.REACT_APP_ALGOLIA_API_KEY;
const searchClient = algoliasearch(appId, apiKey);

function Hit({ hit }) {
  return hit?.title;
}

// Highlight text render
function Highlight({ hit, attribute, tagName = 'mark' }) {
  return createElement(
    Fragment,
    {},
    parseAlgoliaHitHighlight({ hit, attribute }).map(
      ({ value, isHighlighted }, index) => {
        if (isHighlighted) {
          return createElement(tagName, { key: index }, value);
        }

        return value;
      }
    )
  );
}

// Recent Searches Index Definition
const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'navbar',
});

// Query Suggestion Item Render
function QuerySuggestionItem({ item, autocomplete, handleActionPress }) {
  return (
    <Box className="aa-ItemWrapper" px="xs">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <MagnifyingGlass size={24} weight="bold" />
        </div>
        <div className="aa-ItemContentBody">
          <div
            className="aa-ItemContentTitle"
            onClick={() => handleActionPress(item)}
          >
            <Hit hit={item} />
          </div>
        </div>
      </div>
      <div className="aa-ItemActions">
        <button
          className="aa-ItemActionButton"
          title={`Fill query with "${item.query}"`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            autocomplete.setQuery(item.query);
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

export default function Autocomplete({
  autocompleteState,
  setAutocompleteState,
  setShowTextPrompt,
}) {
  const navigate = useNavigate();
  const searchState = useSearchState();
  const inputRef = React.useRef(null);
  const handleActionPress = (item) => {
    navigate({
      pathname: '/',
      search: `?id=${getURLFromType(item)}`,
    });
  };

  const clearInput = () => {
    const value = inputProps.value;
    recentSearchesPlugin.data.addItem({
      id: value,
      label: value,
      _highLightResult: { label: { value: value } },
    });
    autocomplete.setQuery('');
    autocomplete.refresh();
  };

  const handlePanelDropdown = () => {
    const updatedAutocompleteState = { ...autocompleteState };
    updatedAutocompleteState.isOpen = !updatedAutocompleteState.isOpen;
    setAutocompleteState(updatedAutocompleteState);

    autocomplete.setIsOpen(!autocompleteState.isOpen);
    inputRef.current?.[autocompleteState.isOpen ? 'blur' : 'focus']();
  };

  // (Desktop Specific Behavior): Hitting enter scrolls dropdown to results
  const scrollToResults = (event) => {
    const resultsElement = document.getElementById('results');
    event.preventDefault();
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Query Suggesion Index Definition
  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: `ContentItem_${searchState.church}`,
  });

  const autocomplete = React.useMemo(() => {
    return createAutocomplete({
      openOnFocus: true,
      plugins: [querySuggestionsPlugin, recentSearchesPlugin],
      onStateChange({ state, ...props }) {
        // (Mobile Specific Behavior): New keystroke resets the list view scroll to the top
        const panelElement =
          window.innerWidth < MOBILE_BREAKPOINT &&
          state.query !== props.prevState.query
            ? document.getElementById('panel-top')
            : null;

        if (panelElement) {
          panelElement.scrollIntoView({
            behavior: 'instant',
            block: 'start',
          });
        }
        // (2) Synchronize the Autocomplete state with the React state.
        setAutocompleteState(state);
      },
      getSources() {
        return [
          // (3) Use an Algolia index source.
          {
            sourceId: 'content',
            getItemInputValue({ item }) {
              return item.query;
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: `ContentItem_${searchState.church}`,
                    query,
                    params: {
                      hitsPerPage: 4,
                      clickAnalytics: true,
                      // highlightPreTag: '<mark>',
                      // highlightPostTag: '</mark>',
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return `/?query=${item.name}`;
            },
          },
          {
            sourceId: 'pages',
            getItemInputValue({ item }) {
              return item.query;
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: `WebPages_Global`,
                    query,
                    params: {
                      facetFilters: [`church:${searchState.church}`],
                      hitsPerPage: 4,
                      clickAnalytics: true,
                      // highlightPreTag: '<mark>',
                      // highlightPostTag: '</mark>',
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return `/?query=${item.name}`;
            },
          },
        ];
      },
    });
  }, []);

  const autoCompleteLabel = 'autocomplete-1-label';
  const autoCompleteId = 'autocomplete-1-input';

  // Makes SSR consistent on aria aspects
  const containerProps = autocomplete.getRootProps({});
  const inputProps = autocomplete.getInputProps({});
  const panelProps = autocomplete.getPanelProps({});
  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });

  inputProps.id = autoCompleteId;
  formProps.onSubmit = scrollToResults;
  containerProps['aria-labelledby'] = autoCompleteLabel;
  inputProps['aria-labelledby'] = autoCompleteLabel;
  panelProps['aria-labelledby'] = autoCompleteLabel;

  useEffect(() => {
    function handleClickOutside(event) {
      if (autocompleteState.isOpen && !event.target.closest('#search')) {
        autocomplete.setIsOpen(false);
        autocomplete.setQuery('');
        setShowTextPrompt(true);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [autocompleteState.isOpen, autocomplete, setShowTextPrompt]);

  // ...CUSTOM RENDERER
  return (
    <div className="aa-Autocomplete" {...containerProps}>
      <form className="aa-Form" {...formProps}>
        <input ref={inputRef} className="aa-Input" {...inputProps} />
        {inputProps.value !== '' ? (
          <div className="aa-ClearButton" onClick={clearInput}>
            <Styled.IconWrapper>
              <X size={18} weight="fill" />
            </Styled.IconWrapper>
          </div>
        ) : null}
        <div onClick={handlePanelDropdown}>
          <Styled.IconWrapper>
            <CaretDown size={14} weight="fill" />
          </Styled.IconWrapper>
        </div>
      </form>
      <Box
        id="panel"
        className="aa-Panel"
        dropdown={autocompleteState.isOpen}
        {...autocomplete.getPanelProps({})}
        borderRadius="0px 0px 15px 15px"
      >
        {autocompleteState.isOpen && <div id="panel-top"></div>}
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;
            // Rendering of Query Suggestions
            if (
              ['querySuggestionsPlugin', 'recentSearchesPlugin'].includes(
                collection.source.sourceId
              )
            ) {
              return (
                <div key={`source-${index}`} className="aa-Source">
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item, index) => (
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
                        {collection.source.sourceId ===
                          'querySuggestionsPlugin' && (
                          <QuerySuggestionItem
                            item={item}
                            autocomplete={autocomplete}
                            handleActionPress={handleActionPress}
                            {...autocomplete.getItemProps({
                              item,
                              source,
                            })}
                          />
                        )}
                        {collection.source.sourceId ===
                          'recentSearchesPlugin' && (
                          <PastQueryItem
                            item={item}
                            autocomplete={autocomplete}
                            {...autocomplete.getItemProps({
                              item,
                              source,
                            })}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            // Rendering of regular items
            return autocompleteState.query !== '' ? (
              <div key={`source-${index}`} className="aa-Source">
                {collection.source.sourceId === 'content' && (
                  <Box
                    padding="xs"
                    fontWeight="600"
                    color="base.gray"
                    id="results"
                  >
                    Content
                  </Box>
                )}
                {collection.source.sourceId === 'pages' && (
                  <Box padding="xs" fontWeight="600" color="base.gray">
                    Pages
                  </Box>
                )}
                {items.length > 0 ? (
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item) => (
                      <Box
                        as="li"
                        borderRadius="0"
                        padding="0"
                        key={item.objectID}
                        className="aa-Item"
                        {...autocomplete.getItemProps({
                          item,
                          source,
                        })}
                      >
                        <ResourceCard
                          leadingAsset={item?.coverImage}
                          title={item?.title}
                          onClick={() => handleActionPress(item)}
                          background="none"
                        />
                      </Box>
                    ))}
                  </ul>
                ) : (
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
              </div>
            ) : null;
          })}
        {autocompleteState.isOpen && autocompleteState.query === '' ? (
          <FeatureFeedProvider
            Component={Feed}
            options={{
              variables: {
                itemId: searchState.searchFeed,
              },
            }}
          />
        ) : null}
      </Box>
    </div>
  );
}
