import React, { PropTypes } from 'react';
import './NoteEditor.css';

const NoteEditor = ({ note, noteKey, colors, isActive, editNoteChangeColor, editNoteDone }) => {
  const expandedShowHide = isActive ? '' : ' hidden';
  const collapsedShowHide = isActive ? ' hidden' : '';
  return (
    <div>
      <div className={`NoteEditor${collapsedShowHide}`}>
        <button className="btn NoteEditor-tool">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <div className={`NoteEditor NoteEditor-expanded${expandedShowHide}`}>
        <button className="btn NoteEditor-tool">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>

        {colors.map((color, key) => {
          const selectedClass = (note && note.color === color) ? ' NoteEditor-tool-color-selected' : '';
          return (
            <button
              key={key}
              onClick={editNoteChangeColor(noteKey, color)}
              className={`btn NoteEditor-tool-color${selectedClass}`}
              style={{ backgroundColor: color }}>
            </button>
          );
        })}

        <button className="btn NoteEditor-tool NoteEditor-tool-delete">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>

        <button className="btn NoteEditor-tool NoteEditor-tool-last" onClick={editNoteDone}>
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>

      </div>
    </div>
  );
};

NoteEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  noteKey: PropTypes.number,
  colors: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
  isActive: PropTypes.bool.isRequired,
  editNoteChangeColor: PropTypes.func.isRequired,
  editNoteDone: PropTypes.func.isRequired,
};

export default NoteEditor;
