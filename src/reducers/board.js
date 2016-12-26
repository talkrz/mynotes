const initialState = {
  notes: [],
  getInProgres: false,
  errorMessage: null,
  viewDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
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
    case 'BOARD_RESIZED': {
      return Object.assign({}, state, {
        viewDimensions: {
          width: action.width,
          height: action.height,
          top: action.top,
          left: action.left,
        },
      });
    }
    default:
      return state;
  }
};

export default board;
