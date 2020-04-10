import Vue from 'vue'
import VueRouter from 'vue-router'

import login from "@/components/login.vue";
import timeline from "@/components/timeline.vue";
import clients from "@/components/clients.vue";


Vue.use(VueRouter)

const routes = [
  { path: "/", name: "Login", component: login },
  { path: "/timeline", name: "Timeline", component: timeline },
  { path: "/clients", name: "Clients", component: clients }
]

const router = new VueRouter({
  routes
})

export default router;