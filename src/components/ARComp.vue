<template>
  <div v-if="showAr" class="ar-container">
    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          :gltf-model="`url(${modelUrl})`"
          scale="0.5 0.5 0.5"
          position="0 0 0"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  name: 'ARComp',
  props: {
    modelUrl: {
      type: String,
      required: true
    },
    showAr: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.ar-container {
  position: relative;
  width: 100%;
  height: 80vh; /* 80% of the viewport height */
}
</style>
