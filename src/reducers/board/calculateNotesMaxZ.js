function calculateNotesMaxZ(notes) {
  let maxZ = 0;
  notes.forEach((note) => {
    if (note.z > maxZ) {
      maxZ = note.z;
    }
  });
  return maxZ;
}
export default calculateNotesMaxZ;
