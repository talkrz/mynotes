import { connect } from 'react-redux';
import SideMenu from './SideMenu';

const mapStateToProps = state => ({
  boards: state.boardList.boards,
});

const SideMenuContainer = connect(mapStateToProps)(SideMenu);

export default SideMenuContainer;
