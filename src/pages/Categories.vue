<template>
  <div>
    <tawk-search></tawk-search>

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
          />
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
    fetchCategories() {
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
        }, 500);
      });
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
