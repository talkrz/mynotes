import errorHandler from './errorHandler';
import storage from './../localStorage/storage';

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

function getBoardList() {
  const accessCredentials = storage().getItem('accessCredentials');
  let accessKey = false;
  if (accessCredentials) {
    accessKey = JSON.parse(accessCredentials).key;
  }

  if (!accessKey) {
    return Promise.reject('Unauthorized');
  }

  return errorHandler(() => {
    const headers = new Headers();
    headers.append('X-Auth-Key', accessKey);
    return fetch(`${baseUrl}/boards`, {
      headers,
    });
  });
}

export default {
  validateEmail,
  logIn,
  getBoardList,
};
