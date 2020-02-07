<template>
  <div class="bread-crumb">
    <span class="all" @click="goToHome">All categories</span>
    <span class="current">
      <span>
        <b-icon icon="chevron-right" />
      </span>
      <span>{{ title }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    goToHome() {
      if (location.pathname === "/") {
        location.reload();
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

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
</style>
