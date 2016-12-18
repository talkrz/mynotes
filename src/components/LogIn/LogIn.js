import React, { PropTypes } from 'react';
import LogInEmail from './LogInEmail';
import LogInPassword from './LogInPassword';
import './LogIn.css';

const LogIn = ({
  email,
  password,
  emailValidationStatus,
  errorMessage,
  onEmailChange,
  onPasswordChange,
  onBackClick,
  onNextClick,
  onLoginClick
}) => {
  let message = '';
  if (errorMessage) {
    message = <p className="LogIn-error">{errorMessage}</p>
  }

  let currentStepComponent = <LogInEmail
    email={email}
    errorMessage={errorMessage}
    onEmailChange={onEmailChange}
    onNextClick={onNextClick} />;

  if (emailValidationStatus === 'success') {
    currentStepComponent = <LogInPassword
      email={email}
      password={password}
      errorMessage={errorMessage}
      onPasswordChange={onPasswordChange}
      onBackClick={onBackClick}
      onLoginClick={onLoginClick} />;
  }

  return (
    <div className="LogIn-form">
      <h2>Log in</h2>
      {message}
      {currentStepComponent}
    </div>
  );
}

LogIn.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string,
  emailValidationStatus: PropTypes.string,
  errorMessage: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default LogIn;
