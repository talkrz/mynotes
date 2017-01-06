import { EditorState, ContentState, convertFromHTML } from 'draft-js';

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
  editorState: EditorState.createEmpty(),
};

function initEditorState(content) {
  const blocksFromHTML = convertFromHTML(content);
  const state = ContentState.createFromBlockArray(blocksFromHTML);
  return EditorState.createWithContent(state);
}

const noteEditor = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_NOTE':
      return Object.assign({}, state, {
        isActive: true,
        noteKey: action.noteKey,
        editorState: initEditorState(action.content),
      });
    case 'EDIT_NOTE_DONE':
      return Object.assign({}, state, {
        isActive: false,
        noteKey: null,
        editorState: EditorState.createEmpty(),
      });
    case 'EDITOR_CONTENT_CHANGED':
      return Object.assign({}, state, {
        editorState: action.editorState,
      });
    default:
      return state;
  }
};

export default noteEditor;
