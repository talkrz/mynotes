import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getBoardList } from './../../actions/boardList';
import './SideMenu.css';

class SideMenu extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(getBoardList());
  }
  render() {
    const boards = this.props.boards;
    return (
      <div className="SideMenu">
        <div className="App-header">
          <div className="App-menu-button">
            <button className="btn">
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
};

export default SideMenu;
