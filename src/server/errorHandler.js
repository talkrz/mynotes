const generalErrorMessage = 'Server connection error';

function errorHandler(call) {
  return call()
    .then((response) => {
      if (response.ok === false) {
        throw new Error(generalErrorMessage);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(generalErrorMessage);
    });
}

export default errorHandler;
