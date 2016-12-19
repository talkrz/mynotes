import moment from 'moment';
import { getAccessCredentials, removeAccessCredentials } from './../localStorage/accessCredentials';

function validateAccessCredentials() {
  const accessCredentials = getAccessCredentials();

  // no access key at all, nothing to do here
  if (!accessCredentials || !accessCredentials.key) {
    removeAccessCredentials();
    return 'Unauthorized';
  }

  const now = moment();
  // refresh key expired, nothing to do here
  if (now.isAfter(moment(accessCredentials.refreshKeyExpiresAt))) {
    removeAccessCredentials();
    return 'Unauthorized';
  }

  // access key expired, try to refresh the session
  if (now.isAfter(moment(accessCredentials.keyExpiresAt))) {
    return 'Needs refresh';
  }

  return accessCredentials.key;
}

function authorizationHandler(call) {
  const credentialsStatus = validateAccessCredentials();

  if (credentialsStatus === 'Unauthorized') {
    return Promise.reject('Unauthorized');
  } else if (credentialsStatus === 'Needs refresh') {
    return Promise.reject({ message: 'Refresh session not implemented' });
  }

  return call(credentialsStatus);
}

export default authorizationHandler;
