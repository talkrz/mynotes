import { push } from 'react-router-redux';
import server from './../server/server';
import { addSelfDisappearingMessage } from './messages';
import { setTitle } from './app';

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
        dispatch(setTitle(response.name));
        return server.getBoardNotes(boardId);
      })
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
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
        dispatch(getBoardError(err.message));
      });
  }
);

export const boardResized = (width, height, top, left) => ({
  type: 'BOARD_RESIZED',
  width,
  height,
  top,
  left,
});

export const noteMakeDraggable = noteId => ({
  type: 'NOTE_MAKE_DRAGGABLE',
  noteId,
});

export const noteMakeNotDraggable = noteId => ({
  type: 'NOTE_MAKE_NOT_DRAGGABLE',
  noteId,
});

export const noteUpdateRequest = () => ({
  type: 'NOTE_UPDATE_REQUEST',
});

export const noteUpdateSuccess = note => ({
  type: 'NOTE_UPDATE_SUCCESS',
  note,
});

export const noteUpdateError = errorMessage => ({
  type: 'NOTE_UPDATE_ERROR',
  errorMessage,
});

export const noteUpdate = note => (
  (dispatch, getState) => {
    dispatch(noteUpdateRequest());
    server.updateNote(note)
      .then((response) => {
        dispatch(noteUpdateSuccess(response));
      })
      .catch((err) => {
        if (err === 'Unauthorized') {
          dispatch(noteUpdateError(err));
          dispatch(push('/login'));
        } else {
          throw err;
        }
      })
      .catch((err) => {
        dispatch(addSelfDisappearingMessage(err.message, 'error'));
        dispatch(noteUpdateError(err.message));
      });
  }
);

export const noteMoveStarted = noteId => ({
  type: 'NOTE_MOVE_STARTED',
  noteId,
});

export const noteMoveFinished = (noteId, x, y) => ({
  type: 'NOTE_MOVE_FINISHED',
  noteId,
  x,
  y,
});

export const noteMove = (noteId, x, y) => (
  (dispatch, getState) => {
    dispatch(noteMoveFinished(noteId, x, y));
    const note = getState().board.notes[noteId];
    dispatch(noteUpdate(note));
  }
);
