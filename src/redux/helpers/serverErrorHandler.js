import { push } from 'react-router-redux';
import { addSelfDisappearingMessage } from './../messages/actions';

/**
 * Handle server errors and performing appropriate actions
 * @param  {[type]} promise  [description]
 * @param  {[type]} dispatch [description]
 * @return {[type]}          [description]
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
