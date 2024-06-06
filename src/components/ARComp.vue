<template>
  <div v-if="showAr" class="ar-container">
    <a-scene
      vr-mode-ui="enabled: false;"
      arjs="sourceType: webcam; debugUIEnabled: false; patternRatio: 0.70"
      renderer="logarithmicDepthBuffer: true"
      device-orientation-permission-ui="enabled: true"
    >
      <!-- Marker-based AR entity -->
      <a-marker type="pattern" url="https://cdn.glitch.me/d975da3b-49e7-49c4-b6a6-e9b8599fb63f%2Fpattern-fly.patt">
        <a-entity
          id="bot"
          gltf-model="url(https://cdn.glitch.me/fc511399-d148-4898-ad51-f0b6fafd32a6/scene.gltf)"
          animation-mixer="clip: *;"
          visible="true"
          scale="30 30 30"
          position="0 0 -1"
          rotation="-90 0 0"
        ></a-entity>
      </a-marker>
      
      <!-- Location-based text -->
      <a-text
        v-if="latitude && longitude"
        id="gps-text"
        value="This content will always face you."
        look-at="[gps-camera]"
        scale="50 50 50"
        :gps-entity-place="`latitude: ${latitude}; longitude: ${longitude};`"
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
      this.$nextTick(this.updateTextPosition); // Ensure DOM update before calling the method
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
    updateTextPosition() {
      const textEntity = document.querySelector('#gps-text');
      if (textEntity) {
        textEntity.setAttribute('gps-entity-place', `latitude: ${this.latitude}; longitude: ${this.longitude};`);
      } else {
        console.error('Text entity not found.');
      }
    }
  },
  watch: {
    showAr(newVal) {
      if (newVal) {
        this.$nextTick(this.updateTextPosition); // Ensure DOM update before calling the method
      }
    },
    latitude() {
      this.$nextTick(this.updateTextPosition); // Ensure DOM update before calling the method
    },
    longitude() {
      this.$nextTick(this.updateTextPosition); // Ensure DOM update before calling the method
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
