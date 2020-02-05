<template>
  <div>
    <tawk-search @output="search"></tawk-search>

    <div v-show="loading" class="text-center mt-5">
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-show="!loading && !searchPage" class="categories-container mt-4">
      <b-container class="bv-example-row mb-3">
        <b-row cols="3">
          <tawk-category
            v-show="categories.length"
            v-for="(category, index) in categories"
            :key="index"
            :data="category"
          />
        </b-row>
      </b-container>
      <div class="text-center" v-show="!categories.length">No categories found!</div>
    </div>

    <div v-show="searchPage" class="categories-container mt-4">
      <p class="search-result-header">Showing results for {{searchText}}</p>
      <b-container class="bv-example-row mb-3">
        <b-row>
          <div class="search-results">
            <tawk-article
              v-for="(result, idx) in searchResults"
              :key="idx"
              :data="result"
              :searchResult="true"
            />
          </div>
        </b-row>
      </b-container>
      <div class="text-center" v-show="!categories.length">No categories found!</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      categories: [],
      loading: false,
      error: false,
      searchResults: [],
      searchPage: false,
      searchText: ""
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories(searchText) {
      this.categories = [];
      this.loading = true;
      axios.get("/api/categories").then(q => {
        setTimeout(() => {
          this.categories = q.data
            .filter(r => r.enabled)
            .map(h => {
              return Object.assign(h, {
                updatedOn: moment(h.updatedOn).fromNow()
              });
            })
            .sort((a, b) =>
              a.order > b.order ? 1 : b.order > a.order ? -1 : 0
            );

          this.loading = false;
          if (searchText) {
            this.categories = this.categories.filter(f =>
              f.title.toLowerCase().includes(searchText.toLowerCase())
            );
          }
        }, 500);
      });
    },
    fetchResults(searchText) {
      this.searchPage = true;
      this.searchText = searchText;
      axios.get(`api/search/${searchText}`).then(q => {
        this.searchResults = q.data
          .filter(q => !q.draft)
          .filter(q => q.title.toLowerCase().includes(searchText.toLowerCase()))
          .map(q => {
            return {
              ...q,
              content: q.content.substr(0, 50)
            };
          });
      });
    },
    search(variable) {
      this.fetchResults(variable);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.categories-container {
  margin: auto;
  width: 90vw;
  background-color: $background-white;
  padding-bottom: 10vh;
}

.search-results {
  display: block;
}
</style>
