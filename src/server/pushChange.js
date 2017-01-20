import throttle from 'lodash.throttle';
import saveChange from './saveChange';

let pendingChanges = [];
let index = {};

/**
 * Save all pending changes to the server
 */
function pushPendingChanges() {
  const pendingServerOperations = [];
  pendingChanges.forEach((change) => {
    pendingServerOperations.push(saveChange(change));
    pendingChanges = [];
    index = {};
  });

  return Promise.all(pendingServerOperations);
}

const throttledPushPendingChanges = throttle(() => pushPendingChanges(), 200);

/**
 * Optimize number of requests for NOTE_UPDATE operations
 * Other operations are dispatched immediately
 * @param  {string}  operationType operation type
 * @param  {Object}  data          operation data
 * @return {Promise}               operation response
 */
function pushChange({ operationType, data }) {
  if (operationType === 'NOTE_UPDATE') {
    const indexKey = data.id + Object.keys(data).join('');

    if (index[indexKey] === undefined) {
      pendingChanges.push({ operationType, data });
      index[indexKey] = pendingChanges.length - 1;
    } else {
      pendingChanges[index[indexKey]] = { operationType, data };
    }

    return throttledPushPendingChanges();
  }
  return saveChange({ operationType, data });
}

export default pushChange;
