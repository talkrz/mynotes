export const editNote = (noteKey, content) => ({
  type: 'EDIT_NOTE',
  noteKey,
  content,
});

export const editNoteDone = () => ({
  type: 'EDIT_NOTE_DONE',
});

export const editorContentChanged = editorState => ({
  type: 'EDITOR_CONTENT_CHANGED',
  editorState,
});
