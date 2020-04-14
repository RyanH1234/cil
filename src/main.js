import Vue from 'vue'
import App from './App.vue'

import router from "./router";
import store from './store';

import * as firebase from "firebase";

import Axios from 'axios';

Vue.prototype.$http = Axios;

const baseURL = process.env.NODE_ENV === 'production' ? 'https://mn-cil.herokuapp.com' : 'http://localhost:3001';

Axios.defaults.baseURL = baseURL;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
