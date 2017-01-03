import calculateNotesViewDimensions from './calculateNotesViewDimensions';

function resizeBoard(state, { width, height, top, left }) {
  const dimensions = {
    width,
    height,
    top,
    left,
  };
  /** @todo: fix this */
  const minD = Math.min(width, height);
  const diff = 700 - minD;
  const scale = (diff > 0) ? ((minD) / 700) : 1.0;
  return Object.assign({}, state, {
    viewDimensions: dimensions,
    scale,
    notes: calculateNotesViewDimensions(state.notes, dimensions),
  });
}

export default resizeBoard;
