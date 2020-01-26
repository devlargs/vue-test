<template>
  <div class="category-card mt-3">
    <div class="inner-container">
      <h1 class="icon">
        <b-icon :icon="data.icon" aria-hidden="true"></b-icon>
      </h1>
      <h4 class="topic mt-2">{{ data.title }}</h4>
      <h6 class="sub-text">
        <span class="total">{{ data.totalArticle }} Articles</span><br />
        <span class="updated">Last updated {{ data.updatedOn }}</span>
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.category-card {
  padding: 10px;
  text-align: center;
  .inner-container {
    background-color: white;
    cursor: pointer;
    padding: 10px;
    border: 1px solid rgb(231, 231, 231);
    .icon {
      .icon-shadow {
        text-shadow: 0 0 10px blue;
      }
      font-size: 4rem;
      color: $green;
    }
    .topic {
      font-size: 24px;
      color: $text-black;
    }
    .sub-text {
      font-size: 18px;
    }
    .total {
      color: $green;
    }
    .updated {
      color: $text-gray;
    }
  }
}
</style>
