import { push } from 'react-router-redux';
import { removeAccessCredentials } from './../../localStorage/accessCredentials';
import { resetBoard } from './../board/actions';

export const sidemenuOpen = () => ({
  type: 'SIDEMENU_OPEN',
});

export const sidemenuClose = () => ({
  type: 'SIDEMENU_CLOSE',
});

export const setTitle = title => ({
  type: 'SET_TITLE',
  title,
});

export const logout = () => (
  (dispatch) => {
    removeAccessCredentials();
    dispatch(resetBoard());
    dispatch(push('/login'));
  }
);
