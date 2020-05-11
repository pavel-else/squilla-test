import Vue from 'vue';
import Vuex from 'vuex';
import offers from './modules/offers';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    offers,
    user,
  },
});
