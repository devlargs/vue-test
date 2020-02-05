<template>
  <div class="search-container">
    <b-input-group size="lg">
      <template v-slot:append>
        <b-button variant="success" size="lg" @click="trigger">
          <b-icon icon="search"></b-icon>
        </b-button>
      </template>
      <b-form-input
        placeholder="Search for answers"
        class="search-input"
        @input="change"
        v-on:keyup.enter="trigger"
      ></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  data: {
    searchText: ""
  },
  methods: {
    change(e) {
      this.searchText = e;
    },
    trigger() {
      if (this.searchText) {
        this.$emit("output", this.searchText);
      } else {
        alert("please enter search keywords");
      }
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
