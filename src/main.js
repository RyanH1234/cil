import Vue from 'vue'
import App from './App.vue'

import router from "./router";
import store from './store';

import * as firebase from "firebase";

import Axios from 'axios';

Vue.prototype.$http = Axios;
const baseURL = 'http://localhost:3000';
Axios.defaults.baseURL = baseURL;

Vue.config.productionTip = false

const dotenv = require('dotenv')
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "mn-cli.firebaseapp.com",
  databaseURL: "https://mn-cli.firebaseio.com",
  projectId: "mn-cli",
  storageBucket: "mn-cli.appspot.com",
  messagingSenderId: "747749105011",
  appId: "1:747749105011:web:ea47a4f6b96c03370fb906",
  measurementId: "G-SSEZ6Z8X38"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
