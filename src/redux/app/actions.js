import { push } from 'react-router-redux';
import pushChange from './../../server/pushChange';
import serverErrorHandler from './../helpers/serverErrorHandler';
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

export const editTitle = () => ({
  type: 'EDIT_TITLE',
});

export const finishEditTitle = () => ({
  type: 'FINISH_EDIT_TITLE',
});

export const saveTitle = () => (
  (dispatch, getState) => {
    const name = getState().app.title;
    const id = getState().board.id;

    serverErrorHandler(
      pushChange({
        operationType: 'BOARD_UPDATE',
        data: { id, name },
      }),
      dispatch,
    );
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
