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
    dispatch(createBoardRequest());
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

export const deleteBoardRequest = () => ({
  type: 'DELETE_BOARD_REQUEST',
});

export const deleteBoardFinished = () => ({
  type: 'DELETE_BOARD_FINISHED',
});

export const deleteBoard = boardId => (
  (dispatch) => {
    dispatch(deleteBoardRequest());
    server.deleteBoard(boardId)
      .then((response) => {
        dispatch(deleteBoardFinished());

        if (response.status === 'deleted') {
          dispatch(addSelfDisappearingMessage('Board deleted', 'info'));
          dispatch(resetBoard());
          dispatch(getBoardList());
          dispatch(push('/'));
        } else if (response.message === 'Board is not empty') {
          dispatch(addSelfDisappearingMessage('To remove board please remove all notes first', 'info'));
        } else {
          throw new Error(response.message);
        }
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
