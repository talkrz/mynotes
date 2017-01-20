import server from './server';

/**
 * Saves change to the server
 * @param  {string}  operationType operation type
 * @param  {Object}  data          operation data
 * @return {Promise}               operation response
 */
function saveChange({ operationType, data }) {
  switch (operationType) {
    case 'NOTE_UPDATE':
      return server.updateNote({
        id: data.id,
        ...data,
      });
    case 'NOTE_CREATE':
      return server.createNote(data.boardId, data.note);
    case 'NOTE_DELETE':
      return server.deleteNote(data.id);
    default:
      throw new Error(`Don't know how to perform given operation: ${operationType}`);
  }
}

export default saveChange;
