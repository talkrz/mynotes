import { push } from 'react-router-redux';
import server from './../server/server';
import { addSelfDisappearingMessage } from './messages';

export const getBoardRequest = () => ({
  type: 'GET_BOARD_REQUEST',
});

export const getBoardSuccess = board => ({
  type: 'GET_BOARD_SUCCESS',
  board,
});

export const getBoardError = errorMessage => ({
  type: 'GET_BOARD_ERROR',
  errorMessage,
});

export const getBoard = boardId => (
  (dispatch, getState) => {
    server.getBoard(boardId)
      .then((response) => {
        dispatch(getBoardSuccess({ notes: response }));
      })
      .catch((err) => {
        if (err === 'Unauthorized') {
          dispatch(getBoardError(err));
          dispatch(push('/login'));
        } else {
          throw err;
        }
      })
      .catch((err) => {
        // the need of the logger
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
        dispatch(getBoardError(err.message));
      });
  }
);
