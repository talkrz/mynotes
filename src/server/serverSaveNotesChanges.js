import server from './server';

/**
 * Perform note change (create, update, delete) request
 * @param  {string}  changeType type of action ('CREATE', 'UPDATE' or 'DELETE')
 * @param  {integer} noteId     note id (in the server)
 * @param  {Object}  data       note data
 * @return {Promise}
 */
function saveChange({ changeType, noteId, data }) {
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

/**
 * Perform multiple notes changes requests and return promise fulfilled
 * when all equests are done
 * @param  {Array}   changes list of changes to perform
 * @return {Promise}
 */
function serverSaveNotesChanges(changes) {
  const pendingRequests = [];
  changes.forEach((change) => {
    pendingRequests.push(saveChange(change));
  });

  return Promise.all(pendingRequests);
}

export default serverSaveNotesChanges;
