import Vue from "vue";
import App from "./App.vue";
import Categories from "./pages/Categories.vue";
import Home from "./pages/Home.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/categories",
    component: Categories
  },
  {
    path: "/",
    component: Home
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
