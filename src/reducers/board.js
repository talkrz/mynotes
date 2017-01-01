import { convertToRaw } from 'draft-js';
import updateNoteState from './boardUtils/updateNoteState';
import calculateNotesViewDimensions from './boardUtils/calculateNotesViewDimensions';

const initialState = {
  notes: [],
  getInProgres: false,
  saveNoteChangesInProgress: false,
  errorMessage: null,
  viewDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
  pendingNotesChanges: [],
};

const noteInitialState = {
  id: null,
  boardId: null,
  x: 0.0,
  y: 0.0,
  z: 0.0,
  color: '#fff',
  content: '',
  viewDimensions: {
    width: 200,
    height: 200,
    top: 0,
    left: 0,
  },
  isDraggable: true,
};

function initializeNotes(notesServerData) {
  const notes = [];

  notesServerData.forEach((noteServerData) => {
    const note = Object.assign({}, noteInitialState, noteServerData);
    notes.push(note);
  });

  return notes;
}

function convertEditorStateToHtml(editorState) {
  const lines = [];
  const content = editorState.getCurrentContent();
  convertToRaw(content).blocks.forEach((block) => {
    lines.push(block.text);
  });
  return lines.join('<br />');
}

const board = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD_REQUEST':
      return Object.assign({}, state, {
        getInProgres: true,
      });
    case 'GET_BOARD_SUCCESS':
      return Object.assign({}, state, {
        notes: calculateNotesViewDimensions(
          initializeNotes(action.board.notes),
          state.viewDimensions,
        ),
        getInProgres: false,
        errorMessage: null,
      });
    case 'GET_BOARD_ERROR':
      return Object.assign({}, state, {
        notes: [],
        getInProgres: false,
        errorMessage: action.errorMessage,
      });
    case 'SAVE_NOTES_CHANGES_REQUEST':
      return Object.assign({}, state, {
        saveNoteChangesInProgress: true,
      });
    case 'SAVE_NOTES_CHANGES_SUCCESS':
      return Object.assign({}, state, {
        pendingNotesChanges: [],
        saveNoteChangesInProgress: false,
        errorMessage: null,
      });
    case 'SAVE_NOTES_CHANGES_ERROR':
      return Object.assign({}, state, {
        saveNoteChangesInProgress: false,
        errorMessage: action.errorMessage,
      });
    case 'BOARD_RESIZED':
      const dimensions = {
        width: action.width,
        height: action.height,
        top: action.top,
        left: action.left,
      };
      return Object.assign({}, state, {
        viewDimensions: dimensions,
        notes: calculateNotesViewDimensions(state.notes, dimensions),
      });
    case 'NOTE_MAKE_DRAGGABLE':
      return updateNoteState(state, action.noteId, { isDraggable: true });
    case 'NOTE_MAKE_NOT_DRAGGABLE':
      return updateNoteState(state, action.noteId, { isDraggable: false });
    case 'NOTE_MOVE_FINISHED':
      const boardDimensions = state.viewDimensions;
      const note = state.notes[action.noteId];
      const newX = action.x / (boardDimensions.width - note.viewDimensions.width);
      const newY = action.y / (boardDimensions.height - note.viewDimensions.height);
      return updateNoteState(state, action.noteId, {
        x: newX,
        y: newY,
        viewDimensions: {
          width: note.viewDimensions.width,
          height: note.viewDimensions.height,
          left: action.x,
          top: action.y,
        },
      });
    case 'NOTE_CHANGE_COLOR':
      return updateNoteState(state, action.noteId, {
        color: action.color,
      });
    case 'NOTE_CHANGE_CONTENT':
      return updateNoteState(state, action.noteId, {
        content: convertEditorStateToHtml(action.editorState),
      });
    case 'ADD_PENDING_NOTE_CHANGE':
      const pendingNotesChanges = state.pendingNotesChanges.slice();

      pendingNotesChanges.push({
        changeType: action.changeType,
        noteId: action.noteId,
        data: action.data,
      });
      return Object.assign({}, state, {
        pendingNotesChanges,
      });
    case 'NOTE_MOVE_STARTED':
    default:
      return state;
  }
};

export default board;
