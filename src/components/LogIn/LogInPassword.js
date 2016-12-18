import React, { PropTypes } from 'react'
import './LogIn.css'

const LogInPassword = ({email, password, errorMessage, onPasswordChange, onBackClick, onLoginClick}) => {
    const handleChange = event => {
        onPasswordChange(event.target.value);
    };

    return (
        <div>
            <div className="LogIn-form-row">
                <p className="LogIn-form-email">{email}</p>
                <label htmlFor="password">Enter your password:</label>
            </div>
            <div className="LogIn-form-row">
                <input type="password" name="password" value={password} onChange={handleChange} />
            </div>
            <div className="LogIn-form-row LogIn-form-buttons">
                <button className="LogIn-button" onClick={onBackClick}>Back</button>
                <button className="LogIn-button" onClick={onLoginClick}>Log in</button>
            </div>
        </div>
    )
}

LogInPassword.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    onPasswordChange: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired
}

export default LogInPassword
