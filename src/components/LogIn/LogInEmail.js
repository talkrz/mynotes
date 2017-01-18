import React, { Component, PropTypes } from 'react';
import './LogIn.css';

class LogInEmail extends Component {
  componentDidMount() {
    this.emailElement.focus();
  }

  render() {
    const handleChange = (event) => {
      this.props.onEmailChange(event.target.value);
    };

    return (
      <form onSubmit={(e) => { e.preventDefault(); this.props.onNextClick(); }}>
        <div className="LogIn-form-row LogIn-form-input">
          <label htmlFor="email">Enter your email:</label>
        </div>
        <div className="LogIn-form-row LogIn-form-input">
          <input
            type="email"
            name="email"
            ref={(email) => { this.emailElement = email; }}
            value={this.props.email}
            onChange={handleChange} />
        </div>
        <div className="LogIn-form-row LogIn-form-buttons">
          <button type="submit" className="btn-action LogIn-button">Next</button>
        </div>
      </form>
    );
  }
}

LogInEmail.propTypes = {
  email: PropTypes.string,
  errorMessage: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

export default LogInEmail;
