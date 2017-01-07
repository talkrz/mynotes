export const addMessage = (message, messageType) => ({
  type: 'ADD_MESSAGE',
  message,
  messageType,
});

export const removeMessage = messageIndex => ({
  type: 'REMOVE_MESSAGE',
  messageIndex,
});

export const addSelfDisappearingMessage = (message, messageType) => (
  (dispatch, getState) => {
    dispatch(addMessage(message, messageType));

    const lastAddedId = getState().length - 1;
    setTimeout(() => {
      dispatch(removeMessage(lastAddedId));
    }, 5000);
  }
);
