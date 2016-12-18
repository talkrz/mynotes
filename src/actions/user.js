import { push } from 'react-router-redux';

export const setAccessCredentials = ({
    userId,
    accessKey,
    accessKeyExpiresAt,
    refreshKey,
    refreshKeyExpiresAt
}) => {
    return {
        type: 'SET_ACCESS_CREDENTIALS',
        userId,
        accessKey,
        accessKeyExpiresAt,
        refreshKey,
        refreshKeyExpiresAt
    };
};

export const storeAccessCredentials = (storage) => {
    return function({
        userId,
        accessKey,
        accessKeyExpiresAt,
        refreshKey,
        refreshKeyExpiresAt
    }) {
        return (dispatch) => {
            if(storage.getItem('accessCredentials')) {
                storage.removeItem('accessCredentials');
            }

            storage.setItem('accessCredentials', JSON.stringify({
                userId,
                accessKey,
                accessKeyExpiresAt,
                refreshKey,
                refreshKeyExpiresAt
            }));

            dispatch(setAccessCredentials({
                userId,
                accessKey,
                accessKeyExpiresAt,
                refreshKey,
                refreshKeyExpiresAt
            }));
        }
    }
}

export const restoreAccessCredentials = (storage) => {
    return (dispatch) => {
        const accessCredentials = storage.getItem('accessCredentials');

        if (accessCredentials) {
            console.log('restored credentials');
            dispatch(setAccessCredentials(JSON.parse(accessCredentials)));
        } else {
            dispatch(push('/login'));
        }
    }
}
