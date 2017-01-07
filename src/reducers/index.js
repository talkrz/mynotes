import app from '././../redux/app/reducer';
import logIn from './../redux/logIn/reducer';
import messages from './../redux/messages/reducer';
import boardList from './../redux/boardList/reducer';
import board from './../redux/board/reducer';
import noteEditor from './../redux/noteEditor/reducer';

const mynotesReducers = {
  app,
  logIn,
  messages,
  boardList,
  board,
  noteEditor,
};

export default mynotesReducers;
