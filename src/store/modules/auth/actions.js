export default {

  async login(context, payload) {
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaayVgTqx1w2H708uWcBjYxnrgeMNci20', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const resData = await res.json();
    console.log('[login]', res, resData);

    if (!res.ok)
      throw new Error(resData.method || 'Failed to authenticate. Check your login data.');

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn
    });
  },

  async signup(context, payload) {
    const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaayVgTqx1w2H708uWcBjYxnrgeMNci20', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const resData = await res.json();
    console.log('[signup]', res, resData);

    if (!res.ok)
      throw new Error(resData.method || 'Failed to signup.');

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn
    });
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
