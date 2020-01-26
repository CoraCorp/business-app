const apiUrl = 'http://localhost:80/api/registered-applications';

export default class RegisteredAppService {
  constructor(accessToken) {
    this.defaultHeaders = {
      Authorization: `Bearer ${accessToken}`
    };
  }

  registerNewApp = async app => {
    return fetch(apiUrl, {
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(app)
    }).then(res => res.ok);
  };

  getRegisteredApps = async () => {
    return fetch(apiUrl, {
      headers: this.defaultHeaders
    }).then(res => res.json());
  };

  getRegisteredApp = async id => {
    return fetch(apiUrl + '/' + id, {
      headers: this.defaultHeaders
    }).then(res => (res.ok ? res.json() : undefined));
  };

  updateApp = async app => {
    return fetch(apiUrl + '/' + app.id, {
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(app)
    }).then(res => res.ok);
  };
}
