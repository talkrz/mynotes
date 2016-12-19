import storage from './storage';

/**
 * Store user server access credentials in browser storage
 */
const storeAccessCredentials = ({
  key,
  accessKeyExpiresAt,
  refreshKey,
  refreshKeyExpiresAt,
}) => {
  const localStorage = storage();
  if (localStorage.getItem('accessCredentials')) {
    localStorage.removeItem('accessCredentials');
  }

  localStorage.setItem('accessCredentials', JSON.stringify({
    key,
    accessKeyExpiresAt,
    refreshKey,
    refreshKeyExpiresAt,
  }));
};

export default storeAccessCredentials;
