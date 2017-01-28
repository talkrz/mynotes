import { push } from 'react-router-redux';
import server from './../../server/server';
import { addSelfDisappearingMessage } from './../../redux/messages/actions';

export const getThumbnailSuccess = (boardKey, thumbnail, width, height) => ({
  type: 'GET_THUMBNAIL_SUCCESS',
  boardKey,
  thumbnail,
  width,
  height,
});

export const getThumbnail = (boardKey, boardId, width, height) => (
  (dispatch, getState) => {
    server.getBoardNotes(boardId)
      .then((response) => {
        dispatch(getThumbnailSuccess(boardKey, response, width, height));
      })
      .catch((err) => {
        if (err === 'Unauthorized') {
          dispatch(push('/login'));
        } else {
          throw err;
        }
      })
      .catch((err) => {
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
      });
  }
);

export const getBoardListRequest = () => ({
  type: 'GET_BOARD_LIST_REQUEST',
});

export const getBoardListSuccess = boards => ({
  type: 'GET_BOARD_LIST_SUCCESS',
  boards,
});

export const getBoardListError = errorMessage => ({
  type: 'GET_BOARD_LIST_ERROR',
  errorMessage,
});

export const getBoardList = () => (
  (dispatch, getState) => {
    server.getBoardList()
      .then((response) => {
        dispatch(getBoardListSuccess(response));
      })
      .catch((err) => {
        if (err === 'Unauthorized') {
          dispatch(getBoardListError(err));
          dispatch(push('/login'));
        } else {
          throw err;
        }
      })
      .catch((err) => {
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
        dispatch(getBoardListError(err.message));
      });
  }
);
