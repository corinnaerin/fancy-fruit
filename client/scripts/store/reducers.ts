import ApplicationState from '../model/application-state';
import { AnyAction, Reducer, ReducersMapObject } from 'redux';

export const INITIAL_STATE: ApplicationState = {
  isFetching: false,
  view: 'Search'
};

type SubReducer = (
    state: ApplicationState,
    action: AnyAction
) => ApplicationState;

const requestStart: SubReducer = (state) => {
  return {
    ...state,
    isFetching: true
  };
};

const requestSuccess: SubReducer = (state) => {
  return {
    ...state,
    isFetching: false
  };
};

const requestFailure: SubReducer = (state, action) => {
  return {
    ...state,
    isFetching: false,
    message: {
      type: 'error',
      message: action.error
    }
  };
};

const clearMessage: SubReducer = (state) => {
  return {
    ...state,
    message: undefined
  };
};

const setMessage: SubReducer = (state, action) => {
  return {
    ...state,
    message: action.data
  };
};

const reducers: ReducersMapObject = {
  HEALTHCHECK_REQUEST: requestStart,
  HEALTHCHECK_SUCCESS: requestSuccess,
  HEALTHCHECK_FAILURE: requestFailure,
  CLEAR_MESSAGE: clearMessage,
  SET_MESSAGE: setMessage
};

export const universalReducer: Reducer<ApplicationState> = (state = INITIAL_STATE, action) => {
  const matchingReducer = reducers[action.type];

  if (typeof matchingReducer === 'function') {
    return matchingReducer(state, action);
  }

  if (action.type !== '@@INIT') {
    console.warn(`No reducer registered for action type ${action.type}`);
  }
  return state;
};
