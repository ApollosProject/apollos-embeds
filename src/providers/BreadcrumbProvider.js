import PropTypes from 'prop-types';
import React, { createContext, useContext, useReducer } from 'react';

const BreadcrumbStateContext = createContext();
const BreadcrumbDispatchContext = createContext();

const initialState = [];

const actionTypes = {
  add: 'add',
  remove: 'remove',
};

const add = (payload) => ({
  type: 'add',
  payload,
});

const remove = (payload) => ({
  type: 'remove',
  payload,
});

function reducer(state, action) {
  console.log('action', action);
  switch (action.type) {
    case actionTypes.add: {
      return [
        ...state,
        {
          id: state.length
            ? Math.max(...state.map((breadcrumb) => breadcrumb.id)) + 1
            : 0,
          title: action.payload.title,
          url: action.payload.url,
        },
      ];
    }
    case actionTypes.remove: {
      console.log('state', state);
      console.log('action.payload', action.payload);

      const dropRight = (arr, n = 1) => arr.slice(0, -n);
      console.log('dropRight', dropRight(state, action.payload + 1));
      return dropRight(state, action.payload + 1);
    }

    case actionTypes.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function BreadcrumbProvider(props = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BreadcrumbStateContext.Provider value={state}>
      <BreadcrumbDispatchContext.Provider value={dispatch}>
        {props.children}
      </BreadcrumbDispatchContext.Provider>
    </BreadcrumbStateContext.Provider>
  );
}

// const state = useBreadcrumbState();
function useBreadcrumbState() {
  const context = useContext(BreadcrumbStateContext);
  if (context === undefined) {
    throw new Error(
      'useBreadcrumbState must be used within a BreadcrumbProvider'
    );
  }
  return context;
}

// const dispatch = useBreadcrumbDispatch();
function useBreadcrumbDispatch() {
  const context = useContext(BreadcrumbDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useBreadcrumbDispatch must be used within a BreadcrumbProvider'
    );
  }
  return context;
}

// const [state, dispatch] = useBreadcrumb();
function useBreadcrumb() {
  const context = [useBreadcrumbState(), useBreadcrumbDispatch()];
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}

BreadcrumbProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export {
  BreadcrumbProvider as default,
  useBreadcrumb,
  useBreadcrumbState,
  useBreadcrumbDispatch,
  actionTypes,
  add,
  remove,
};