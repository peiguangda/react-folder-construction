import { UserEntity } from './types';
import * as request from '../../api/request';
import { requestAxios } from '../../redux/api'
import { assign } from "lodash";

export const FETCH_USER = 'user/FETCH_USER';
export const FETCH_USER_ERROR = 'user/FETCH_USER_ERROR';
export const ADD_USER = 'user/ADD_USER';
export const ADD_USER_ERROR = 'user/ADD_USER_ERROR';
export const COUNT_UP_AGE = 'user/COUNT_UP_AGE';
export const COUNT_UP_AGE_ERROR = 'user/COUNT_UP_AGE_ERROR';
export const DELETE_USER = 'user/DELETE_USER';
export const DELETE_USER_ERROR = 'user/DELETE_USER_ERROR';

const initState = {
  userList: {
    users: [],
    totalRecord: null
  }
}
export const fetchUserAction = (parameters) => (dispatch) => {
  return dispatch(requestAxios(request.getUsers(parameters)))
    .then(response => {
      dispatch({
        type: FETCH_USER,
        payload: response
      });
      return response;
    })
    .catch(error => {
      dispatch({
        type: FETCH_USER_ERROR,
        payload: [],
        responseError: error
      });
      throw error;
    });   
};

export const addUserAction = (parameters) => (dispatch) => {
  return dispatch(requestAxios(request.addUser(parameters)))
    .then(response => {
      dispatch({
        type: ADD_USER,
        payload: parameters
      });
      return response;
    })
    .catch(error => {
      dispatch({
        type: ADD_USER_ERROR,
        payload: {},
        responseError: error
      });
      throw error;
    });   
};

export const countUpAgeAction = (parameters) => (dispatch) => {
  return dispatch(requestAxios(request.countUpAge(parameters)))
    .then(response => {
      dispatch({
        type: COUNT_UP_AGE,
        payload: parameters
      });
      return response;
    })
    .catch(error => {
      dispatch({
        type: COUNT_UP_AGE_ERROR,
        payload: {},
        responseError: error
      });
      throw error;
    });   
};

export const deleteUserAction = (parameters) => (dispatch) => {
  return dispatch(requestAxios(request.deleteUser(parameters)))
    .then(response => {
      dispatch({
        type: DELETE_USER,
        payload: parameters
      });
      return parameters;
    })
    .catch(error => {
      dispatch({
        type: DELETE_USER_ERROR,
        payload: {},
        responseError: error
      });
      throw error;
    });   
};


export const userReducer = (state : any = initState, action) => {
  state = { ...state, actionType: action.type };
  switch (action.type) {
    case FETCH_USER:
      return assign({}, state, {
        userList: action.payload
      });
    
    case ADD_USER:
    case COUNT_UP_AGE:
    case COUNT_UP_AGE_ERROR:
    case DELETE_USER:
    case DELETE_USER_ERROR:
      return assign({}, state);
    
      default:
      return state;
  }
};
