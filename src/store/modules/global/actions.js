import { Proxy } from '../../../proxies';

  const addData = (payload, type) => {
    return dispatch => new Promise((resolve, reject) => {;
      return new Proxy(payload.filter).add(payload).then(response => {
        dispatch({ type: `ADD_GLOBAL_DATA`, payload: { key: payload.key, data: response } });
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  };

  export default {
    addData,
  }