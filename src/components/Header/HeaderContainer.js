import { connect } from 'react-redux';
import Header from './Header';
import { sidemenuOpen, editTitle } from './../../redux/app/actions';

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
});


const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
