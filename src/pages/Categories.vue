<template>
  <div>
    <div class="search-container">
      <b-input-group size="lg">
        <template v-slot:append>
          <b-button variant="success" size="lg"
            ><b-icon icon="search"></b-icon
          ></b-button>
        </template>
        <b-form-input
          placeholder="Search for answers"
          class="search-input"
        ></b-form-input>
      </b-input-group>
    </div>

    <div v-show="loading" class="text-center mt-5">
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-show="!loading" class="categories-container mt-4">
      <b-container class="bv-example-row mb-3">
        <b-row cols="3">
          <tawk-category
            v-for="(category, index) in categories"
            :key="index"
            :data="category"
          ></tawk-category>
        </b-row>
      </b-container>
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
    async fetchCategories() {
      this.loading = true;
      axios.get("/api/categories").then(q => {
        setTimeout(() => {
          this.categories = q.data
            .filter(r => r.enabled)
            .map(h => ({
              ...h,
              updatedOn: moment(h.updatedOn).fromNow()
            }));
          this.loading = false;
        }, 500);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
.search-container {
  width: 50%;
  margin: auto;
  .search-input::placeholder {
    font-size: 18px;
  }
}
.categories-container {
  margin: auto;
  width: 90vw;
  background-color: #f9f9f9;
  padding-bottom: 10vh;
}
</style>
