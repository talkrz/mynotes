import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getThumbnail } from './../../../redux/boardList/actions';
import './BoardListItem.css';

class BoardListItem extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(getThumbnail(
      this.props.boardKey,
      this.props.board.id,
      this.thumbnail.offsetWidth,
      this.thumbnail.offsetHeight,
    ));
  }

  render() {
    return (
      <Link className="BoardListItem-container" to={`/boards/${this.props.board.id}`}>
        <div className="BoardListItem-thumbnail" ref={ (el) => { this.thumbnail = el; } }>
          <svg>
            {this.props.boardThumbnail.map((note, noteKey) => (
              <rect
                x={note.x}
                y={note.y}
                width={note.width}
                height={note.height}
                fill={note.color}
                fillOpacity="0.7"
                key={noteKey} />
            ))}
          </svg>
        </div>
        <span className="BoardListItem-link">
          {this.props.board.name}
        </span>
      </Link>
    );
  }
}

BoardListItem.PropTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  boardsThumbnail: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ),
};

export default BoardListItem;
