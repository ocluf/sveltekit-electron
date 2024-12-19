<template>
  <div id="carouselComponent" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(img, idx) in images"
        :key="img"
        :class="{ 'carousel-item': true, active: idx === 0 }"
      >
        <img :src="img" class="d-block w-100" />
      </div>
    </div>
    <component v-for="c in controls" :key="c.name" :is="c" />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  props: ["images"],
  setup() {
    // Extension Manager is provided by the main app,
    // allowing you to execute extension points within plugins as well
    const extensionManager = inject("extensionManager");
    const controls = extensionManager.execute("slider-controls");

    return { controls };
  },
};
</script>
