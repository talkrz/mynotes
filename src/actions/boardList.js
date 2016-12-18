import server from './../server/server';
import { addSelfDisappearingMessage } from './messages';

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
    const userState = getState().user;
    server.getBoardList(userState)
      .then((response) => {
        dispatch(getBoardListSuccess(response));
      })
      .catch((err) => {
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
        dispatch(getBoardListError(err.message));
      });
  }
);
