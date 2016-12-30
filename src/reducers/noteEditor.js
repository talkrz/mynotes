const initialState = {
  colors: [
    '#4ac7f0',
    '#56c656',
    '#ffe45c',
    '#ff887c',
    '#ff81a8',
    '#69d9b7',
    '#d6a66c',
    '#6cb4d6',
    '#d6d982',
    '#f2f2f2',
  ],
  isActive: false,
  noteKey: null,
};

const noteEditor = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_NOTE':
      return Object.assign({}, state, {
        isActive: true,
        noteKey: action.noteKey,
      });
    case 'EDIT_NOTE_DONE':
      return Object.assign({}, state, {
        isActive: false,
        noteKey: null,
      });
    default:
      return state;
  }
};

export default noteEditor;
