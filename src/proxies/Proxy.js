import axios from 'axios';


class Proxy {

  submit(requestType, url, data = null, _headers = null) {
    return new Promise((resolve, reject) => {
      axios[requestType](url, data).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      });
    });
  }

  add(payload) {
    let endpoint = `${payload.keyOne}`;
    //eslint-disable-next-line
    payload.idOne ? endpoint += `/${payload.idOne}` : null;
    return this.submit('post', `${endpoint}`, payload.data);
  }
}


export default Proxy;