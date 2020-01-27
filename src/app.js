import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// components
import Article from "./components/Article.vue";
import Category from "./components/Category.vue";
import Search from "./components/Search.vue";

// pages
import Articles from "./pages/Articles.vue";
import Categories from "./pages/Categories.vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

Vue.component("tawk-article", Article);
Vue.component("tawk-category", Category);
Vue.component("tawk-search", Search);

// routes
const routes = [
  {
    path: "/",
    component: Categories
  },
  {
    path: "/category/:id",
    component: Articles
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
