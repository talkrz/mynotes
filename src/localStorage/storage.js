let tested = false;

function storageAvailable(type) {
  tested = true;
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

function storage() {
  if (!tested && !storageAvailable('localStorage')) {
    throw new Error('The localStorage is not available in your browser');
  }

  return window['localStorage'];
}

export default storage;
