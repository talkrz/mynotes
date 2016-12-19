import { push } from 'react-router-redux';
import { storeAccessCredentials } from './../localStorage/accessCredentials';
import server from './../server/server';

export const passwordChange = password => ({
  type: 'PASSWORD_CHANGE',
  password,
});

export const resetLoginProcess = () => ({
  type: 'RESET_LOGIN_PROCESS',
});

export const logInRequest = password => ({
  type: 'LOG_IN_REQUEST',
  password,
});

export const logInSuccess = () => ({
  type: 'LOG_IN_SUCCESS',
});

export const logInError = errorMessage => ({
  type: 'LOG_IN_ERROR',
  errorMessage,
});

export const logIn = () => (
  (dispatch, getState) => {
    const state = getState().logIn;
    const email = state.email;
    const password = state.password;

    if (password.length < 4) {
      return dispatch(logInError('Fill in at least 4 letters'));
    }

    dispatch(logInRequest(password));
    server.logIn(email, password)
      .then((response) => {
        if (response.userId) {
          dispatch(logInSuccess());
          storeAccessCredentials({
            key: response.key,
            keyExpiresAt: response.keyExpiresAt,
            refreshKey: response.refreshKey,
            refreshKeyExpiresAt: response.refreshKeyExpiresAt,
          });
          dispatch(push('/'));
        } else {
          dispatch(logInError('The password is invalid'));
        }
      })
      .catch((err) => {
        dispatch(logInError(err.message));
      });
  }
);
