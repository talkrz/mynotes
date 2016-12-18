const baseUrl = 'http://localhost:3001';

const generalErrorMessage = 'Server connection error';

function errorHandler(call) {
    return call()
        .then(response => {
            if (response.ok === false) {
                throw new Error(generalErrorMessage);
            }
            return response.json();
        })
        .catch(err => {
            throw new Error(generalErrorMessage);
        });
}

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
          headers: headers,
          body: JSON.stringify({
              email: email,
              password: password
          })
        });
    });
}

function getBoardList({ userId, accessKey }) {
    const headers = new Headers();
    headers.append('X-Auth-Key', accessKey);

    return errorHandler(() => {
        return fetch(`${baseUrl}/boards`, {
            headers: headers
        });
    });
}

export default {
    validateEmail,
    logIn,
    getBoardList
}
