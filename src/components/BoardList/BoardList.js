import React, { PropTypes, Component } from 'react';
import { getBoardList } from './../../redux/boardList/actions';
import { resetBoard } from './../../redux/board/actions';
import { setTitle, sidemenuClose } from './../../redux/app/actions';
import BoardListItem from './BoardListItem/BoardListItem';
import './BoardList.css';

class BoardList extends Component {

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(resetBoard());
    dispatch(sidemenuClose());
    dispatch(getBoardList());
    dispatch(setTitle(''));
  }

  render() {
    return (
      <div className="BoardList">
        {this.props.boards.map((board, key) => (
          <BoardListItem
            key={key}
            boardKey={key}
            board={board}
            boardThumbnail={this.props.boardsThumbnails[key] !== undefined ? this.props.boardsThumbnails[key] : []}
            dispatch={this.props.dispatch} />
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
  boardsThumbnails: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ),
  ),
};

export default BoardList;
