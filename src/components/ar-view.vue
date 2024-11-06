<template>
  <div class="model-container">
    <div class="model-viewer-wrapper">
      <model-viewer
        ref="modelViewer1"
        src="./3dmodels/untitled1.glb"
        alt="A 3D model of an astronaut"
        auto-rotate
        camera-controls
        ar
        shadow-intensity="1"
      ></model-viewer>
      <p>3D MODEL 1 RENDERED</p>
    </div>

    <div class="model-viewer-wrapper">
      <model-viewer
        ref="modelViewer2"
        src="./3dmodels/eleni.glb"
        alt="A 3D model of a space rover"
        auto-rotate
        camera-controls
        ar
        shadow-intensity="1"
      ></model-viewer>
      <p>3D MODEL 2 RENDERED</p>
    </div>

    <div class="model-viewer-wrapper">
      <model-viewer
        ref="modelViewer3"
        src="./3dmodels/uofa.glb"
        alt="A 3D model of a satellite"
        auto-rotate
        camera-controls
        ar
        shadow-intensity="1"
      ></model-viewer>
      <p>3D MODEL 3 RENDERED</p>
    </div>

    <RouterLink to="/">Go Back</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'ar-view',
  mounted() {
    this.logModelViewerElements();
  },
  methods: {
    goToAR() {
      this.$router.push('/ar');
    },
    logModelViewerElements() {
      const modelViewer1 = this.$refs.modelViewer1;
      const modelViewer2 = this.$refs.modelViewer2;
      const modelViewer3 = this.$refs.modelViewer3;
      
      console.log('Model Viewer 1:', modelViewer1);
      console.log('Source 1:', modelViewer1.src);
      console.log('Model Viewer 2:', modelViewer2);
      console.log('Source 2:', modelViewer2.src);
      console.log('Model Viewer 3:', modelViewer3);
      console.log('Source 3:', modelViewer3.src);
    },
  },
};
</script>

<style>
/* Allow the entire page to be scrollable */
body, html {
  height: 100%;
  overflow-y: auto;
  margin: 0;
  padding: 0;
}

/* Container for the models */
.model-container {
  width: 100%;
  max-height: 100vh; /* Set max-height to viewport height */
  overflow-y: auto; /* Enable vertical scrolling */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.model-viewer-wrapper {
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

model-viewer {
  width: 100%;
  height: 400px;
  max-width: 100%;
}
</style>
