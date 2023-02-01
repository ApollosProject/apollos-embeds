import React, { createContext, useContext, useEffect, useReducer } from 'react';

import PropTypes from 'prop-types';

import { theme } from '../ui-kit';

// 2D Array like: [ ["sm", 375], ["md", 750], ... ]
const breakpointEntries = Object.entries(theme.breakpoints);

// An object like: { sm: 0, md: 1, lg: 2, xl: 3 }
const breakpointsOrder = Object.fromEntries(
  breakpointEntries.map(([breakpoint], index) => [breakpoint, index])
);

const smallestBreakpoint = breakpointEntries[0][0];
const largestBreakpoint = breakpointEntries[breakpointEntries.length - 1][0];

const BreakpointStateContext = createContext();
const BreakpointDispatchContext = createContext();

// :: Actions
const actionTypes = {
  update: 'update',
};

const update = (payload) => ({
  type: 'update',
  payload,
});

// :: Reducer
const initialState = {
  breakpoint: smallestBreakpoint,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.update: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled BreakpointProvider action: ${action.type}`);
    }
  }
}

function BreakpointProvider(props = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dimensions = window.innerWidth;

  // Respond to window size changes
  useEffect(() => {
    // Find the biggest breakpoint that fits on screen
    const [breakpoint] = breakpointEntries.find(
      // eslint-disable-next-line no-unused-vars
      ([key, value]) => dimensions.width <= value
    ) || [largestBreakpoint];

    dispatch(update({ breakpoint }));
  }, [dimensions]);

  return (
    <BreakpointStateContext.Provider value={state}>
      <BreakpointDispatchContext.Provider value={dispatch}>
        {props.children}
      </BreakpointDispatchContext.Provider>
    </BreakpointStateContext.Provider>
  );
}

// const state = useBreakpointState();
function useBreakpointState() {
  const context = useContext(BreakpointStateContext);
  if (context === undefined) {
    throw new Error(
      'useBreakpointState must be used within a BreakpointProvider'
    );
  }
  return context;
}

// const dispatch = useBreakpointDispatch();
function useBreakpointDispatch() {
  const context = useContext(BreakpointDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useBreakpointDispatch must be used within a BreakpointProvider'
    );
  }
  return context;
}

function breakpointOptionsSortFn([a], [b]) {
  if (a === '_' || b === '_') {
    return -1;
  }
  return breakpointsOrder[a] - breakpointsOrder[b];
}

/**
 * Sorts an array of breakpoint option entries so they match the order
 * defined in the theme.
 * @example
 * Object.entries({ xl: 10, sm: 4, lg: 8, _: 1 }).sort(sortBreakpointOptions)
 * // [
 * //   ["_", 1],
 * //   ["sm", 4],
 * //   ["lg", 8],
 * //   ["xl", 10],
 * // ]
 */
function sortBreakpointOptions(options) {
  return Object.entries(options).sort(breakpointOptionsSortFn);
}

/**
 * A custom equivalent of what styled-system does internally for responsive
 * style declarations via prop. Does some cascading so values from lower
 * breakpoints "trickle up".
 * @param options Object Keys should be "_" or breakpoints ("sm", "md", etc)
 * @param activeBreakpoint String
 * @example
 * breakpointSelect({ _: 'default' }, 'md') // --> 'default'
 * breakpointSelect({ _: 'default', md: 'medium' }, 'md') // --> 'medium'
 * breakpointSelect({ _: 'default', sm: 'small' }, 'md') // --> 'small'
 * breakpointSelect({ lg: 'large' }, 'sm') // --> undefined
 * breakpointSelect({ lg: 'large' }, 'xl') // --> large
 * breakpointSelect({ lg: 'large', xl: 'extra-large' }, 'xl') // --> extra-large
 */
function breakpointSelect(options, activeBreakpoint) {
  if (!options || !activeBreakpoint) {
    console.warn(
      'Invalid use of `breakpointSelect`, must provide both options and the activeBreakpoint'
    );
    return undefined;
  }

  // Define the initial value, and prepare the options for iteration.
  let selectedValue = '_' in options ? options._ : undefined;
  const optionEntries = sortBreakpointOptions(options);
  const activeBreakpointIndex = breakpointsOrder[activeBreakpoint];

  // Loop over each option in order of breakpoints from small to large,
  // updating `selectedValue` until we reach the first option beyond
  // the active breakpoint.

  // eslint-disable-next-line no-restricted-syntax
  for (const [optionBreakpoint, value] of optionEntries) {
    // Skip over the "_" initializer value
    if (optionBreakpoint === '_') {
      continue; // eslint-disable-line no-continue
    }

    // Stop iterating once we've gone past the active breakpoint
    if (breakpointsOrder[optionBreakpoint] > activeBreakpointIndex) {
      break;
    }

    // Ratchet the value up to this options' value
    selectedValue = value;
  }

  return selectedValue;
}

/**
 * This hook is unconventional, it does not return [state, dispatch].
 * It returns an object
 * @returns `breakpoint` {String} 'sm', 'md', etc
 * @returns `responsive` {Function} A utility function to wrap
 * the `breakpointSelect` function so you don't need to manually pass
 * it the active breakpoint
 */
function useBreakpoint() {
  const { breakpoint } = useBreakpointState();

  return {
    breakpoint,
    responsive: (options) => breakpointSelect(options, breakpoint),
  };
}

BreakpointProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export {
  BreakpointProvider as default,
  useBreakpoint,
  useBreakpointState,
  useBreakpointDispatch,
  breakpointSelect,
  actionTypes,
  update,
};
