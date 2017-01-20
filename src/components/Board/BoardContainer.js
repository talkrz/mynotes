import { connect } from 'react-redux';
import Board from './Board';

const mapStateToProps = (state, ownProps) => ({
  board: state.board,
  boardId: ownProps.params.boardId,
});

const BoardContainer = connect(mapStateToProps)(Board);

export default BoardContainer;
