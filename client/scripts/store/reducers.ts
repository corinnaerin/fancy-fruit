import ApplicationState from '../model/application-state';
import { AnyAction, Reducer, ReducersMapObject } from 'redux';
import moment from 'moment';

export const INITIAL_STATE: ApplicationState = {
  isFetching: false,
  view: 'Search',
  sales: [],
  searchQuery: {}
};

type SubReducer = (
    state: ApplicationState,
    action: AnyAction
) => ApplicationState;

const requestStart: SubReducer = (state): ApplicationState => {
  return {
    ...state,
    isFetching: true
  };
};

const requestSuccess: SubReducer = (state): ApplicationState => {
  return {
    ...state,
    isFetching: false
  };
};

const requestFailure: SubReducer = (state, action): ApplicationState => {
  return {
    ...state,
    isFetching: false,
    message: {
      type: 'error',
      message: action.error
    }
  };
};

const clearMessage: SubReducer = (state): ApplicationState => {
  return {
    ...state,
    message: undefined
  };
};

const setMessage: SubReducer = (state, action): ApplicationState => {
  return {
    ...state,
    message: action.data
  };
};

const setSales: SubReducer = (state, action): ApplicationState => {
  return {
    ...state,
    isFetching: false,
    sales: action.data
  };
};

const setStartDate: SubReducer = (state, action): ApplicationState => {
  return {
    ...state,
    searchQuery: {
      ...state.searchQuery,
      startDate: action.startDate ? moment(action.startDate) : undefined
    }
  };
};

const setEndDate: SubReducer = (state, action): ApplicationState => {
  return {
    ...state,
    searchQuery: {
      ...state.searchQuery,
      endDate: action.endDate ? moment(action.endDate) : undefined
    }
  };
};

const reducers: ReducersMapObject = {
  HEALTHCHECK_REQUEST: requestStart,
  HEALTHCHECK_SUCCESS: requestSuccess,
  HEALTHCHECK_FAILURE: requestFailure,
  SALES_REQUEST: requestStart,
  SALES_SUCCESS: setSales,
  SALES_FAILURE: requestFailure,
  CLEAR_MESSAGE: clearMessage,
  SET_MESSAGE: setMessage,
  SET_START_DATE: setStartDate,
  SET_END_DATE: setEndDate
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
