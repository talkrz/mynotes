import { connect } from 'react-redux';
import LogIn from './LogIn';
import { emailChange, validateEmail } from './../../actions/logInEmail';
import { passwordChange, resetLoginProcess, logIn } from './../../actions/logInPassword';

const mapStateToProps = state => ({
  email: state.logIn.email,
  password: state.logIn.password,
  emailValidationStatus: state.logIn.emailValidationStatus,
  errorMessage: state.logIn.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  onEmailChange: (email) => {
    dispatch(emailChange(email));
  },
  onNextClick: () => {
    dispatch(validateEmail());
  },
  onPasswordChange: (password) => {
    dispatch(passwordChange(password));
  },
  onBackClick: () => {
    dispatch(resetLoginProcess());
  },
  onLoginClick: () => {
    dispatch(logIn());
  },
});

const LogInContainer = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default LogInContainer;
