import { push } from 'react-router-redux';
import { convertToRaw } from 'draft-js';
import server from './../../server/server';
import pushChange from './../../server/pushChange';
import serverErrorHandler from './../helpers/serverErrorHandler';
import { addSelfDisappearingMessage } from './../messages/actions';
import { setTitle, finishEditTitle, sidemenuClose } from './../app/actions';
import { editNoteDone } from './../noteEditor/actions';

function convertEditorStateToHtml(editorState) {
  const lines = [];
  const content = editorState.getCurrentContent();
  convertToRaw(content).blocks.forEach((block) => {
    lines.push(block.text);
  });
  return lines.join('<br />');
}

export const resetBoard = () => ({
  type: 'RESET_BOARD',
});

export const boardResized = (width, height, top, left) => ({
  type: 'BOARD_RESIZED',
  width,
  height,
  top,
  left,
});

export const getBoardRequest = () => ({
  type: 'GET_BOARD_REQUEST',
});

export const getBoardSuccess = board => ({
  type: 'GET_BOARD_SUCCESS',
  board,
});

export const getBoardError = () => ({
  type: 'GET_BOARD_ERROR',
});

export const getBoard = (boardId, getBoardDimensions = null) => (
  (dispatch, getState) => {
    let board = null;
    server.getBoard(boardId)
      .then((response) => {
        board = response;
        return server.getBoardNotes(boardId);
      })
      .then((response) => {
        dispatch(finishEditTitle());
        dispatch(setTitle(board.name));
        dispatch(sidemenuClose());
        dispatch(editNoteDone());
        if (getBoardDimensions) {
          dispatch(boardResized(...getBoardDimensions()));
        }
        dispatch(getBoardSuccess({
          ...board,
          notes: response,
        }));
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

export const noteMakeDraggable = noteId => ({
  type: 'NOTE_MAKE_DRAGGABLE',
  noteId,
});

export const noteMakeNotDraggable = noteId => ({
  type: 'NOTE_MAKE_NOT_DRAGGABLE',
  noteId,
});

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

export const noteMoveAndSave = (noteId, x, y) => (
  (dispatch, getState) => {
    dispatch(noteMoveFinished(noteId, x, y));
    const note = getState().board.notes[noteId];

    serverErrorHandler(
      pushChange({
        operationType: 'NOTE_UPDATE',
        data: { id: note.id, x: note.x, y: note.y },
      }),
      dispatch,
    );
  }
);

export const noteChangeColor = (noteId, color) => ({
  type: 'NOTE_CHANGE_COLOR',
  noteId,
  color,
});

export const noteChangeColorAndSave = (noteId, color) => (
  (dispatch, getState) => {
    dispatch(noteChangeColor(noteId, color));
    const note = getState().board.notes[noteId];

    serverErrorHandler(
      pushChange({
        operationType: 'NOTE_UPDATE',
        data: { id: note.id, color },
      }),
      dispatch,
    );
  }
);

export const noteChangeContent = (noteId, content) => ({
  type: 'NOTE_CHANGE_CONTENT',
  noteId,
  content,
});

export const noteChangeContentAndSave = (noteId, editorState) => (
  (dispatch, getState) => {
    const newContent = convertEditorStateToHtml(editorState);
    const note = getState().board.notes[noteId];

    if (note.content === newContent) {
      return;
    }

    dispatch(noteChangeContent(noteId, newContent));

    serverErrorHandler(
      pushChange({
        operationType: 'NOTE_UPDATE',
        data: { id: note.id, content: newContent },
      }),
      dispatch,
    );
  }
);

export const createNote = note => ({
  type: 'CREATE_NOTE',
  note,
});

export const createNoteAndSave = (boardId, data) => (
  (dispatch, getState) => {
    const note = Object.assign({}, {
      boardId,
      x: 0.5,
      y: 0.5,
      z: 0,
      color: '#ffe45c',
    }, data);

    serverErrorHandler(
      pushChange({
        operationType: 'NOTE_CREATE',
        data: { boardId, note },
      }),
      dispatch,
    ).then((savedNote) => {
      dispatch(createNote(savedNote));
    });
  }
);

export const deleteNote = noteId => ({
  type: 'NOTE_DELETE',
  noteId,
});

export const deleteNoteAndSave = (noteId, color) => (
  (dispatch) => {
    dispatch(deleteNote(noteId, color));
    dispatch(editNoteDone());

    serverErrorHandler(
      pushChange({
        operationType: 'NOTE_DELETE',
        data: { id: noteId },
      }),
      dispatch,
    );
  }
);

export const noteMoveToTheTop = noteKey => ({
  type: 'NOTE_MOVE_TO_THE_TOP',
  noteKey,
});

export const noteMoveToTheTopAndSave = noteKey => (
  (dispatch, getState) => {
    dispatch(noteMoveToTheTop(noteKey));
    const note = getState().board.notes[noteKey];

    serverErrorHandler(
      pushChange({
        operationType: 'NOTE_UPDATE',
        data: { id: note.id, z: note.z },
      }),
      dispatch,
    );
  }
);
