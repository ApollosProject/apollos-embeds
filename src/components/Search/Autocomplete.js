// --------------------------------------------------------------------------------------------------------------------
// -------------------AUTOCOMPLETE WITH INSTANTSEARCH HOOKS INTEGRATED - WITH AUTOCOMPLETE-CORE -----------------------
// --------------------------------------------------------------------------------------------------------------------

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  createElement,
  Fragment,
} from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createAutocomplete } from '@algolia/autocomplete-core';
// import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import algoliasearch from 'algoliasearch/lite';
import { Hits } from 'react-instantsearch-hooks-web';
import { ResourceCard } from '../../ui-kit';

import { useSearchParams } from 'react-router-dom';

const searchClient = algoliasearch(
  'Z0GWPR8XBE',
  '251ec8d76f6c62ac793c1337b39bda58'
);

export default function Autocomplete() {
  const [autocompleteState, setAutocompleteState] = React.useState({});
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

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: 'instantsearch',
      limit: 3,
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
          hitsPerPage: 6,
        });
      },
      transformSource({ source }) {
        console.log(source);
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

    return [recentSearches, querySuggestions];
  }, []);

  function Hit({ hit }) {
    return (
      <ResourceCard
        leadingAsset={hit?.coverImage}
        title={hit?.title}
        // onClick={() => handleActionPress(hit)}
        background="none"
      />
    );
  }

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete({
        panelContainer: '#panel',
        plugins,
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

  return (
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
            //For recent search will be the first array in autocomplete state
            return (
              <div key={`source-${index}`} className="aa-Source">
                <div>--------------------</div>
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
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        <Hits hitComponent={Hit} />
      </div>
    </div>
  );
}
