const initialState = {
  errorMessage: '',
  email: '',
  password: '',
  emailValidationStatus: 'didnt_start',
  logInStatus: 'didnt_start',
};

const logIn = (state = initialState, action) => {
  switch (action.type) {
    case 'EMAIL_CHANGE':
      return Object.assign({}, state, {
        email: action.email,
      });
    case 'VALIDATE_EMAIL_REQUEST':
      return Object.assign({}, state, {
        emailValidationStatus: 'in_progress',
        email: action.email,
      });
    case 'VALIDATE_EMAIL_SUCCESS':
      return Object.assign({}, state, {
        emailValidationStatus: 'success',
        errorMessage: '',
      });
    case 'VALIDATE_EMAIL_ERROR':
      return Object.assign({}, state, {
        emailValidationStatus: 'error',
        errorMessage: action.errorMessage,
      });
    case 'PASSWORD_CHANGE':
      return Object.assign({}, state, {
        password: action.password,
      });
    case 'RESET_LOGIN_PROCESS':
      return Object.assign({}, initialState);
    case 'LOG_IN_REQUEST':
      return Object.assign({}, state, {
        logInStatus: 'in_progress',
        password: action.password,
      });
    case 'LOG_IN_SUCCESS':
      return Object.assign({}, state, {
        logInStatus: 'success',
        errorMessage: '',
      });
    case 'LOG_IN_ERROR':
      return Object.assign({}, state, {
        logInStatus: 'error',
        errorMessage: action.errorMessage,
      });
    default:
      return state;
  }
};

export default logIn;
