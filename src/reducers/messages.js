const messages = (state = [], action) => {
    let newState;

    switch(action.type) {
        case 'ADD_MESSAGE':
            newState = state.slice();
            newState.push({
                messageType: action.messageType,
                message: action.message
            })
            return newState;
        case 'REMOVE_MESSAGE':
            newState = state.slice();
            newState.splice(action.messageIndex, 1);
            return newState;
        default:
            return state;
    }
}

export default messages;
