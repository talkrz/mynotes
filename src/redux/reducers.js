import app from './app/reducer';
import logIn from './logIn/reducer';
import messages from './messages/reducer';
import boardList from './boardList/reducer';
import board from './board/reducer';
import noteEditor from './noteEditor/reducer';

const reducers = {
  app,
  logIn,
  messages,
  boardList,
  board,
  noteEditor,
};

export default reducers;
