import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import './SideMenu.css';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  onClickOutside(e) {
    const domNode = this.sideMenuEl;
    if (!domNode || !domNode.contains(e.target)) {
      this.props.onClickOutside();
    }
  }

  componentDidMount() {
    this.props.onLoad();
    document.addEventListener('click', this.onClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside, true);
  }

  render() {
    const boards = this.props.boards;
    const visibility = this.props.sidemenuOpen ? '' : ' hidden';

    return (
      <div className={`SideMenu${visibility}`} ref={(sideMenu) => { this.sideMenuEl = sideMenu; }}>
        <div className="Header-header SideMenu-header">
          <div className="Header-menu-button">
            <button className="btn" onClick={this.props.onMenuButtonClick}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
          <Link className="Header-logo" to="/">my notes</Link>
        </div>
        <div className="SideMenu-content">
          <ul className="SideMenu-list">
            {boards.map((board, key) => (
              <li key={key}>
                <Link className="SideMenu-link" to={`/boards/${board.id}`}>
                  {board.name}
                  </Link>
              </li>
            ))}
            <li className="SideMenu-separator"></li>
            <li>
              <Link className="SideMenu-link" to="/">
                <i className="fa fa-plus" aria-hidden="true"></i> Add new board
              </Link>
            </li>
            <li className="SideMenu-separator"></li>
            <li>
              <a className="SideMenu-link" onClick={this.props.onLogout} href="#">Logout</a>
            </li>
          </ul>
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
  onMenuButtonClick: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default SideMenu;
