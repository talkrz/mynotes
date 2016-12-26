import React, { PropTypes, Component } from 'react';
import { getBoard, boardResized } from './../../actions/board';
import Note from './../Note/Note';
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(getBoard(this.props.routeParams.boardId));


    const boardElement = document.getElementById('Board');
    dispatch(boardResized(
      boardElement.clientWidth,
      boardElement.clientHeight,
      boardElement.offsetTop,
      boardElement.offsetLeft,
    ));
  }

  render() {
    const viewDimensions = this.props.board.viewDimensions;
    return (
      <div id="Board" className="Board">
        {this.props.board.notes.map((note, key) => (
          <Note
            key={key}
            note={note}
            viewDimensions={viewDimensions} />
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.shape({
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        boardId: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        z: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ),
  }),
};

export default Board;
