<template>
  <div>
    <tawk-search />
    <div class="articles-container mt-3">
      <div class="inner-container">
        <div class="bread-crumb">
          <span class="all" @click="goToHome">All categories</span>
          <span class="current">
            <span>
              <b-icon icon="chevron-right" />
            </span>
            <span v-show="!categoryLoading">
              {{ category.title }}
            </span>
          </span>
        </div>

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
                v-for="(a, index) in articles"
                :key="index"
                :data="a"
              />
            </b-col>
          </b-row>
        </b-container>
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
      articles: [],
      category: {},
      loading: false,
      categoryLoading: false
    };
  },
  created() {
    this.fetchCategory();
    this.fetchArticles();
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    async fetchCategory() {
      this.categoryLoading = true;
      const q = await axios.get(`/api/categories`);
      setTimeout(() => {
        this.category = q.data
          .filter(r => r.id === this.$route.params.id)
          .map(h => ({
            ...h,
            updatedOn: moment(h.updatedOn).fromNow()
          }))[0];
        this.categoryLoading = false;
        console.log(this.category);
      }, 500);
    },
    async fetchArticles() {
      this.loading = true;
      const q = await axios.get(`/api/category/${this.$route.params.id}`);
      setTimeout(() => {
        this.articles = q.data
          .filter(r => r.status === "published")
          .map(h => ({
            ...h,
            updatedOn: moment(h.updatedOn).format("MMM DD YYYY")
          }));
        this.loading = false;
      }, 500);
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
    .bread-crumb {
      font-size: 18px;
      .all {
        color: $green;
        cursor: pointer;
      }
      .current {
        color: $text-gray;
      }
    }
    .padding-0 {
      padding: 0;
    }
  }
}
</style>
