/**
 * Update given props in the note, returns new updated state
 * @param  {Object} state        [description]
 * @param  {int}    notePosition [description]
 * @param  {Object} data         [description]
 * @return {Object}              [description]
 */
function updateNoteState(state, notePosition, data) {
  const newNotes = state.notes.slice();
  newNotes[notePosition] = Object.assign({}, newNotes[notePosition], data);
  return Object.assign({}, state, {
    notes: newNotes,
  });
}

export default updateNoteState;
