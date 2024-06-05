<template>
  <div v-if="showAr" class="ar-container">
    <a-scene embedded>
      <a-assets>
        <a-asset-item id="model" src="./3dmodels/Athabasca+Hall.glb"></a-asset-item>
      </a-assets>
      <a-entity
        gltf-model="#model"
        scale="0.5 0.5 0.5"
        position="0 2 -3"
      ></a-entity>
      <a-camera></a-camera>
    </a-scene>
  </div>
</template>

<script>
export default {
  name: 'ARComp',
  props: {
    showAr: {
      type: Boolean,
      default: false
    },
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
