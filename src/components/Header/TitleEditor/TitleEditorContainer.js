import { connect } from 'react-redux';
import TitleEditor from './TitleEditor';
import { setTitle, saveTitle } from './../../../redux/app/actions';

const mapStateToProps = state => ({
  title: state.app.title,
});

const mapDispatchToProps = dispatch => ({
  onTitleChanged: (title) => {
    dispatch(setTitle(title));
  },
  onTitleSave: () => {
    dispatch(saveTitle());
  },
});


const TitleEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TitleEditor);

export default TitleEditorContainer;
