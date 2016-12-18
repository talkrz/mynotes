import { connect } from 'react-redux';
import BoardList from './BoardList';

const mapStateToProps = state => ({
  boards: state.boardList.boards,
});

const BoardListContainer = connect(mapStateToProps)(BoardList);

export default BoardListContainer;
