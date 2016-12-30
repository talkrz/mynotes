export const editNote = noteKey => ({
  type: 'EDIT_NOTE',
  noteKey,
});

export const editNoteDone = () => ({
  type: 'EDIT_NOTE_DONE',
});
