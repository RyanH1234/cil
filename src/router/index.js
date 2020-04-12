import Vue from 'vue'
import VueRouter from 'vue-router'

import login from "@/components/login.vue";
import timeline from "@/components/timeline.vue";
import clients from "@/components/clients.vue";
import store from '../store';


Vue.use(VueRouter)

const routes = [
  { path: "/login", name: "Login", component: login },
  { path: "/timeline", name: "Timeline", component: timeline },
  { path: "/clients", name: "Clients", component: clients }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isLoggedIn;
  const toPath = to.path;

  if(toPath === "/login" || loggedIn) {
    next();
    return;
  }

  next("/login");
  return;
})

export default router;