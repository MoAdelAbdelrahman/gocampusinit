<template>
  <div class="main-container">
    <div class="guide-container">
      <div class="guide">
        <p>{{ guide_arr.length > 0 && guide_arr[0].maneuver ? guide_arr[0].maneuver.instruction : "' '" }}</p>
      </div>
      <div class="vertical-line"></div>
      <div class="guide">
        <p>{{ guide_arr.length > 1 && guide_arr[1].maneuver ? guide_arr[1].maneuver.instruction : " ' '" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guide-card',
  props: {
    guide_arr: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showGuide: false,
    };
  },
  mounted() {
    this.initializeGuide();
  },
  methods: {
    initializeGuide() {
      if (this.guide_arr.length > 0) {
        this.showGuide = true; 
      }
    },
  },
};
</script>

<style scoped>
/* Main container for overall layout */
.main-container {
  position: absolute;
  top: 10%;
  left: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 12px;
  background-color: #f9f9f9; /* Light background */
  padding: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  opacity: 0.98;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Poppins', sans-serif; /* Modern font */
}

.main-container:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.15);
}

/* Guide container styling */
.guide-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

/* Individual guide box styling */
.guide {
  background-color: #e7f5e9; /* Light green for guide box */
  color: #333333; /* Dark text for readability */
  padding: 20px;
  min-width: 320px;
  max-width: 420px;
  margin: 12px 0;
  border-radius: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.guide:hover {
  background-color: #d0ebda; /* Slightly darker green for hover effect */
  transform: translateY(-5px);
}

/* Vertical connecting line */
.vertical-line {
  position: absolute;
  width: 3px;
  background-color: #388E3C; /* Fresh green to match buttons */
  left: 50%;
  z-index: -1;
  transform: translateX(-50%);
  top: 20px;
  height: calc(100% - 40px);
}

/* Guide text styling */
p {
  font-size: 1rem;
  line-height: 1.5;
  color: #333333; /* Darker color for contrast */
  margin: 0;
}

/* Media query for responsive design */
@media (max-width: 768px) {
  .main-container {
    top: 5%;
    left: 2%;
  }

  .guide {
    min-width: 250px;
    max-width: 300px;
  }

  .vertical-line {
    top: 15px;
    height: calc(100% - 30px);
  }
}



</style>
