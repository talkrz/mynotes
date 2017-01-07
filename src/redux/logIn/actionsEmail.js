import server from './../../server/server';

export const emailChange = email => ({
  type: 'EMAIL_CHANGE',
  email,
});

export const validateEmailRequest = email => ({
  type: 'VALIDATE_EMAIL_REQUEST',
  email,
});

export const validateEmailSuccess = () => ({
  type: 'VALIDATE_EMAIL_SUCCESS'
});

export const validateEmailError = errorMessage => ({
  type: 'VALIDATE_EMAIL_ERROR',
  errorMessage,
});

export const validateEmail = () => (
  (dispatch, getState) => {
    const email = getState().logIn.email;

    if (email.length < 5) {
      return dispatch(validateEmailError('Fill in at least 5 letters'));
    }

    dispatch(validateEmailRequest(email));
    server.validateEmail(email)
      .then((response) => {
        if (response.exists === true) {
          dispatch(validateEmailSuccess());
        } else {
          dispatch(validateEmailError('User account for given email not found'));
        }
      })
      .catch((err) => {
        dispatch(validateEmailError(err.message));
      });
  }
);
