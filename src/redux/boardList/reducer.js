const initialState = {
  boards: [],
  boardsThumbnails: [],
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
        boardsThumbnails: [],
        getInProgres: false,
        errorMessage: action.errorMessage,
      });
    case 'GET_THUMBNAIL_SUCCESS':
      const newThumbnails = state.boardsThumbnails.slice();
      const width = 30;
      const height = 30;
      newThumbnails[action.boardKey] = action.thumbnail.map(thumbnailNote => (
        {
          x: thumbnailNote.x * (action.width - width),
          y: thumbnailNote.y * (action.height - height),
          width,
          height,
          color: thumbnailNote.color,
        }
      ));

      return Object.assign({}, state, { boardsThumbnails: newThumbnails });
    default:
      return state;
  }
};

export default boardList;
