import React, { PropTypes, Component } from 'react';
import optimizeWindowResize from './../../utils/optimizeWindowResize';
import {
  getBoard,
  boardResized,
  noteMakeDraggable,
  noteMakeNotDraggable,
  noteMoveStarted,
  noteMoveAndSave,
  noteMoveToTheTopAndSave } from './../../redux/board/actions';
import { editNote } from './../../redux/noteEditor/actions';
import Note from './../Note/Note';
import NoteEditorContainer from './../NoteEditor/NoteEditorContainer';
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    optimizeWindowResize();
  }

  componentWillReceiveProps() {
    const boardState = this.props.board;
    const newBoardId = parseInt(this.props.routeParams.boardId, 0);
    if (boardState.id !== newBoardId) {
      const dispatch = this.props.dispatch;
      dispatch(getBoard(newBoardId));
    }
  }

  componentDidMount() {
    const dispatch = this.props.dispatch;
    const boardElement = this.boardEl;

    dispatch(getBoard(this.props.routeParams.boardId, () => [
      boardElement.clientWidth,
      boardElement.clientHeight,
      boardElement.offsetTop,
      boardElement.offsetLeft,
    ]));

    const onResize = () => {
      dispatch(boardResized(
        boardElement.clientWidth,
        boardElement.clientHeight,
        boardElement.offsetTop,
        boardElement.offsetLeft,
      ));
    };

    window.addEventListener('optimizedResize', onResize);
  }

  render() {
    const dispatch = this.props.dispatch;
    const viewDimensions = this.props.board.viewDimensions;
    const onMouseOverContent = noteId => (() => {
      dispatch(noteMakeNotDraggable(noteId));
    });
    const onMouseOutContent = noteId => (() => {
      dispatch(noteMakeDraggable(noteId));
    });
    const onMoveStart = noteId => (() => {
      dispatch(noteMoveStarted(noteId));
    });
    const onMoveStop = noteId => ((e, data) => {
      dispatch(noteMoveAndSave(noteId, data.x, data.y));
    });
    const onNoteEdit = (noteKey, noteContent) => (() => {
      dispatch(editNote(noteKey, noteContent));
      dispatch(noteMoveToTheTopAndSave(noteKey));
    });

    return (
      <div id="Board" className="Board" ref={(board) => { this.boardEl = board; }}>
        <NoteEditorContainer />
        {this.props.board.notes.map((note, key) => (
          <Note
            key={key}
            noteKey={key}
            note={note}
            viewDimensions={viewDimensions}
            onMouseOverContent={onMouseOverContent(key)}
            onMouseOutContent={onMouseOutContent(key)}
            onMoveStart={onMoveStart(key)}
            onMoveStop={onMoveStop(key)}
            onNoteEdit={onNoteEdit(key, note.content)} />
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        boardId: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        z: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        content: PropTypes.string,
        viewDimensions: PropTypes.shape({
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          top: PropTypes.number.isRequired,
          left: PropTypes.number.isRequired,
        }),
      }),
    ),
    viewDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
  }),
};

export default Board;
