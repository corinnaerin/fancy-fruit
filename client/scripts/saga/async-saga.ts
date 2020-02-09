import ApplicationState from '../model/application-state';
import { Store, AnyAction } from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';

export default class AsyncSaga<S, T> {
  private readonly requestActionType: string;
  private readonly successActionType: string;
  private readonly failureActionType: string;
  private readonly asyncFunc: (input: S) => Promise<T>;

  constructor(requestActionType: string, successActionType: string,
      failureActionType: string, asyncFunc: (input: S) => Promise<T>) {
    this.requestActionType = requestActionType;
    this.successActionType = successActionType;
    this.failureActionType = failureActionType;
    this.asyncFunc = asyncFunc;
  }

  public getRequestAction(input?: S): AnyAction {
    return {
      input,
      type: this.requestActionType
    };
  }

  public getSuccessAction(input: S, data: T): AnyAction {
    return {
      data,
      input,
      type: this.successActionType
    };
  }

  public getFailureAction(input: S, error: string): AnyAction {
    return {
      error,
      input,
      type: this.failureActionType
    };
  }

  public * handle(action: AnyAction) {
    try {
      const results = yield call(this.asyncFunc, action.input);
      yield put(this.getSuccessAction(action.input, results));
    } catch (error) {
      console.error(error);
      let errorMessage = 'Unknown error';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      yield put(this.getFailureAction(action.input, errorMessage));
    }
  }

  public * watch(): Generator {
    yield takeEvery(this.requestActionType, this.handle.bind(this));
  }

  public trigger(store: Store<ApplicationState>, input: S): void {
    store.dispatch(this.getRequestAction(input));
  }
}
