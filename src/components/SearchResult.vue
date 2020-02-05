<template>
  <div>
    <h1>{{ result.title }}</h1>
    <p>{{ result.content }}</p>
  </div>
</template>

<script>
export default {
  props: ["result"]
};
</script>

<style scoped>
</style>