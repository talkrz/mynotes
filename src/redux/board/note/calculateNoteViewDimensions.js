/**
 * Calculate note view dimensions in pixels from universal units (0.0-1.0)
 * according to the board size
 * @param  {Array}  notes           array of notes objects
 * @param  {Object} boardDimensions board dimensions
 * @return {Array}                  new notes array
 */
function calculateNoteViewDimensions(note, boardDimensions) {
  let left = 0;
  let top = 0;
  let width = 0;
  let height = 0;

  if (boardDimensions && boardDimensions.width && boardDimensions.height) {
    // non-linear scaling to prevent too small notes on small screens
    width = note.width * boardDimensions.width + (20 / (boardDimensions.width * 0.001));
    height = width; // make'em square
    left = note.x * (boardDimensions.width - width);
    top = note.y * (boardDimensions.height - height);
  }

  const newNote = Object.assign({}, note, {
    viewDimensions: {
      top,
      left,
      width,
      height,
    },
  });

  return newNote;
}

export default calculateNoteViewDimensions;
