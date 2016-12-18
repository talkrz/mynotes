const initialState = {
  isLoggedIn: false,
  userId: false,
  accessKey: '',
  accessKeyExpiresAt: '',
  refreshKey: '',
  refreshKeyExpiresAt: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_CREDENTIALS':
      return Object.assign({}, state, {
        userLoggedIn: true,
        userId: action.userId,
        accessKey: action.accessKey,
        accessKeyExpiresAt: action.accessKeyExpiresAt,
        refreshKey: action.refreshKey,
        refreshKeyExpiresAt: action.refreshKeyExpiresAt,
      });
    default:
      return state;
  }
};

export default user;
