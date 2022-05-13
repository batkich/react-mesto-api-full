class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfileInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  setProfileInfo(token, item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      })
    })
      .then(this._checkResponse);
  }

  setNewCard(token, data) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(token, item) {
    return fetch(`${this.baseUrl}/cards/${item}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: 'DELETE',
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(token, item, isLiked,) {
    return fetch(`${this.baseUrl}/cards/${item}/likes/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: isLiked ? 'PUT' : 'DELETE',
    })
      .then(this._checkResponse);
  }

  setNewAvatar(token, item) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: item.avatar,
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://santyagobatkich.students.nomoredomains.work',
});

export default api;
