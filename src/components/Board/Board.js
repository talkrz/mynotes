import React, { PropTypes, Component } from 'react';
import { getBoard } from './../../actions/board';
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
    this.setState({
      width: boardElement.clientWidth,
      height: boardElement.clientHeight,
    });
  }

  render() {
    return (
      <div id="Board" className="Board">
        {this.props.board.notes.map((note, key) => (
          <div className="Board-note" key={key} style={{
            backgroundColor: note.color,
            left: note.x * this.state.width,
            top: note.y * this.state.height,
          }}>
          <div className="Board-note-content">{note.content}</div>
          </div>
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
