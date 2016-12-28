export const sidemenuOpen = () => ({
  type: 'SIDEMENU_OPEN',
});

export const sidemenuClose = () => ({
  type: 'SIDEMENU_CLOSE',
});

export const setTitle = title => ({
  type: 'SET_TITLE',
  title,
});
