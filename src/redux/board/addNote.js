import calculateNotesMaxZ from './calculateNotesMaxZ';
import calculateNoteViewDimensions from './calculateNoteViewDimensions';
import noteInitialState from './note/noteInitialState';

/**
 * Add new note to board state
 * @param  {Object}  state board state
 * @param  {Object}  note  note data
 * @return {Object}  new state
 */
function addNote(state, note) {
  const newNotes = state.notes.slice();
  const newNote = Object.assign({}, noteInitialState(state.scale), note);
  newNotes.push(calculateNoteViewDimensions(newNote, state.viewDimensions));
  return Object.assign({}, state, {
    notesMaxZ: calculateNotesMaxZ(newNotes),
    notes: newNotes,
  });
}

export default addNote;
