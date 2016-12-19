let tested = false;

function storageAvailable(type) {
  tested = true;
  try {
    const localStorage = window[type];
    const x = '__storage_test__';
    localStorage.setItem(x, x);
    localStorage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

function storage() {
  if (!tested && !storageAvailable('localStorage')) {
    throw new Error('The localStorage is not available in your browser');
  }

  return window.localStorage;
}

export default storage;
