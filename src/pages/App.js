import React, { Component } from 'react';
import logo from './../logo.png';
import './App.css';
import BoardListContainer from './../components/BoardList/BoardListContainer';
import MessagesContainer from './../components/Messages/MessagesContainer';

class AppLoggedOut extends Component {
  render() {
    return (
      <div className="App">
        <MessagesContainer />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-content">
          <BoardListContainer />
        </div>
      </div>
    );
  }
}

export default AppLoggedOut;
