let timer;

export default {

  login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  async auth(context, payload) {
    const url = payload.mode === 'signup'
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaayVgTqx1w2H708uWcBjYxnrgeMNci20'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaayVgTqx1w2H708uWcBjYxnrgeMNci20';
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const resData = await res.json();
    // console.log('[auth]', res, resData);

    if (!res.ok)
      throw new Error(resData.method || 'Failed to authenticate. Check your login data.');

    const expiresIn = +resData.expiresIn * 1000;
    const expireationDate = new Date().getTime() + expiresIn;

    timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn);

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    localStorage.setItem('tokenExpiration', expireationDate);

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();
    if(expiresIn < 0)
      return;

    timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn);

    if(token && userId)
      context.commit('setUser', {
        token,
        userId
      });
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
