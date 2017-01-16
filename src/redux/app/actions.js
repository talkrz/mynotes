import { push } from 'react-router-redux';
import { removeAccessCredentials } from './../../localStorage/accessCredentials';
import { resetBoard, saveBoardTitle } from './../board/actions';

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

export const editTitle = () => ({
  type: 'EDIT_TITLE',
});

export const finishEditTitle = () => ({
  type: 'FINISH_EDIT_TITLE',
});

export const saveTitle = () => (
  (dispatch, getState) => {
    const title = getState().app.title;
    dispatch(saveBoardTitle(title));
    dispatch(finishEditTitle());
  }
);

export const logout = () => (
  (dispatch) => {
    removeAccessCredentials();
    dispatch(resetBoard());
    dispatch(push('/login'));
  }
);
