import server from './server';

function saveChange({ changeType, noteId, data }) {
  console.log(changeType, noteId, data)
  switch (changeType) {
    case 'UPDATE':
      return server.updateNote({
        id: noteId,
        ...data,
      });
    default:
      return Promise.resolve();
  }
}

function serverSaveNotesChanges(changes) {
  const pendingRequests = [];
  changes.forEach((change) => {
    pendingRequests.push(saveChange(change));
  });

  return Promise.all(pendingRequests);
}

export default serverSaveNotesChanges;
