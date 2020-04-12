import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: '',
    user: {},
  },
  mutations: {
    auth_success(state, user) {
      state.status = 'success';
      state.user = user;
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
    }
  }
})

export default store;