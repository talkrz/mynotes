import React, { PropTypes, Component } from 'react';
import TextEditor from './TextEditor';
import './NoteEditor.css';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  onClickOutside(e) {
    const domNode = this.noteEditorEl;
    if (domNode && !domNode.contains(e.target)) {
      this.props.editNoteDone();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside, true);
  }

  render() {
    const expandedShowHide = this.props.isActive ? '' : ' hidden';
    const collapsedShowHide = this.props.isActive ? ' hidden' : '';
    return (
      <div ref={(noteEditor) => { this.noteEditorEl = noteEditor; }}>
        <div className={`NoteEditor${collapsedShowHide}`}>
          <button className="btn NoteEditor-tool" onClick={
            this.props.createNote(this.props.boardId, this.props.notesMaxZ + 1)
          }>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <div className={`NoteEditor NoteEditor-expanded${expandedShowHide}`}>
          <div className="NoteEditor-tools">
            {this.props.colors.map((color, key) => {
              const selectedClass = (this.props.note && this.props.note.color === color)
                ? ' NoteEditor-tool-color-selected'
                : '';
              return (
                <button
                  key={key}
                  onClick={this.props.editNoteChangeColor(this.props.noteKey, color)}
                  className={`btn NoteEditor-tool-color${selectedClass}`}
                  style={{ backgroundColor: color }}>
                </button>
              );
            })}


          </div>
          <div className="NoteEditor-text-editor-container">
            <TextEditor
              editorState={this.props.editorState}
              editorContentChanged={this.props.editorContentChanged(this.props.noteKey)} />
          </div>

          <div className="NoteEditor-tools">
            <button
              className="btn btn-action NoteEditor-tool NoteEditor-tool-delete"
              onClick={this.props.deleteNote(this.props.note ? this.props.note.id : null)}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>

            <button className="btn btn-action NoteEditor-tool NoteEditor-tool-last" onClick={this.props.editNoteDone}>
              <i className="fa fa-check" aria-hidden="true"></i>
            </button>
          </div>

        </div>
      </div>
    );
  }
}

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
