import { push } from 'react-router-redux';

export const setAccessCredentials = ({
    userId,
    accessKey,
    accessKeyExpiresAt,
    refreshKey,
    refreshKeyExpiresAt,
}) => ({
  type: 'SET_ACCESS_CREDENTIALS',
  userId,
  accessKey,
  accessKeyExpiresAt,
  refreshKey,
  refreshKeyExpiresAt,
});

export const storeAccessCredentials = storage => (
  ({
    userId,
    accessKey,
    accessKeyExpiresAt,
    refreshKey,
    refreshKeyExpiresAt,
  }) => (
    (dispatch) => {
      if (storage.getItem('accessCredentials')) {
        storage.removeItem('accessCredentials');
      }

      storage.setItem('accessCredentials', JSON.stringify({
        userId,
        accessKey,
        accessKeyExpiresAt,
        refreshKey,
        refreshKeyExpiresAt,
      }));

      dispatch(setAccessCredentials({
        userId,
        accessKey,
        accessKeyExpiresAt,
        refreshKey,
        refreshKeyExpiresAt,
      }));
    }
  )
);

export const restoreAccessCredentials = storage => (
  (dispatch) => {
    const accessCredentials = storage.getItem('accessCredentials');

    if (accessCredentials) {
      dispatch(setAccessCredentials(JSON.parse(accessCredentials)));
    } else {
      dispatch(push('/login'));
    }
  }
);
