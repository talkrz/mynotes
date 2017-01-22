import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { createBoard, deleteBoard, sidemenuClose, logout } from './../../redux/app/actions';
import { getBoardList } from './../../redux/boardList/actions';

const mapStateToProps = state => ({
  boards: state.boardList.boards,
  currentBoardId: state.board.id,
  sidemenuOpen: state.app.sidemenuOpen,
});

const mapDispatchToProps = dispatch => ({
  onMenuButtonClick: () => {
    dispatch(sidemenuClose());
  },
  onCreateBoard: () => {
    dispatch(createBoard());
  },
  onDeleteBoard: (boardId) => {
    dispatch(deleteBoard(boardId));
  },
  onClickOutside: () => {
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
