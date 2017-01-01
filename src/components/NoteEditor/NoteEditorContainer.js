import { connect } from 'react-redux';
import NoteEditor from './NoteEditor';
import { editNoteDone, editorContentChanged } from './../../actions/noteEditor';
import { noteChangeColorAndSave, noteChangeContentAndSave } from './../../actions/board';

const mapStateToProps = state => ({
  note: state.noteEditor.note,
  noteKey: state.noteEditor.noteKey,
  colors: state.noteEditor.colors,
  isActive: state.noteEditor.isActive,
  editorState: state.noteEditor.editorState,
});

const mapDispatchToProps = dispatch => ({
  editNoteDone: () => {
    dispatch(editNoteDone());
  },
  editNoteChangeColor: (noteKey, color) => (() => {
    dispatch(noteChangeColorAndSave(noteKey, color));
  }),
  editorContentChanged: noteKey => (
    (editorState) => {
      dispatch(editorContentChanged(editorState));
      dispatch(noteChangeContentAndSave(noteKey, editorState));
    }
  ),
});

const NoteEditorContainer = connect(mapStateToProps, mapDispatchToProps)(NoteEditor);

export default NoteEditorContainer;
