import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: '',
    user: {},
    client: {}
  },
  mutations: {
    auth_success(state, user) {
      state.status = 'success';
      state.user = user;
    },
    setClient(state, client) {
      state.client = client;
    }
  },
  getters: {
    isLoggedIn(state) {
      const status = state.status;
      const loggedIn = (status === 'success');
      return loggedIn;
    },
    getCurrentUserID(state) {
      const uid = state.user.uid;
      return uid;
    },
    getClient(state) {
      const client = state.client;
      return client;
    }
  }
})

export default store;