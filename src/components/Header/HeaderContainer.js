import { connect } from 'react-redux';
import Header from './Header';
import {
  sidemenuOpen,
  editTitle,
  setTitle,
  saveTitle } from './../../redux/app/actions';

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


const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
