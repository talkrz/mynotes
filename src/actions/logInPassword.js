import server from './../server/server';
import storage from './../localStorage/storage';
import { storeAccessCredentials } from './user';
import { push } from 'react-router-redux';

export const passwordChange = (password) => {
    return {
        type: 'PASSWORD_CHANGE',
        password: password
    }
}

export const resetLoginProcess = () => {
    return {
        type: 'RESET_LOGIN_PROCESS'
    }
}

export const logInRequest = (password) => {
    return {
        type: 'LOG_IN_REQUEST',
        password: password
    }
}

export const logInSuccess = () => {
    return {
        type: 'LOG_IN_SUCCESS'
    }
}

export const logInError = (errorMessage) => {
    return {
        type: 'LOG_IN_ERROR',
        errorMessage
    }
}

export const logIn = () => {
    return (dispatch, getState) => {
        const state = getState().logIn;
        const email = state.email;
        const password = state.password;

        if (password.length < 4) {
            return dispatch(logInError('Fill in at least 4 letters'));
        }

        dispatch(logInRequest(password));
        server.logIn(email, password)
            .then(response => {
                if (response.userId) {
                    dispatch(logInSuccess());
                    dispatch(storeAccessCredentials(storage())({
                        userId: response.userId,
                        accessKey: response.key,
                        keyExpiresAt: response.keyExpiresAt,
                        refreshKey: response.refreshKey,
                        refreshKeyExpiresAt: response.refreshKeyExpiresAt
                    }));
                    dispatch(push('/'));
                } else {
                    dispatch(logInError('The password is invalid'));
                }
            })
            .catch(err => {
                dispatch(logInError(err.message));
            })
    }
}
