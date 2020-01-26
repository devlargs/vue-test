import Vue from "vue";
import App from "./App.vue";
import Categories from "./pages/Categories.vue";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// components
import Category from "./components/Category.vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.component("tawk-category", Category);

const routes = [
  {
    path: "/",
    component: Categories
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
