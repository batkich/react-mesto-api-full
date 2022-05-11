class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.credentials = options.credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: this.credentials,
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      credentials: this.credentials,
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  setProfileInfo(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: this.credentials,
      headers: this.headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      })
    })
      .then(this._checkResponse);
  }

  setNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      credentials: this.credentials,
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(item) {
    return fetch(`${this.baseUrl}/cards/${item}`, {
      method: 'DELETE',
      credentials: this.credentials,
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(item, isLiked,) {
    return fetch(`${this.baseUrl}/cards/${item}/likes/`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: this.credentials,
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  setNewAvatar(item) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: this.credentials,
      headers: this.headers,
      body: JSON.stringify({
        avatar: item.avatar,
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://santyagobatkich.students.nomoredomains.xyz',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
