const initialState = {
  sidemenuOpen: false,
  title: '',
  titleInEditMode: false,
  createBoardInProgress: false,
  deleteBoardInProgress: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'CREARE_BOARD_REQUEST':
      return Object.assign({}, state, {
        createBoardInProgress: true,
      });
    case 'CREATE_BOARD_FINISHED':
      return Object.assign({}, state, {
        createBoardInProgress: false,
      });
    case 'DELETE_BOARD_REQUEST':
      return Object.assign({}, state, {
        deleteBoardInProgress: true,
      });
    case 'DELETE_BOARD_FINISHED':
      return Object.assign({}, state, {
        deleteBoardInProgress: false,
      });
    case 'SIDEMENU_OPEN':
      return Object.assign({}, state, {
        sidemenuOpen: true,
      });
    case 'SIDEMENU_CLOSE':
      return Object.assign({}, state, {
        sidemenuOpen: false,
      });
    case 'SET_TITLE':
      return Object.assign({}, state, {
        title: action.title,
      });
    case 'EDIT_TITLE':
      return Object.assign({}, state, {
        titleInEditMode: true,
      });
    case 'FINISH_EDIT_TITLE':
      return Object.assign({}, state, {
        titleInEditMode: false,
      });
    default:
      return state;
  }
};

export default app;
