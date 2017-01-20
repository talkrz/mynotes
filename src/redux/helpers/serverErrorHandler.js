import { push } from 'react-router-redux';
import { addSelfDisappearingMessage } from './../messages/actions';

/**
 * Handle server errors and performing appropriate actions
 * @param  {Promise}  promise  server operation result promise
 * @param  {function} dispatch redux dispatch
 * @return {Promise}           forward original promise
 */
function serverErrorHandler(promise, dispatch) {
  return promise
    .catch((err) => {
      if (err === 'Unauthorized') {
        dispatch(push('/login'));
      } else {
        throw err;
      }
    })
    .catch((err) => {
      dispatch(addSelfDisappearingMessage(err.message, 'error'));
    });
}

export default serverErrorHandler;
