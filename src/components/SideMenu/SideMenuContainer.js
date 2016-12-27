import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { sidemenuClose } from './../../actions/app';
import { getBoardList } from './../../actions/boardList';

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
});

const SideMenuContainer = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenuContainer;
