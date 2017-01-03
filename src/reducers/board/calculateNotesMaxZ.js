/**
 * Get max z position across the notes
 * @param  {Array} notes notes objects
 * @return {number}      max z value
 */
function calculateNotesMaxZ(notes) {
  return notes.reduce((previous, current) => {
    if (current.z > previous) {
      return current.z;
    }
    return previous;
  }, 0);
}

export default calculateNotesMaxZ;
