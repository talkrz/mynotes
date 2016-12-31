export const editNote = (noteKey, note) => ({
  type: 'EDIT_NOTE',
  noteKey,
  note,
});

export const editNoteDone = () => ({
  type: 'EDIT_NOTE_DONE',
});

export const editorContentChanged = editorState => ({
  type: 'EDITOR_CONTENT_CHANGED',
  editorState,
});
