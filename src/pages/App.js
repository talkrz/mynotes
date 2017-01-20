import React, { Component } from 'react';
import MessagesContainer from './../components/Messages/MessagesContainer';
import SideMenuContainer from './../components/SideMenu/SideMenuContainer';
import HeaderContainer from './../components/Header/HeaderContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MessagesContainer />
        <SideMenuContainer />
        <HeaderContainer />
        <div className="App-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
