const initialState = {
  sidemenuOpen: false,
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
    default:
      return state;
  }
};

export default app;
