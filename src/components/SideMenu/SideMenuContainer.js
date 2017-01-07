import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { sidemenuClose, logout } from './../../redux/app/actions';
import { getBoardList } from './../../redux/boardList/actions';

const mapStateToProps = state => ({
  boards: state.boardList.boards,
  sidemenuOpen: state.app.sidemenuOpen,
});

const mapDispatchToProps = dispatch => ({
  onMenuButtonClick: () => {
    dispatch(sidemenuClose());
  },
  onLoad: () => {
    dispatch(getBoardList());
  },
  onLogout: () => {
    dispatch(logout());
  },
});

const SideMenuContainer = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenuContainer;
