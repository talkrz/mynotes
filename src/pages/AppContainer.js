import { connect } from 'react-redux';
import App from './App';
import {
  sidemenuOpen,
  editTitle,
  setTitle,
  saveTitle } from './../redux/app/actions';

const mapStateToProps = state => ({
  title: state.app.title,
  titleInEditMode: state.app.titleInEditMode,
});

const mapDispatchToProps = dispatch => ({
  onMenuButtonClick: () => {
    dispatch(sidemenuOpen());
  },
  onTitleClick: () => {
    dispatch(editTitle());
  },
  onTitleChanged: (title) => {
    dispatch(setTitle(title));
  },
  onTitleSave: () => {
    dispatch(saveTitle());
  },
});


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
