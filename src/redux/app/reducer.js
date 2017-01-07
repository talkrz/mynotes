const initialState = {
  sidemenuOpen: false,
  title: '',
};

const app = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default app;
