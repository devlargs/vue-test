<template>
  <div class="search-container">
    <b-input-group size="lg">
      <template v-slot:append>
        <b-button variant="success" size="lg" disabled
          ><b-icon icon="search"></b-icon
        ></b-button>
      </template>
      <b-form-input
        placeholder="Search for answers"
        class="search-input"
        @input="change"
      ></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  methods: {
    change(e) {
      this.$emit("output", e);
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
