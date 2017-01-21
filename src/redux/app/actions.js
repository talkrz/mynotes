import { push } from 'react-router-redux';
import server from './../../server/server';
import pushChange from './../../server/pushChange';
import serverErrorHandler from './../helpers/serverErrorHandler';
import { removeAccessCredentials } from './../../localStorage/accessCredentials';
import { resetBoard } from './../board/actions';
import { addSelfDisappearingMessage } from './../messages/actions';
import { getBoardList } from './../boardList/actions';

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

export const createBoardRequest = () => ({
  type: 'CREATE_BOARD_REQUEST',
});

export const createBoardFinished = board => ({
  type: 'CREATE_BOARD_FINISHED',
  board,
});

export const createBoard = () => (
  (dispatch) => {
    server.createBoard('New board')
      .then((response) => {
        const boardId = response.id;
        if (!boardId) {
          throw new Error('Invalid server response');
        }
        dispatch(createBoardFinished());
        dispatch(getBoardList());
        dispatch(push(`/boards/${boardId}`));
      })
      .catch((err) => {
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
        dispatch(createBoardFinished());
      });
  }
);

export const logout = () => (
  (dispatch) => {
    removeAccessCredentials();
    dispatch(resetBoard());
    dispatch(push('/login'));
  }
);
