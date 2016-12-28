import errorHandler from './errorHandler';
import authorizationHandler from './authorizationHandler';

const baseUrl = 'http://localhost:3001';

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

export default {
  validateEmail,
  logIn,
  refreshCredentials,
  getBoardList,
  getBoard,
  updateNote,
};
