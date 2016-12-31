import { connect } from 'react-redux';
import NoteEditor from './NoteEditor';
import { editNoteDone, editorContentChanged } from './../../actions/noteEditor';
import { noteChangeColor, noteChangeContent } from './../../actions/board';

const mapStateToProps = state => {
  return {
    note: state.noteEditor.note,
    noteKey: state.noteEditor.noteKey,
    colors: state.noteEditor.colors,
    isActive: state.noteEditor.isActive,
    editorState: state.noteEditor.editorState,
  };
};

const mapDispatchToProps = dispatch => ({
  editNoteDone: () => {
    dispatch(editNoteDone());
  },
  editNoteChangeColor: (noteKey, color) => (() => {
    dispatch(noteChangeColor(noteKey, color));
  }),
  editorContentChanged: (noteKey) => {
    return (editorState) => {
      dispatch(editorContentChanged(editorState));
      dispatch(noteChangeContent(noteKey, editorState));
    }
  },
});

const NoteEditorContainer = connect(mapStateToProps, mapDispatchToProps)(NoteEditor);

export default NoteEditorContainer;
