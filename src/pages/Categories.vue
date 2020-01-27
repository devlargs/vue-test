<template>
  <div>
    <tawk-search @output="search"></tawk-search>

    <div v-show="loading" class="text-center mt-5">
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-show="!loading" class="categories-container mt-4">
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
      error: false
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
    search(variable) {
      this.fetchCategories(variable);
      console.log(variable);
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
</style>
