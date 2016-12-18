import server from './../server/server';
import { addSelfDisappearingMessage } from './messages';

export const getBoardListRequest = () => {
    return {
        type: 'GET_BOARD_LIST_REQUEST'
    }
}

export const getBoardListSuccess = (boards) => {
    return {
        type: 'GET_BOARD_LIST_SUCCESS',
        boards: boards
    }
}

export const getBoardListError = (errorMessage) => {
    return {
        type: 'GET_BOARD_LIST_ERROR',
        errorMessage
    }
}

export const getBoardList = () => {
    return (dispatch, getState) => {
        const userState = getState().user;
        console.log(userState);
        server.getBoardList(userState)
            .then(response => {
                dispatch(getBoardListSuccess(response));
            })
            .catch(err => {
                dispatch(addSelfDisappearingMessage(err.message, 'error'));
                dispatch(getBoardListError(err.message));
            });
    }
}
