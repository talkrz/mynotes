import React, { PropTypes, Component } from 'react';
import './Note.css';

class Note extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    const noteElement = document.getElementById(`Board-note-${this.props.note.id}`);

    this.setState({
      width: noteElement.clientWidth,
      height: noteElement.clientHeight,
    });
  }

  render() {
    const note = this.props.note;
    const dimensions = this.props.viewDimensions;
    let left = 0;
    let top = 0;
    if (dimensions) {
      left = note.x * (dimensions.width - this.state.width) + dimensions.left;
      top = note.y * (dimensions.height - this.state.height) + dimensions.top;
    }
    return (
      <div id={`Board-note-${note.id}`} className="Board-note" style={{
        backgroundColor: note.color,
        left,
        top,
      }}>
        <div className="Board-note-content">{note.content}</div>
      </div>
    );
  }
}

Note.propTypes = {
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
  viewDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }),
};

export default Note;
