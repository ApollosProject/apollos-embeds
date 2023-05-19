// --------------------------------------------------------------------------------------------------------------------
// -------------------AUTOCOMPLETE WITH INSTANTSEARCH HOOKS INTEGRATED - WITH AUTOCOMPLETE.JS -------------------------
// --------------------------------------------------------------------------------------------------------------------
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  createElement,
  Fragment,
} from 'react';
import { render } from 'react-dom';
import { useSearchBox } from 'react-instantsearch-hooks';
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
        console.log(recentSearches);
        return recentSearches.data.getAlgoliaSearchParams({
          hitsPerPage: 0,
        });
      },
      transformSource({ source }) {
        // console.log(source);
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
      inputWrapperPrefix: 'display: none;',
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

// --------------------------------------------------------------------------------------------------------------------
// -------------------AUTOCOMPLETE WITH INSTANTSEARCH HOOKS INTEGRATED - WITH AUTOCOMPLETE-CORE -----------------------
// --------------------------------------------------------------------------------------------------------------------

// import React, {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   createElement,
//   Fragment,
// } from 'react';
// import { render } from 'react-dom';
// import { useSearchBox } from 'react-instantsearch-hooks';
// import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
// import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
// import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
// import { createAutocomplete } from '@algolia/autocomplete-core';
// // import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
// import algoliasearch from 'algoliasearch/lite';

// const searchClient = algoliasearch(
//   'Z0GWPR8XBE',
//   '251ec8d76f6c62ac793c1337b39bda58'
// );

// export default function Autocomplete() {
//   // (1) Create a React state.
//   const [autocompleteState, setAutocompleteState] = React.useState({});
//   const inputRef = React.useRef(null);
//   useEffect(() => {
//     if (!inputRef.current) {
//       return undefined;
//     }
//   }, [inputRef]);

//   const { query, refine: setQuery } = useSearchBox();

//   const [instantSearchUiState, setInstantSearchUiState] = useState({
//     query,
//   });

//   useEffect(() => {
//     setQuery(instantSearchUiState.query);
//   }, [instantSearchUiState]);

//   const plugins = useMemo(() => {
//     const recentSearches = createLocalStorageRecentSearchesPlugin({
//       key: 'instantsearch',
//       limit: 3,
//       transformSource({ source }) {
//         return {
//           ...source,
//           onSelect({ item }) {
//             setInstantSearchUiState({ query: item.label });
//           },
//         };
//       },
//     });

//     const querySuggestions = createQuerySuggestionsPlugin({
//       searchClient,
//       indexName: 'ContentItem_chase_oaks',
//       getSearchParams() {
//         return recentSearches.data.getAlgoliaSearchParams({
//           hitsPerPage: 6,
//         });
//       },
//       transformSource({ source }) {
//         console.log(source);
//         return {
//           ...source,
//           sourceId: 'querySuggestionsPlugin',
//           onSelect({ item }) {
//             setInstantSearchUiState({ query: item.query });
//           },
//           getItems(params) {
//             if (!params.state.query) {
//               return [];
//             }

//             return source.getItems(params);
//           },
//         };
//       },
//     });

//     return [recentSearches, querySuggestions];
//   }, []);

//   const autocomplete = React.useMemo(
//     () =>
//       createAutocomplete({
//         panelContainer: '#panel',
//         plugins,
//         onReset() {
//           setInstantSearchUiState({ query: '' });
//         },
//         onSubmit({ state }) {
//           setInstantSearchUiState({ query: state.query });
//         },
//         onStateChange({ prevState, state }) {
//           if (prevState.query !== state.query) {
//             setInstantSearchUiState({ query: state.query });
//           }
//           setAutocompleteState(state);
//         },
//         // onStateChange({ state }) {
//         //   // (2) Synchronize the Autocomplete state with the React state.
//         // },
//         getSources() {
//           return [
//             {
//               sourceId: 'products',
//               getItems({ query }) {
//                 return getAlgoliaResults({
//                   searchClient,
//                   queries: [
//                     {
//                       indexName: 'ContentItem_chase_oaks',
//                       query,
//                       params: {
//                         hitsPerPage: 5,
//                         highlightPreTag: '<mark>',
//                         highlightPostTag: '</mark>',
//                       },
//                     },
//                   ],
//                 });
//               },
//               getItemUrl({ item }) {
//                 return item.url;
//               },
//             },
//           ];
//         },
//       }),
//     []
//   );

//   return (
//     <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
//       <form
//         className="aa-Form"
//         {...autocomplete.getFormProps({ inputElement: inputRef.current })}
//       >
//         <div className="aa-InputWrapper">
//           <input
//             className="aa-Input"
//             ref={inputRef}
//             {...autocomplete.getInputProps({})}
//           />
//         </div>
//       </form>
//       <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
//         {autocompleteState.isOpen &&
//           autocompleteState.collections.map((collection, index) => {
//             const { source, items } = collection;
//             console.log(items);

//             return (
//               <div key={`source-${index}`} className="aa-Source">
//                 {items.length > 0 && (
//                   <ul className="aa-List" {...autocomplete.getListProps()}>
//                     {items.map((item) => (
//                       <li
//                         key={item.objectID}
//                         className="aa-Item"
//                         {...autocomplete.getItemProps({
//                           item,
//                           source,
//                         })}
//                       >
//                         {item.name}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// }
