import React, { PropTypes, Component } from 'react';
import optimizeWindowResize from './../../utils/optimizeWindowResize';
import {
  getBoard,
  boardResized,
  noteMakeDraggable,
  noteMakeNotDraggable,
  noteMoveStarted,
  noteMoveAndSave } from './../../actions/board';
import { editNote } from './../../actions/noteEditor';
import Note from './../Note/Note';
import NoteEditorContainer from './../NoteEditor/NoteEditorContainer';
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    optimizeWindowResize();
  }

  loadBoardNotes() {
    const dispatch = this.props.dispatch;
    dispatch(getBoard(this.props.routeParams.boardId));
    this.setState({
      boardId: this.props.routeParams.boardId,
    });
  }

  componentWillReceiveProps() {
    if (this.state.boardId && this.state.boardId !== this.props.routeParams.boardId) {
      this.loadBoardNotes();
    }
  }

  componentDidMount() {
    const dispatch = this.props.dispatch;
    this.loadBoardNotes();
    const boardElement = document.getElementById('Board');
    const onResize = () => {
      dispatch(boardResized(
        boardElement.clientWidth,
        boardElement.clientHeight,
        boardElement.offsetTop,
        boardElement.offsetLeft,
      ));
    };

    setTimeout(onResize, 300);

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
    const onNoteEdit = noteId => (() => {
      dispatch(editNote(noteId, this.props.board.notes[noteId]));
    });

    return (
      <div id="Board" className="Board">
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
            onNoteEdit={onNoteEdit(key)} />
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
