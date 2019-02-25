import * as request from '../../api/request';
import { requestAxios } from '../../redux/api'

export const FETCH_TEXT = 'job/FETCH_TEXT';


export const fetchTextAction = () => (dispatch: any) => {
    const parameters = {};
    dispatch(requestAxios(request.getTexts(parameters))).then((response: any) => {
      dispatch({
        type: FETCH_TEXT,
        payload: response,
      });
    });   
};


export const langReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case FETCH_TEXT:      
      return action.payload;
  }

  return state;
};