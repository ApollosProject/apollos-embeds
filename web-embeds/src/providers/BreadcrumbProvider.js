import PropTypes from 'prop-types';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BreadcrumbStateContext = createContext();
const BreadcrumbDispatchContext = createContext();

const initialState = [];

const actionTypes = {
  add: 'add',
  remove: 'remove',
  reset: 'reset',
  set: 'set',
};

const add = (payload) => ({
  type: 'add',
  payload,
});

const remove = (payload) => ({
  type: 'remove',
  payload,
});

const set = (payload) => ({
  type: 'set',
  payload,
});

const reset = () => ({
  type: 'reset',
});

function reducer(state, action) {
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
      // Probably should move dropRight to utils
      const dropRight = (arr, n = 1) => {
        const amountToDrop = arr.length - (n + 1);
        return arr.slice(0, -amountToDrop);
      };

      return dropRight(state, action.payload);
    }
    case actionTypes.set: {
      return action.payload;
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

  useEffect(() => {
    const handlePopstate = () => {
      const newBreadcrumbHistory =
        window.history.state?.breadcrumbHistory || [];
      dispatch(set(newBreadcrumbHistory));
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  useEffect(() => {
    const breadcrumbHistory = state.map((breadcrumb) => ({
      id: breadcrumb.id,
      title: breadcrumb.title,
      url: breadcrumb.url,
    }));
    window.history.replaceState(
      { ...window.history.state, breadcrumbHistory },
      ''
    );
  }, [state]);

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
  reset,
  set,
};
