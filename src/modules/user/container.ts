import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers';
import { fetchUserAction, addUserAction, countUpAgeAction, deleteUserAction } from './reducer';
import { UserPage } from './components/Page';

const mapStateToProps = (state: State) => ({
  user: state.user,
  lang: state.lang,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (parameters) => dispatch(fetchUserAction(parameters)),
  addUser: (parameters) => dispatch(addUserAction(parameters)),
  countUpAge: (parameters) => dispatch(countUpAgeAction(parameters)),
  deleteUser: (parameters) => dispatch(deleteUserAction(parameters))
});

export const UsersPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
