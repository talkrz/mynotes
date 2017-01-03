import updateNoteState from './updateNoteState';

function moveNote(state, noteId, x, y) {
  const boardDimensions = state.viewDimensions;
  const note = state.notes[noteId];
  const newX = x / (boardDimensions.width - note.viewDimensions.width);
  const newY = y / (boardDimensions.height - note.viewDimensions.height);
  return updateNoteState(state, noteId, {
    x: newX,
    y: newY,
    viewDimensions: {
      width: note.viewDimensions.width,
      height: note.viewDimensions.height,
      left: x,
      top: y,
    },
  });
}

export default moveNote;
