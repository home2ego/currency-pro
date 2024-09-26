export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint) {
    // return fetch(this.baseURL + endpoint).then((response) => response.json());
    const response = await fetch(this.baseURL + endpoint);
    const data = await response.json();

    return data;
  }

  post(endpoint, body) {
    return this.#send('post', endpoint, body);
  }

  put(endpoint, body) {
    return this.#send('put', endpoint, body);
  }
  delete(endpoint, body) {
    return this.#send('delete', endpoint, body);
  }

  async #send(method, endpoint, body) {
    // fetch(this.baseURL + endpoint, {
    //   method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body),
    // }).then((response) => response.json());

    const response = await fetch(this.baseURL + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    return data;
  }
}
