import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const SearchStateContext = createContext();
const SearchDispatchContext = createContext();

// Define the initial state of the search
const initialState = {
  church: null,
  searchFeed: null,
  customPrompt: null,
  loading: true,
};

// Define the actionTypes that can be performed on the search state
const actionTypes = {
  set: 'set',
};

const set = (payload) => ({
  type: 'set',
  payload,
});

// Define the reducer function that handles the state changes based on the actions
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.set:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function SearchProvider(props = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState, // spread the original initialState object
    church: props.church, // add church to state
    searchFeed: props.searchFeed, // add search feed id to state
    customPrompt: props.customPrompt, // add search custom prompt to state
  });

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {props.children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

// const state = useSearchState();
function useSearchState() {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error('useSearchState must be used within a SearchProvider');
  }
  return context;
}

// const dispatch = useSearchDispatch();
function useSearchDispatch() {
  const context = useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error('useSearchDispatch must be used within a SearchProvider');
  }
  return context;
}

// const [state, dispatch] = useSearch();
function useSearch() {
  const context = [useSearchState(), useSearchDispatch()];
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

SearchProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export {
  SearchProvider as default,
  useSearch,
  useSearchState,
  useSearchDispatch,
  actionTypes,
  set,
};
