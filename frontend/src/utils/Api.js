class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  setProfileInfo(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
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
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(item, isLiked,) {
    return fetch(`${this.baseUrl}/cards/${item}/likes/`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  setNewAvatar(item) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: item.avatar,
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://santyagobatkich.students.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
});

export default api;
