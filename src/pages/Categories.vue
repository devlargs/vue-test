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

    <div v-show="!loading">
      <category
        v-for="(category, index) in categories"
        :key="index"
        :data="category"
      ></category>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
          this.categories = q.data;
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
</style>
