import calculateNotesMaxZ from './calculateNotesMaxZ';
import initializeNotes from './initializeNotes';
import calculateNotesViewDimensions from './calculateNotesViewDimensions';

/**
 * Add notes to the board state from board data object and returns new state
 * @param  {Object} state old state
 * @param  {Object} board board data
 * @param  {number} scale notes scale factor (0.0..1.0)
 * @return {Object}       new state
 */
function showNotes(state, board, scale) {
  const newNotes = calculateNotesViewDimensions(
    initializeNotes(board.notes, scale),
    state.viewDimensions,
  );
  return Object.assign({}, state, {
    id: board.id,
    notesMaxZ: calculateNotesMaxZ(newNotes),
    notes: newNotes,
    getInProgres: false,
    errorMessage: null,
  });
}

export default showNotes;
