import React, { PropTypes, Component } from 'react';
import { getBoardList } from './../../actions/boardList';
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
          <a className="BoardList-link" href={`/boards/${board.id}`} key={key}>
            {board.name}
          </a>
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
