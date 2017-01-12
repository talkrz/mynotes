import calculateNoteViewDimensions from './note/calculateNoteViewDimensions';

/**
 * Resize board and calculate notes position to match new board dimensions
 * @param  {number} state  initial board state
 * @param  {number} width  new board width
 * @param  {number} height new board height
 * @param  {number} top    new board top
 * @param  {number} left   new board left
 * @return {Object}        new board state
 */
function resizeBoard(state, { width, height, top, left }) {
  const dimensions = {
    width,
    height,
    top,
    left,
  };
  return Object.assign({}, state, {
    viewDimensions: dimensions,
    notes: state.notes.map(note => calculateNoteViewDimensions(note, dimensions)),
  });
}

export default resizeBoard;
