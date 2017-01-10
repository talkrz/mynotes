import calculateNotesMaxZ from './calculateNotesMaxZ';
import initializeNotes from './note/initializeNotes';
import calculateNotesViewDimensions from './calculateNotesViewDimensions';

/**
 * Add notes to the board state from board data object and returns new state
 * @param  {Object} state old state
 * @param  {Object} board board data
 * @return {Object}       new state
 */
function showNotes(state, board) {
  const newNotes = calculateNotesViewDimensions(
    initializeNotes(board.notes, state.scale),
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
