const initialState = {
  boards: [],
  getInProgres: false,
  errorMessage: null,
};

const boardList = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD_LIST_REQUEST':
      return Object.assign({}, state, {
        getInProgres: true,
      });
    case 'GET_BOARD_LIST_SUCCESS':
      return Object.assign({}, state, {
        boards: action.boards,
        getInProgres: false,
        errorMessage: null,
      });
    case 'GET_BOARD_LIST_ERROR':
      return Object.assign({}, state, {
        boards: [],
        getInProgres: false,
        errorMessage: action.errorMessage,
      });
    default:
      return state;
  }
};

export default boardList;
