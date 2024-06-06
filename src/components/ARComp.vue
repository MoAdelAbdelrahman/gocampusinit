<template>
  <div v-if="showAr" class="ar-container">
    <a-scene
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
    >
      <a-assets>
        <a-asset-item id="model" src="./3dmodels/monitor4.gltf"></a-asset-item>
      </a-assets>
      <a-entity
        v-if="latitude && longitude"
        gps-entity-place="latitude: {{latitude}}; longitude: {{longitude}};"
        gltf-model="#model"
        scale="0.5 0.5 0.5"
        animation-mixer
      ></a-entity>
      <a-text
        v-if="latitude && longitude"
        value="This content will always face you."
        look-at="[gps-camera]"
        scale="50 50 50"
        gps-entity-place="latitude: {{latitude}}; longitude: {{longitude}};"
      ></a-text>
      <a-camera gps-camera rotation-reader></a-camera>
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
  },
  data() {
    return {
      latitude: null,
      longitude: null,
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition, this.showError);
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
    setPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.updateModelPosition();
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error('User denied the request for Geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          console.error('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          console.error('The request to get user location timed out.');
          break;
        case error.UNKNOWN_ERROR:
          console.error('An unknown error occurred.');
          break;
      }
    },
    updateModelPosition() {
      const modelEntity = document.querySelector('[gps-entity-place]');
      if (modelEntity) {
        modelEntity.setAttribute('gps-entity-place', `latitude: ${this.latitude}; longitude: ${this.longitude};`);
      }
    }
  },
  watch: {
    showAr(newVal) {
      if (newVal) {
        this.updateModelPosition();
      }
    },
    latitude() {
      this.updateModelPosition();
    },
    longitude() {
      this.updateModelPosition();
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
