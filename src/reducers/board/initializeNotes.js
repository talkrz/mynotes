import noteInitialState from './noteInitialState';

function initializeNotes(notesServerData, scale) {
  const notes = [];

  notesServerData.forEach((noteServerData) => {
    const note = Object.assign({}, noteInitialState(scale), noteServerData);
    notes.push(note);
  });

  return notes;
}

export default initializeNotes;
