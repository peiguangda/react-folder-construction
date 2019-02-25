import { combineReducers } from 'redux';
import { UserEntity } from '../modules/user/types';
import { userReducer } from '../modules/user/reducer';
import { ApiEntity } from '../common/types';
import { apiReducer } from './api';
import { langReducer } from '../modules/trans/reducer';
import { reducer as reduxFormReducer } from 'redux-form';

export interface State {
  api: ApiEntity;
  lang: object;
  user: UserEntity;
  form: any;
};

export const state = combineReducers<State>({
  api: apiReducer,
  lang: langReducer,
  user: userReducer,
  form: reduxFormReducer
});
