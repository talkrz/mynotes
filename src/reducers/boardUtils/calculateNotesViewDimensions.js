import calculateNoteViewDimensions from './calculateNoteViewDimensions';

/**
 * Calculate notes view position
 * @param  {Array}  notes           array of notes objects
 * @param  {Object} boardDimensions board dimensions
 * @return {Array}                  new notes array
 */
function calculateNotesViewDimensions(notes, boardDimensions) {
  const newNotes = [];
  notes.forEach((note) => {
    newNotes.push(calculateNoteViewDimensions(note, boardDimensions));
  });

  return newNotes;
}

export default calculateNotesViewDimensions;
