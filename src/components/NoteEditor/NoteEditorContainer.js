import { connect } from 'react-redux';
import NoteEditor from './NoteEditor';
import { editNoteDone } from './../../actions/noteEditor';
import { noteChangeColor } from './../../actions/board';

const mapStateToProps = (state) => {
  let note = null;
  let noteKey = null;
  if (state.noteEditor.noteKey !== null) {
    noteKey = state.noteEditor.noteKey;
    note = state.board.notes[noteKey];
  }

  return {
    note,
    noteKey,
    colors: state.noteEditor.colors,
    isActive: state.noteEditor.isActive,
  };
};

const mapDispatchToProps = dispatch => ({
  editNoteDone: () => {
    dispatch(editNoteDone());
  },
  editNoteChangeColor: (noteKey, color) => (() => {
    dispatch(noteChangeColor(noteKey, color));
  }),
});

const NoteEditorContainer = connect(mapStateToProps, mapDispatchToProps)(NoteEditor);

export default NoteEditorContainer;
