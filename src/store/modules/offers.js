import APIServer from '@/APIServer/APIServer';

const server = new APIServer();
const sendRequest = (methodName, data) => server.request(methodName, data);

export default {
  state: {
    offers: [],
  },
  getters: {
    offers(state) {
      return state.offers;
    },
  },
  mutations: {
    offers(state, offers) {
      state.offers = offers;
    },
  },
  actions: {
    getOffers({ commit }) {
      sendRequest('getOffers', {})
        .then((response) => {
          commit('offers', response.data);
        })
    },
    async createOffer({ dispatch }, offer) {
      await sendRequest('createOffer', offer);
      dispatch('getOffers');
    },
    async deleteOffer({ getters, commit, dispatch }, offerId) {
      // Сначала быстро обновляем данные в локальном списке,
      // а потом, когда придет ответ с сервера, запросим новые атуальные данные
      const offers = getters.offers;
      const newOffers = offers.filter(i => i.id !== offerId);
      commit('offers', newOffers);

      await sendRequest('deleteOffer', offerId);
      dispatch('getOffers');
    }
  }
};