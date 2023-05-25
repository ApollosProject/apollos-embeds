import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  createElement,
  Fragment,
} from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';
import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import {
  getAlgoliaResults,
  parseAlgoliaHitHighlight,
} from '@algolia/autocomplete-preset-algolia';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
// import { createAlgoliaInsightsPlugin } from '@algolia/autocomplete-plugin-algolia-insights';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { ClockCounterClockwise, MagnifyingGlass } from 'phosphor-react';

import { ResourceCard } from '../../ui-kit';
import '@algolia/autocomplete-theme-classic';

// import { useSearchParams } from 'react-router-dom';

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

// Query Suggestion Item Render
function QuerySuggestionItem({ item, autocomplete }) {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <MagnifyingGlass size={32} />
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
          title={`Fill query with "${item.query}"`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            autocomplete.setQuery(item.query);
            autocomplete.refresh();
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 17v-7.586l8.293 8.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-8.293-8.293h7.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1s1-0.448 1-1z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Recent Search Item Render
function PastQueryItem({ item, autocomplete, recentSearchesPlugin }) {
  function onRemove(id) {
    recentSearchesPlugin.data.removeItem(id);
    autocomplete.refresh();
  }

  function onTapAhead(item) {
    autocomplete.setQuery(item.label);
    autocomplete.refresh();
  }
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--noBorder">
          <ClockCounterClockwise size={32} weight="fill" />
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
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 17v-7.586l8.293 8.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-8.293-8.293h7.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1s1-0.448 1-1z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Autocomplete({
  autocompleteState,
  setAutocompleteState,
  searchClient,
  setShowTextPrompt,
}) {
  const inputRef = React.useRef(null);

  useEffect(() => {
    if (!inputRef.current) {
      return undefined;
    }
  }, [inputRef]);

  const { query, refine: setQuery } = useSearchBox();

  const [instantSearchUiState, setInstantSearchUiState] = useState({
    query,
  });

  useEffect(() => {
    setQuery(instantSearchUiState.query);
  }, [instantSearchUiState]);

  const recentSearches = createLocalStorageRecentSearchesPlugin({
    key: 'instantsearch',
    limit: 2,
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ item }) {
          setInstantSearchUiState({ query: item.label });
        },
      };
    },
  });

  // This query can probably be removed since InstantSearch does this same things + more
  const querySuggestions = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'ContentItem_chase_oaks',
    getSearchParams() {
      return recentSearches.data.getAlgoliaSearchParams({
        hitsPerPage: 3,
      });
    },
    transformSource({ source }) {
      return {
        ...source,
        sourceId: 'querySuggestionsPlugin',
        onSelect({ item }) {
          setInstantSearchUiState({ query: item.query });
        },
        getItems(params) {
          if (!params.state.query) {
            return [];
          }

          return source.getItems(params);
        },
      };
    },
  });

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete({
        panelContainer: '#panel',
        openOnFocus: true,
        plugins: [recentSearches, querySuggestions],
        onReset() {
          setInstantSearchUiState({ query: '' });
        },
        onSubmit({ state }) {
          setInstantSearchUiState({ query: state.query });
        },
        onStateChange({ prevState, state }) {
          if (prevState.query !== state.query) {
            setInstantSearchUiState({ query: state.query });
          }
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'products',
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'ContentItem_chase_oaks',
                      query,
                      params: {
                        hitsPerPage: 5,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.url;
              },
            },
          ];
        },
      }),
    []
  );

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

  return (
    <>
      <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
        <form
          className="aa-Form"
          {...autocomplete.getFormProps({ inputElement: inputRef.current })}
        >
          <div className="aa-InputWrapper">
            <input
              className="aa-Input"
              ref={inputRef}
              {...autocomplete.getInputProps({})}
            />
          </div>
        </form>
        <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
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
                              recentSearchesPlugin={recentSearches}
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
              //For recent search will be the first array in autocomplete state
              return instantSearchUiState.query !== '' ? (
                <div key={`source-${index}`} className="aa-Source">
                  <span>Content</span>
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <li
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
                            // onClick={() => handleActionPress(hit)}
                            background="none"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <span key={`source-${index}`}>
                  ****Insert Features here****
                </span>
              );
            })}
        </div>
      </div>
    </>
  );
}
