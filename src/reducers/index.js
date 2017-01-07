import app from './app';
import logIn from './logIn';
import messages from './messages';
import boardList from './../redux/boardList/reducer';
import board from './board';
import noteEditor from './noteEditor';

const mynotesReducers = {
  app,
  logIn,
  messages,
  boardList,
  board,
  noteEditor,
};

export default mynotesReducers;
