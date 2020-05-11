import APIServer from '@/APIServer/APIServer';

const server = new APIServer();
const sendRequest = (methodName, data) => server.request(methodName, data);

export default {
  state: {
    token: '',
  },
  getters: {
    token(state) {
      return state.token;
    },
  },
  mutations: {
    token(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, user) {
      sendRequest('login', user)
        .then((response) => {
          console.log("R", response);
        })
    },
  },
};