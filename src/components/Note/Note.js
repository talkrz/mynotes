import React, { PropTypes, Component } from 'react';
import Draggable from 'react-draggable';
import './Note.css';

class Note extends Component {

  render() {
    const noteKey = this.props.noteKey;
    const note = this.props.note;
    const dimensions = this.props.note.viewDimensions;

    return (
      <Draggable
        disabled={!note.isDraggable}
        onStart={this.props.onMoveStart}
        onStop={this.props.onMoveStop}
        position={{ x: dimensions.left, y: dimensions.top }}>

        <div id={`Board-note-${noteKey}`} className="Board-note" style={{
          backgroundColor: note.color,
          width: dimensions.width,
          height: dimensions.height,
          zIndex: note.z,
        }}>
          <button className="Board-note-edit-btn btn">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <div
            className="Board-note-content"
            onMouseOver={this.props.onMouseOverContent}
            onMouseOut={this.props.onMouseOutContent}>
            {note.content}
          </div>
        </div>
      </Draggable>
    );
  }
}

Note.propTypes = {
  note: PropTypes.shape({
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
    isDraggable: PropTypes.bool.isRequired,
  }),
  viewDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }),
  onMouseOverContent: PropTypes.func.isRequired,
  onMouseOutContent: PropTypes.func.isRequired,
  onMoveStart: PropTypes.func.isRequired,
  onMoveStop: PropTypes.func.isRequired,
};

export default Note;
