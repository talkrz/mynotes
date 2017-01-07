import { connect } from 'react-redux';
import LogIn from './LogIn';
import { emailChange, validateEmail } from './../../redux/logIn/actionsEmail';
import { passwordChange, resetLoginProcess, logIn } from './../../redux/logIn/actionsPassword';

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
