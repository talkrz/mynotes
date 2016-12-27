import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import './SideMenu.css';

class SideMenu extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const boards = this.props.boards;
    const visibility = this.props.sidemenuOpen ? '' : ' hidden';
    return (
      <div className={`SideMenu${visibility}`}>
        <div className="App-header">
          <div className="App-menu-button">
            <button className="btn" onClick={this.props.onMenuButtonClick}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
          <Link className="App-logo" to="/">my notes</Link>
        </div>
        <div className="SideMenu-content">
          {boards.map((board, key) => (
            <a className="SideMenu-link" href={`/boards/${board.id}`} key={key}>
              {board.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

SideMenu.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  sidemenuOpen: PropTypes.bool.isRequired,
};

export default SideMenu;
