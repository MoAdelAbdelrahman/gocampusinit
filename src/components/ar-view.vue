<template>
  <div class="model-container">
    <model-viewer
      ref="modelViewer"
      src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
      alt="A 3D model of an astronaut"
      auto-rotate="true"
      camera-controls
      ar
      shadow-intensity="1"
    ></model-viewer>
    <p>3D MODEL RENDERED</p>

    <RouterLink to="/">Go Back</RouterLink>
  </div>
</template>

<script>

export default {
  name: 'ar-view',
  mounted() {
    this.logModelViewerElement();
  },
  methods: {
    goToAR() {
      this.$router.push('/ar');
      
    },
    logModelViewerElement() {
      const modelViewer = this.$refs.modelViewer;
      console.log('Model Viewer Element:', modelViewer);
      // You can access various properties and methods of the modelViewer element here
      console.log('Source:', modelViewer.src);
      console.log('Alt Text:', modelViewer.alt);
      console.log('Auto Rotate:', modelViewer.autoRotate);
    },
  },
};
</script>

<style>
.model-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.model-viewer {
  width: 100%;
  height: 100%;
  z-index: 0; /* Higher z-index value */

}
</style>
