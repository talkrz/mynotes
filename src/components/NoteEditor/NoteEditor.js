import React, { PropTypes } from 'react';
import TextEditor from './TextEditor';
import './NoteEditor.css';

const NoteEditor = ({
  boardId,
  notesMaxZ,
  note,
  noteKey,
  colors,
  isActive,
  editorState,
  createNote,
  deleteNote,
  editNoteChangeColor,
  editNoteDone,
  editorContentChanged,
}) => {
  const expandedShowHide = isActive ? '' : ' hidden';
  const collapsedShowHide = isActive ? ' hidden' : '';
  return (
    <div>
      <div className={`NoteEditor${collapsedShowHide}`}>
        <button className="btn NoteEditor-tool" onClick={createNote(boardId, notesMaxZ + 1)}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <div className={`NoteEditor NoteEditor-expanded${expandedShowHide}`}>
        <div className="NoteEditor-tools">
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


        </div>
        <div className="NoteEditor-text-editor-container">
          <TextEditor
            editorState={editorState}
            editorContentChanged={editorContentChanged(noteKey)} />
        </div>

        <div className="NoteEditor-tools">
          <button className="btn NoteEditor-tool NoteEditor-tool-delete" onClick={deleteNote(note ? note.id : null)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>

          <button className="btn NoteEditor-tool NoteEditor-tool-last" onClick={editNoteDone}>
            <i className="fa fa-check" aria-hidden="true"></i>
          </button>
        </div>

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
    content: PropTypes.string,
  }),
  noteKey: PropTypes.number,
  colors: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
  boardId: PropTypes.number,
  notesMaxZ: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
  editorState: PropTypes.object.isRequired,
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  editNoteChangeColor: PropTypes.func.isRequired,
  editNoteDone: PropTypes.func.isRequired,
  editorContentChanged: PropTypes.func.isRequired,
};

export default NoteEditor;
