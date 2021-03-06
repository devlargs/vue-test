import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import VueMoment from "vue-moment";

// components
import Article from "./components/Article.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import Category from "./components/Category.vue";
import CategoryDetail from "./components/CategoryDetail.vue";
import Search from "./components/Search.vue";
import SearchResult from "./components/SearchResult.vue";
import Slider from "./components/Slider.vue";

// pages
import Articles from "./pages/Articles.vue";
import Categories from "./pages/Categories.vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(VueMoment);

Vue.component("tawk-article", Article);
Vue.component("tawk-breadcrumb", Breadcrumb);
Vue.component("tawk-category", Category);
Vue.component("tawk-category-detail", CategoryDetail);
Vue.component("tawk-search", Search);
Vue.component("tawk-slides", VueperSlides);
Vue.component("tawk-slide", VueperSlide);
Vue.component("tawk-search-result", SearchResult);
Vue.component("tawk-category-slider", Slider);
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
