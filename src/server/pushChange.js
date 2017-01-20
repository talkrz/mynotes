import saveChange from './saveChange';

/**
 * For now it's only placeholder where additional logic like request
 * throttling or merging should be added
 * @param  {string}  operationType operation type
 * @param  {Object}  data          operation data
 * @return {Promise}               operation response
 */
function pushChange({ operationType, data }) {
  return saveChange({ operationType, data });
}

export default pushChange;
