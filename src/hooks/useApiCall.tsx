import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { PRISTINE, PENDING, COMPLETE, ERROR, FetchStatusesEnum } from 'constants/fetch-statuses';

enum ApiCallEnum {
  API_CALL_START = 'API_CALL_START',
  API_CALL_SUCCESS = 'API_CALL_SUCCESS',
  API_CALL_FAIL = 'API_CALL_FAIL',
}

interface IState {
  fetchStatus:FetchStatusesEnum,
  payload:any
}

interface IReducerAction {
  type:ApiCallEnum,
  payload?:any
}

const API_CALL_START = ApiCallEnum.API_CALL_START;
const API_CALL_SUCCESS = ApiCallEnum.API_CALL_SUCCESS;
const API_CALL_FAIL = ApiCallEnum.API_CALL_FAIL;

const reducer = (state:IState, { type, payload }:IReducerAction) => {
  switch (type) {
    case API_CALL_START:
      return { ...state, fetchStatus: PENDING };
    case API_CALL_SUCCESS:
      return { fetchStatus: COMPLETE, payload };
    case API_CALL_FAIL:
      return { ...state, fetchStatus: ERROR };
    default:
      throw new Error();
  }
};

/**
 * @typedef {Array} useApiCall - useApiCall return array structure
 * @property {String} fetchStatus - fetch status of provided request
 * @property {Function} makeApiCall - runs provided request
 * @property {*} payload - fetch result
 */

/**
 * Handles provided API request
 * @return {Array} - array that contains request fetch status and request itself
 */

export const useApiCall = (request:Function, expectedDataType?:any) => {
  const [state, dispatch] = useReducer<React.Reducer<IState, IReducerAction>>(reducer, {
    fetchStatus: PRISTINE, payload: expectedDataType
  });

  const isCanceled = useRef(false);

  useEffect(() => {
    return () => { isCanceled.current = true; };
  }, []);

  const makeApiCall = useCallback(
    (...requestParams) => {
      dispatch({ type: API_CALL_START });
      return request(...requestParams)
        .then((result:any) => {
          !isCanceled.current && (dispatch({ type: API_CALL_SUCCESS, payload: result }));
          return Promise.resolve(result);
        })
        .catch((error:any) => {
          !isCanceled.current && dispatch({ type: API_CALL_FAIL });
          return Promise.reject(error);
        });
    },
    [request]
  );

  return [state.fetchStatus, makeApiCall, state.payload];
};
