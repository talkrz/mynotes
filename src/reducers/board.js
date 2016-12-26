const initialState = {
  notes: [],
  getInProgres: false,
  errorMessage: null,
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD_REQUEST':
      return Object.assign({}, state, {
        getInProgres: true,
      });
    case 'GET_BOARD_SUCCESS':
      return Object.assign({}, state, {
        notes: action.board.notes,
        getInProgres: false,
        errorMessage: null,
      });
    case 'GET_BOARD_ERROR':
      return Object.assign({}, state, {
        notes: [],
        getInProgres: false,
        errorMessage: action.errorMessage,
      });
    default:
      return state;
  }
};

export default board;
