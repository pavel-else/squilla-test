import APIServer from '@/APIServer/APIServer';

const server = new APIServer();
const sendRequest = (methodName, data) => server.request(methodName, data);

export default {
  state: {
    token: localStorage.getItem('user-token') || '',
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    token(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, user) {
      console.log("Login", user);
      return new Promise((resolve, reject) => {
        sendRequest('login', user)
          .then((response) => {
            console.log("R", response)
            if (response.status !== 'success') {
              reject();
            }
            commit('token', response.data.token);
            localStorage.setItem('user-token', response.data.token);
            resolve();
          })
      });
    },
    logout({ commit }) {
      commit('token', '');
      //dispatch('unsetStore');
      localStorage.removeItem('user-token');
  }
  },
};