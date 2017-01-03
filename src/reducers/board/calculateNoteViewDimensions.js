/**
 * Calculate note view position (in pixels) from universal
 * position float numbers (0.0-1.0) according to board size
 * @param  {Array}  notes           array of notes objects
 * @param  {Object} boardDimensions board dimensions
 * @return {Array}                  new notes array
 */
function calculateNoteViewDimensions(note, boardDimensions) {
  let left = 0;
  let top = 0;

  if (boardDimensions) {
    left = note.x * (boardDimensions.width - note.viewDimensions.width);
    top = note.y * (boardDimensions.height - note.viewDimensions.height);
  }

  const newNote = Object.assign({}, note, {
    viewDimensions: Object.assign({}, note.viewDimensions, {
      top,
      left,
    }),
  });

  return newNote;
}

export default calculateNoteViewDimensions;
