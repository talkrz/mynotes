import React, { PropTypes, Component } from 'react';
import Draggable from 'react-draggable';
import './Note.css';

class Note extends Component {

  render() {
    const note = this.props.note;
    const dimensions = this.props.note.viewDimensions;

    return (
      <Draggable disabled={false}>
        <div id={`Board-note-${note.id}`} className="Board-note" style={{
          backgroundColor: note.color,
          left: dimensions.left,
          top: dimensions.top,
          width: dimensions.width,
          height: dimensions.height,
          zIndex: note.z,
        }}>
          <button className="Board-note-edit-btn btn">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <div className="Board-note-content">{note.content}</div>
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
  }),
  viewDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }),
};

export default Note;
