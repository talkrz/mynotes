import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getBoardList } from './../../redux/boardList/actions';
import { setTitle } from './../../actions/app';
import './BoardList.css';

class BoardList extends Component {

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(getBoardList());
    dispatch(setTitle(''));
  }

  render() {
    return (
      <div className="BoardList">
        {this.props.boards.map((board, key) => (
          <Link className="BoardList-link" to={`/boards/${board.id}`} key={key}>
            {board.name}
          </Link>
        ))}
      </div>
    );
  }
}


BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default BoardList;
