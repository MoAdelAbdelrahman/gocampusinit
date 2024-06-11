<template>
    <div>
      <model-viewer
        ref="modelViewer"
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        alt="A 3D model of an astronaut"
        auto-rotate
        camera-controls
        ar
        shadow-intensity="1"
        style="width: 100%; height: 100%; z-index: 1;"
      ></model-viewer>
      <p>what</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ar-view',
    mounted() {
      this.logModelViewerElement();
    },
    methods: {
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
  
  <style scoped>
  model-viewer {
    width: 100%;
    height: 100%;
    z-index: -100;
  }
  </style>
  