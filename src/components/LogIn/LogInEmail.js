import React, { PropTypes } from 'react';
import './LogIn.css';

const LogInEmail = ({ email, errorMessage, onEmailChange, onNextClick }) => {
  const handleChange = (event) => {
    onEmailChange(event.target.value);
  };

  return (
    <div>
      <div className="LogIn-form-row LogIn-form-input">
        <label htmlFor="email">Enter your email:</label>
      </div>
      <div className="LogIn-form-row LogIn-form-input">
        <input type="text" name="email" value={email} onChange={handleChange} />
      </div>
      <div className="LogIn-form-row LogIn-form-buttons">
        <button type="submit" className="LogIn-button" onClick={onNextClick}>Next</button>
      </div>
    </div>
  );
};

LogInEmail.propTypes = {
  email: PropTypes.string,
  errorMessage: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

export default LogInEmail;
