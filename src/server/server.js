import config from './../config/config.json';
import errorHandler from './errorHandler';
import authorizationHandler from './authorizationHandler';

const baseUrl = process.env.REACT_APP_SERVER_URL || config.serverUrl;

function validateEmail(email) {
  return errorHandler(() => (
    fetch(`${baseUrl}/user/exists?email=${email}`)
  ));
}

function logIn(email, password) {
  return errorHandler(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  });
}

function refreshCredentials(accessCredentials) {
  return errorHandler(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return fetch(`${baseUrl}/accessKey/refresh`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        key: accessCredentials.key,
        refreshKey: accessCredentials.refreshKey,
      }),
    });
  });
}

const getBoardList = () => (
  authorizationHandler(accessKey => (
    errorHandler(() => (
      fetch(`${baseUrl}/boards`, {
        headers: {
          'X-Auth-Key': accessKey,
        },
      })
    ))
  ))
);

const getBoard = boardId => (
  authorizationHandler(accessKey => (
    errorHandler(() => (
      fetch(`${baseUrl}/boards/${boardId}`, {
        headers: {
          'X-Auth-Key': accessKey,
        },
      })
    ))
  ))
);

const updateBoard = ({ id, name }) => (
  authorizationHandler(accessKey => (
    errorHandler(() => (
      fetch(`${baseUrl}/boards/${id}`, {
        method: 'PATCH',
        headers: {
          'X-Auth-Key': accessKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      })
    ))
  ))
);

const getBoardNotes = boardId => (
  authorizationHandler(accessKey => (
    errorHandler(() => (
      fetch(`${baseUrl}/boards/${boardId}/notes`, {
        headers: {
          'X-Auth-Key': accessKey,
        },
      })
    ))
  ))
);


const updateNote = note => (
  authorizationHandler(accessKey => (
    errorHandler(() => (
      fetch(`${baseUrl}/notes/${note.id}`, {
        method: 'PATCH',
        headers: {
          'X-Auth-Key': accessKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          x: note.x,
          y: note.y,
          z: note.z,
          color: note.color,
          content: note.content,
        }),
      })
    ))
  ))
);

const createNote = (boardId, note) => (
  authorizationHandler(accessKey => (
    errorHandler(() => (
      fetch(`${baseUrl}/boards/${boardId}/notes`, {
        method: 'POST',
        headers: {
          'X-Auth-Key': accessKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          x: note.x,
          y: note.y,
          z: note.z,
          color: note.color,
          content: note.content,
        }),
      })
    ))
  ))
);

const deleteNote = noteId => (
  authorizationHandler(accessKey => (
    errorHandler(() => (
      fetch(`${baseUrl}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'X-Auth-Key': accessKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    ))
  ))
);

export default {
  validateEmail,
  logIn,
  refreshCredentials,
  getBoardList,
  getBoard,
  updateBoard,
  getBoardNotes,
  updateNote,
  createNote,
  deleteNote,
};
