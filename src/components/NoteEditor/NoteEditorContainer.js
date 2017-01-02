import { connect } from 'react-redux';
import NoteEditor from './NoteEditor';
import { editNoteDone, editorContentChanged } from './../../actions/noteEditor';
import {
  noteChangeColorAndSave,
  noteChangeContentAndSave,
  createNoteAndSave,
  deleteNoteAndSave,
} from './../../actions/board';

const mapStateToProps = state => ({
  boardId: state.board.id,
  notesMaxZ: state.board.notesMaxZ,
  note: state.noteEditor.note,
  noteKey: state.noteEditor.noteKey,
  colors: state.noteEditor.colors,
  isActive: state.noteEditor.isActive,
  editorState: state.noteEditor.editorState,
});

const mapDispatchToProps = dispatch => ({
  createNote: (boardId, z) => (() => {
    dispatch(createNoteAndSave(boardId, {
      z,
    }));
  }),
  deleteNote: noteId => (() => {
    if (noteId) {
      dispatch(deleteNoteAndSave(noteId));
    }
  }),
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
