import React, { useEffect, useRef, useMemo } from 'react';
import { X } from 'phosphor-react';

import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import '@algolia/autocomplete-theme-classic';

import { useSearchState } from '../../providers/SearchProvider';
import { getURLFromType } from '../../utils';
import Styled from './Search.styles';

const MOBILE_BREAKPOINT = 428;
const appId = 'Z0GWPR8XBE';
const apiKey = '251ec8d76f6c62ac793c1337b39bda58';
const searchClient = algoliasearch(appId, apiKey);

// Recent Searches Index Definition
const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'navbar',
  transformSource({ source }) {
    return {
      ...source,
      onSelect({ setIsOpen }) {
        setIsOpen(true);
      },
    };
  },
});

export default function Autocomplete({
  autocompleteState,
  setAutocompleteState,
  setShowTextPrompt,
  getAutocompleteInstance,
}) {
  const searchState = useSearchState();
  const inputRef = useRef(null);

  function setAriaSelectedToFalseOnHover(parentClassName, childClassName, hoverElementClassName) {
    const parentElements = document.querySelectorAll(parentClassName);
    const hoverElement = document.querySelector(hoverElementClassName);

    if (autocompleteState.isOpen) {
      if (parentElements.length === 0) {
        return;
      }
      if (!hoverElement) {
        return;
      }
      hoverElement.addEventListener('mouseover', function () {
        parentElements.forEach(function (parentElement) {
          const children = parentElement.querySelectorAll(childClassName);
          for (let i = 0; i < children.length; i++) {
            children[i].setAttribute('aria-selected', 'false');
          }
        });
      });
    }
  }

  const clearInput = () => {
    const value = inputProps.value;
    if (value) {
      recentSearchesPlugin.data.addItem({
        id: value,
        label: value,
        _highLightResult: { label: { value: value } },
      });
    }
    autocomplete.setQuery('');
    autocomplete.refresh();
  };

  const handleEnterKeySubmit = (event) => {
    event.preventDefault();
    const value = inputProps.value;
    if (value) {
      recentSearchesPlugin.data.addItem({
        id: value,
        label: value,
        _highLightResult: { label: { value: value } },
      });
      autocomplete.setQuery(value);
    }
    autocomplete.refresh();
  };

  // Query Suggesion Index Definition
  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: `ContentItem_${searchState.church}`,
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ setQuery, item, setIsOpen, refresh, event }) {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(true);
          setQuery(item.title);
          refresh();
        },
      };
    },
  });

  const autocomplete = useMemo(() => {
    return createAutocomplete({
      openOnFocus: true,
      plugins: [querySuggestionsPlugin, recentSearchesPlugin],
      shouldPanelOpen({ state }) {
        return state.query !== '' || state.collections?.length > 0;
      },
      onStateChange({ state, ...props }) {
        // (Mobile Specific Behavior): New keystroke resets the list view scroll to the top
        const panelElement =
          window.innerWidth < MOBILE_BREAKPOINT && state.query !== props.prevState.query
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
      getSources({ query }) {
        if (!query) {
          return [];
        }

        return [
          // (3) Use an Algolia index source.
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
              if (item?.name) {
                return `/?query=${item.name}`;
              } else {
                return item.url;
              }
            },
          },
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
                      hitsPerPage: 8,
                      clickAnalytics: true,
                      // highlightPreTag: '<mark>',
                      // highlightPostTag: '</mark>',
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              if (item?.name) {
                return `/?query=${item.name}`;
              } else {
                return `?id=${getURLFromType(item)}`;
              }
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
  inputProps.onFocus = () => {
    autocomplete.setIsOpen(true);
    autocomplete.refresh();
  };
  formProps.onSubmit = handleEnterKeySubmit;
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
    function openDropdownMenu() {
      document.body.style.overflow = 'hidden';
    }

    function closeDropdownMenu() {
      document.body.style.overflow = '';
    }

    if (autocompleteState.isOpen && window.innerWidth < MOBILE_BREAKPOINT) {
      openDropdownMenu();
    } else {
      closeDropdownMenu();
    }

    setAriaSelectedToFalseOnHover('.aa-List', '.aa-Item', '.empty-feed');

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [autocompleteState.isOpen, autocomplete, setShowTextPrompt]);

  useEffect(() => {
    if (getAutocompleteInstance) {
      getAutocompleteInstance(autocomplete);
    }
  }, [autocomplete]);

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
      </form>
    </div>
  );
}
