import noteInitialState from './noteInitialState';

function initializeNotes(notesServerData) {
  const notes = [];

  notesServerData.forEach((noteServerData) => {
    const note = Object.assign({}, noteInitialState(), noteServerData);
    notes.push(note);
  });

  return notes;
}

export default initializeNotes;
