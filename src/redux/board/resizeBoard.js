import calculateNotesViewDimensions from './calculateNotesViewDimensions';

function resizeBoard(state, { width, height, top, left }) {
  const dimensions = {
    width,
    height,
    top,
    left,
  };
  return Object.assign({}, state, {
    viewDimensions: dimensions,
    notes: calculateNotesViewDimensions(state.notes, dimensions),
  });
}

export default resizeBoard;
