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
      <div class="text-center" v-show="!categories.length">
        No categories found!
      </div>
    </div>

    <div v-show="searchPage" class="categories-search-container mt-4">
      <div class="bread-crumb">
        <tawk-breadcrumb title="Search results" />
      </div>
      <p class="search-result-header">
        Showing results for <i>"</i
        ><span class="search-text">{{ searchText }}</span
        ><i>"</i>
      </p>
      <b-container class="bv-example-row mb-3">
        <div class="search-results">
          <tawk-article
            v-show="searchResults.length"
            v-for="(result, idx) in searchResults"
            :key="idx"
            :data="result"
            :searchResult="true"
          />
          <div v-show="!searchResults.length">
            <img src="/images/empty-search.svg" height="300" />
            <h4 class="mt-4"><b>No Search Results</b></h4>
            <p class="try-again">
              Please, try again or <span class="ticket">Submit a ticket</span>
            </p>
          </div>
        </div>
      </b-container>
      <div class="text-center" v-show="!categories.length">
        No categories found!
      </div>
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

.categories-container,
.categories-search-container {
  margin: auto;
  width: 90vw;
  background-color: $background-white;
  padding-bottom: 10vh;
}

.categories-search-container {
  .bread-crumb {
    text-align: left;
    margin-left: 10px;
    padding-top: 10px;
  }
  text-align: center;
  .try-again {
    .ticket {
      color: $green;
    }
  }
  .search-results {
    display: block;
    width: 60%;
    margin: auto;
  }
  .search-result-header {
    padding-top: 20px;
    .search-text {
      color: $green;
      font-weight: bold;
    }
  }
}
</style>
