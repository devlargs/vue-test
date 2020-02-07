<template>
  <div>
    <tawk-search @output="search" />
    <div class="articles-container mt-3">
      <div class="inner-container">
        <tawk-breadcrumb :title="category.title" />
        <b-container class="mt-3">
          <b-row>
            <b-col sm="4" class="padding-0">
              <div v-show="categoryLoading" class="text-center mt-5">
                <b-spinner
                  variant="primary"
                  type="grow"
                  label="Spinning"
                ></b-spinner>
              </div>
              <tawk-category-detail
                v-show="!categoryLoading"
                :data="category"
              />
            </b-col>
            <b-col sm="8" class="padding-0">
              <div v-show="loading" class="text-center mt-5">
                <b-spinner
                  variant="primary"
                  type="grow"
                  label="Spinning"
                ></b-spinner>
              </div>
              <tawk-article
                v-show="!loading && articles.length"
                v-for="(a, index) in articles"
                :key="index"
                :data="a"
                :searchResult="false"
              />
              <div class="text-center" v-show="!loading && !articles.length">
                No results found
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <div
      class="articles-container"
      style="border-top: 1px solid lightgray"
      v-show="!loading"
    >
      <h5 class="text-center mt-5">Other categories</h5>
      <tawk-category-slider
        :loading="otherCategoryLoading"
        :categories="otherCategories"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      articles: [],
      category: {},
      otherCategories: [],
      categoryLoading: false,
      loading: false,
      otherCategoryLoading: false
    };
  },
  created() {
    this.fetchCategory();
    this.fetchArticles();
  },
  methods: {
    fetchCategory() {
      this.categoryLoading = true;
      axios.get(`/api/categories`).then(q => {
        setTimeout(() => {
          this.category = q.data.filter(r => r.id === this.$route.params.id)[0];
          this.otherCategories = q.data
            .filter(r => r.id !== this.$route.params.id)
            .filter(q => q.enabled);
          this.otherCategoryLoading = false;
          this.categoryLoading = false;
        }, 500);
      });
    },
    fetchArticles(searchText) {
      this.articles = [];
      this.loading = true;
      axios.get(`/api/category/${this.$route.params.id}`).then(q => {
        setTimeout(() => {
          this.articles = q.data.filter(r => r.status === "published");
          if (searchText) {
            this.articles = this.articles.filter(r =>
              r.title.toLowerCase().includes(searchText.toLowerCase())
            );
          }
          this.loading = false;
        }, 500);
      });
    },
    search(variable) {
      this.fetchArticles(variable);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
.articles-container {
  margin: auto;
  width: 70vw;
  background-color: $background-white;
  padding-bottom: 10vh;
  .inner-container {
    padding: 30px;
    .padding-0 {
      padding: 0;
    }
  }
  h5 {
    color: $text-gray;
  }
}
</style>
