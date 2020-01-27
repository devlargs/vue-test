<template>
  <div class="slider-container">
    <tawk-slides
      class="no-shadow"
      :visible-slides="3"
      slide-multiple
      :gap="3"
      :slide-ratio="1 / 4"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
    >
      <tawk-slide
        v-for="(category, i) in categories"
        :key="i"
        :title="
          `
            <div style='background-color: #FFFFFF; padding: 20px; border: 1px solid lightgray; width: 276px; height: 200px; border-radius: 5px;'>
                <img src='/images/${category.icon}.png' width='82' height='70' />
                <h1 style='font-size: 16px; font-weight: bold; margin-top: 15px;'>${category.title}</h1>
                <h1 style='font-size: 13px; margin-top: 15px;'>
                    <span style='color: #03a84e'>${category.totalArticle} articles</span><br/>
                    <span style='color: #9c9aa6'>Last update ${category.updatedOn}</span>
                </h1>
            </div>
        `
        "
      />
    </tawk-slides>
  </div>
</template>

<style lang="scss" scoped>
.slider-container {
  width: 87%;
  margin: auto;
}
</style>

<script>
export default {
  props: ["categories", "loading"]
};
</script>
