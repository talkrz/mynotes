import { push } from 'react-router-redux';
import server from './../../server/server';
import { addSelfDisappearingMessage } from './../../actions/messages';

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
        // the need of the logger
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
        dispatch(getBoardListError(err.message));
      });
  }
);
