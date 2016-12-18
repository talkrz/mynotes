import server from './../server/server';

export const emailChange = (email) => {
    return {
        type: 'EMAIL_CHANGE',
        email: email
    }
}

export const validateEmailRequest = (email) => {
    return {
        type: 'VALIDATE_EMAIL_REQUEST',
        email: email
    }
}

export const validateEmailSuccess = () => {
    return {
        type: 'VALIDATE_EMAIL_SUCCESS'
    }
}

export const validateEmailError = (errorMessage) => {
    return {
        type: 'VALIDATE_EMAIL_ERROR',
        errorMessage
    }
}

export const validateEmail = () => {
    return (dispatch, getState) => {
        const email = getState().logIn.email;

        if (email.length < 5) {
            return dispatch(validateEmailError('Fill in at least 5 letters'));
        }

        dispatch(validateEmailRequest(email));
        server.validateEmail(email)
            .then(response => {
                if (response.exists === true) {
                    dispatch(validateEmailSuccess());
                } else {
                    dispatch(validateEmailError('User account for given email not found'));
                }
            })
            .catch(err => {
                dispatch(validateEmailError(err.message));
            })
    }
}
