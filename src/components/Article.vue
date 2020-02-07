<template>
  <div class="article-container mb-3">
    <b-row class="mt-2">
      <b-col class="text-center pr-0 pl-0">
        <h3 class="mt-2 icon-left">
          <b-icon :icon="data.icon"></b-icon>
        </h3>
      </b-col>
      <b-col cols="8" class="pl-0 pr-0">
        <div class="mb-0">
          <div v-html="data.title"></div>
          <span class="updated" v-show="!searchResult"
            >Updated {{ data.updatedOn | moment("MMM DD YYYY") }}</span
          >
          <span class="updated" v-show="searchResult">{{ data.content }}</span>
        </div>
      </b-col>
      <b-col class="text-center pl-0 pr-0">
        <h3 class="mt-2 icon-right">
          <b-icon icon="chevron-right"></b-icon>
        </h3>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["data", "searchResult"]
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.article-container {
  background-color: white;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  .title {
    font-size: 22px;
  }
  .updated {
    font-size: 14px;
    color: $text-gray;
  }
  .icon-right,
  .icon-left {
    color: $green;
    font-weight: bold;
  }
}
</style>
