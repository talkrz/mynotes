const initialState = {
  notes: [],
  getInProgres: false,
  errorMessage: null,
  viewDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
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
    width: 180,
    height: 180,
    top: 0,
    left: 0,
  },
  isBeingEdited: false,
};

function initializeNotes(notesServerData) {
  const notes = [];

  notesServerData.forEach((noteServerData) => {
    const note = Object.assign({}, noteInitialState, noteServerData);
    notes.push(note);
  });

  return notes;
}

function calculateNotesViewDimensions(notes, boardDimensions) {
  const newNotes = [];
  let left = 0;
  let top = 0;
  notes.forEach((note) => {
    if (boardDimensions) {
      left = note.x * (boardDimensions.width - note.viewDimensions.width) + boardDimensions.left;
      top = note.y * (boardDimensions.height - note.viewDimensions.height) + boardDimensions.top;
    }

    const newNote = Object.assign({}, note, {
      viewDimensions: Object.assign({}, note.viewDimensions, {
        top,
        left,
      }),
    });

    newNotes.push(newNote);
  });

  return newNotes;
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
    case 'BOARD_RESIZED': {
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
    }
    default:
      return state;
  }
};

export default board;
