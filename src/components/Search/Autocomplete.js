import {
  useEffect,
  useMemo,
  useRef,
  useState,
  createElement,
  Fragment,
} from 'react';
import { render } from 'react-dom';
import {
  useHierarchicalMenu,
  usePagination,
  useSearchBox,
} from 'react-instantsearch-hooks';
import { autocomplete } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

export default function Autocomplete({
  searchClient,
  className,
  ...autocompleteProps
}) {
  const autocompleteContainer = useRef(null);

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

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      panelContainer: '#panel',
      initialState: { query },
      //   insights: true,
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
      },
      renderer: { createElement, Fragment, render },
    });

    return () => autocompleteInstance.destroy();
  }, [plugins]);

  return <div className={className} ref={autocompleteContainer} />;
}
