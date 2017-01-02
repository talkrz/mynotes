import React, { Component, PropTypes } from 'react';
import './LogIn.css';

class LogInPassword extends Component {
  componentDidMount() {
    this.refs.password.focus();
  }

  render() {
    const handleChange = (event) => {
      this.props.onPasswordChange(event.target.value);
    };

    return (
      <div>
        <div className="LogIn-form-row">
          <p className="LogIn-form-email">{this.props.email}</p>
          <label htmlFor="password">Enter your password:</label>
        </div>
        <div className="LogIn-form-row">
          <input type="password" ref="password" name="password" value={this.props.password} onChange={handleChange} />
          </div>
        <div className="LogIn-form-row LogIn-form-buttons">
          <button className="LogIn-button" onClick={this.props.onBackClick}>Back</button>
          <button className="LogIn-button" onClick={this.props.onLoginClick}>Log in</button>
        </div>
      </div>
    );
  }
}

LogInPassword.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  onPasswordChange: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default LogInPassword;
