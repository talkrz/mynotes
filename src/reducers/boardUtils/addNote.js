import calculateNotesMaxZ from './calculateNotesMaxZ';
import calculateNotesViewDimensions from './calculateNotesViewDimensions';
import noteInitialState from './noteInitialState';
import initializeNotes from './initializeNotes';

function addNote(state, note) {
  const newNotes = state.notes.slice();
  const newNote = Object.assign({}, noteInitialState(), note);
  newNotes.push(newNote);
  return Object.assign({}, state, {
    notesMaxZ: calculateNotesMaxZ(newNotes),
    notes: calculateNotesViewDimensions(
      initializeNotes(newNotes),
      state.viewDimensions,
    ),
  });
}

export default addNote;
