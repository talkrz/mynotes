export const addMessage = (message, messageType) => {
    return {
        type: 'ADD_MESSAGE',
        message,
        messageType
    }
}

export const removeMessage = (messageIndex) => {
    return {
        type: 'REMOVE_MESSAGE',
        messageIndex
    }
}

export const addSelfDisappearingMessage = (message, messageType) => {
    return (dispatch, getState) => {
        dispatch(addMessage(message, messageType));

        const lastAddedId = getState().length - 1;
        setTimeout(() => {
            dispatch(removeMessage(lastAddedId));
        }, 5000);
    }
}
