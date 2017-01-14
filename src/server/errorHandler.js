const generalErrorMessage = 'Server connection error';
const notFoundMessage = 'Not found';

function errorHandler(call) {
  return call()
    .then((response) => {
      if (response.ok === false) {
        if (response.status === 404) {
          throw new Error(notFoundMessage);
        }
        throw new Error(generalErrorMessage);
      }
      return response.json();
    })
    .catch((err) => {
      if (err.message === notFoundMessage) {
        throw new Error(notFoundMessage);
      }
      throw new Error(generalErrorMessage);
    });
}

export default errorHandler;
