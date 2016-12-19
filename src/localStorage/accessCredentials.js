import storage from './storage';

/**
 * Get user server access credentials from browser storage
 */
export function getAccessCredentials() {
  const accessCredentialsJson = storage().getItem('accessCredentials');
  let accessCredentials = false;
  if (accessCredentialsJson) {
    accessCredentials = JSON.parse(accessCredentialsJson);
  }

  return accessCredentials;
}

/**
 * Remove user server access credentials from browser storage
 */
export function removeAccessCredentials() {
  localStorage.removeItem('accessCredentials');
}

/**
 * Store user server access credentials in browser storage
 */
export const storeAccessCredentials = ({
  key,
  keyExpiresAt,
  refreshKey,
  refreshKeyExpiresAt,
}) => {
  const localStorage = storage();
  if (localStorage.getItem('accessCredentials')) {
    removeAccessCredentials();
  }

  localStorage.setItem('accessCredentials', JSON.stringify({
    key,
    keyExpiresAt,
    refreshKey,
    refreshKeyExpiresAt,
  }));
};
