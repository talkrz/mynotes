import updateNoteState from './boardUtils/updateNoteState';
import addNote from './boardUtils/addNote';
import showNotes from './boardUtils/showNotes';
import resizeBoard from './boardUtils/resizeBoard';

const initialState = {
  id: null,
  notes: [],
  notesMaxZ: 0,
  getInProgres: false,
  saveNoteChangesInProgress: false,
  errorMessage: null,
  viewDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
  scale: 1.0,
  pendingNotesChanges: [],
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD_REQUEST':
      return Object.assign({}, state, {
        getInProgres: true,
      });
    case 'GET_BOARD_SUCCESS':
      return showNotes(state, action.board);
    case 'GET_BOARD_ERROR':
      return Object.assign({}, state, {
        id: null,
        notesMaxZ: 0,
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
      return resizeBoard(state, {
        width: action.width,
        height: action.height,
        top: action.top,
        left: action.left,
      });
    case 'NOTE_MAKE_DRAGGABLE':
      return updateNoteState(state, action.noteId, { isDraggable: true });
    case 'NOTE_MAKE_NOT_DRAGGABLE':
      return updateNoteState(state, action.noteId, { isDraggable: false });
    case 'NOTE_MOVE_STARTED':
      return state;
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
        content: action.content,
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
    case 'CREATE_NOTE_REQUEST':
      return state;
    case 'CREATE_NOTE_ERROR':
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
      });
    case 'CREATE_NOTE_SUCCESS':
      return addNote(state, action.note);
    case 'NOTE_DELETE':
      return Object.assign({}, state, {
        notes: state.notes.filter(n => (n.id !== action.noteId)),
      });
    default:
      return state;
  }
};

export default board;
