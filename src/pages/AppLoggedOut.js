import React, { Component } from 'react';
import logo from './../logo.png';
import './AppLoggedOut.css';
import LogInContainer from './../components/LogIn/LogInContainer';

class AppLoggedOut extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header-logged-out">
                    <img src={logo} className="App-logo-logged-out" alt="logo" />
                </div>
                <div className="App-content-logged-out">
                    <LogInContainer />
                </div>
            </div>
        );
    }
}

export default AppLoggedOut;
