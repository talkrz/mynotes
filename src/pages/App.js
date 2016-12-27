import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import MessagesContainer from './../components/Messages/MessagesContainer';
import SideMenuContainer from './../components/SideMenu/SideMenuContainer';
import BoardListContainer from './../components/BoardList/BoardListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MessagesContainer />
        <SideMenuContainer />
        <div className="App-header">
          <div className="App-menu-button">
            <button className="btn" onClick={this.props.onMenuButtonClick}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
          <Link className="App-logo" to="/">my notes</Link>
          <span className="App-title">Board name</span>
        </div>
        <div className="App-content">
          {this.props.children ? this.props.children : <BoardListContainer />}
        </div>
      </div>
    );
  }
}

export default App;
