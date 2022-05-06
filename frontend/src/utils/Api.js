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

  changeLikeCardStatus(item, isLiked) {
    return fetch(`${this.baseUrl}/cards/likes/${item}`, {
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '235ae6c2-9d59-4d94-a816-03a2b688c17b',
    'Content-Type': 'application/json',
  }
});

export default api;
