import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import MessagesContainer from './../components/Messages/MessagesContainer';
import BoardListContainer from './../components/BoardList/BoardListContainer';

class AppLoggedOut extends Component {
  render() {
    return (
      <div className="App">
        <MessagesContainer />
        <div className="App-header">
          <Link className="App-logo" to="/">my notes</Link>
          <span>Board name</span>
        </div>
        <div className="App-content">
          {this.props.children ? this.props.children : <BoardListContainer />}
        </div>
      </div>
    );
  }
}

export default AppLoggedOut;
