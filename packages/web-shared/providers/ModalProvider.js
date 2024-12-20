import PropTypes from 'prop-types';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getContentFromURL } from '../utils';

const ModalStateContext = createContext();
const ModalDispatchContext = createContext();

// Define the initial state of the modal
const initialState = {
  isOpen: false,
  content: null,
  modal: true,
};

// Define the actionTypes that can be performed on the modal state
const actionTypes = {
  open: 'open',
  close: 'close',
  set: 'set',
};

const open = () => ({
  type: 'open',
});

const close = () => ({
  type: 'close',
});

const set = (payload) => ({
  type: 'set',
  payload,
});

// Define the reducer function that handles the state changes based on the actions
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.open:
      return { ...state, isOpen: true };
    case actionTypes.close:
      return { ...state, isOpen: false, content: null };
    case actionTypes.set:
      return { ...state, content: getContentFromURL(`${action.payload}`) };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function ModalProvider(props = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState, // spread the original initialState object
    modal: props.modal === 'false' ? false : Boolean(props.modal), // overwrite the modal key with the prop value, if provided
  });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {props.children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

// const state = useModalState();
function useModalState() {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error('useModalState must be used within a ModalProvider');
  }
  return context;
}

// const dispatch = useModalDispatch();
function useModalDispatch() {
  const context = useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error('useModalDispatch must be used within a ModalProvider');
  }
  return context;
}

// const [state, dispatch] = useModal();
function useModal() {
  const context = [useModalState(), useModalDispatch()];
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

ModalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  modal: PropTypes.string,
};

export {
  ModalProvider as default,
  useModal,
  useModalState,
  useModalDispatch,
  actionTypes,
  open,
  close,
  set,
};
