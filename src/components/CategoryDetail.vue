<template>
  <div>
    <div class="details-container text-center">
      <h3 class="document-icon">
        <b-icon icon="document-text" class="icon" />
      </h3>
      <h6 class="document-count">{{ data.totalArticle }}</h6>
      <img class="mt-3" :src="`/images/${data.icon}.png`" />
      <h5 class="mt-4">{{ data.title }}</h5>
      <h6 class="updated">Updated {{ data.updatedOn }}</h6>
    </div>
    <div class="subdetail-container text-center">
      <h2 class="alert-circle">
        <b-icon icon="alert-circle" />
      </h2>
      <h5>
        {{ data.description }}
      </h5>
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
.details-container {
  position: relative;
  background-color: white;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #e7e7e7;
  border-radius: 5px 5px 0px 0px;
  width: 90%;
  .document-icon {
    position: absolute;
    right: 33px;
    color: green;
  }
  .document-count {
    position: absolute;
    right: 18px;
    font-size: 18px;
    color: $text-gray;
    top: 17px;
  }
  .updated {
    color: $text-gray;
    font-size: 14px;
  }
}
.subdetail-container {
  background-color: white;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #e7e7e7;
  border-radius: 0px 0px 5px 5px;
  width: 90%;
  .alert-circle {
    color: $green;
  }
  h5 {
    font-size: 16px;
    color: $text-gray;
  }
}
</style>
