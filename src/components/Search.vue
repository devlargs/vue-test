<template>
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
</template>

<script>
export default {};
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
