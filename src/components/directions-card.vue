<template>
  <div class='mainDiv'>
      <ul>
          <li v-for="(step, index) in steps" :key="index">{{ step.maneuver.instruction }}</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'directions-card',
  props: {
    steps: Array,  
  },
}
</script>

<style scoped>
.mainDiv {
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 300px;
  height: 300px;
  overflow: auto;
  padding: 20px;
  background-color: #fff; /* Consider a light background for the content to ensure readability */
  border: 2px solid #007C41; /* UofA green for border */
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  font-family: sans-serif;
}

.mainDiv ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: auto;
}

.mainDiv li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  transition: background-color 0.3s;
}

.mainDiv li:hover {
  background-color: #007C41; /* UofA green for hover effect */
  color: #FFD200; /* UofA gold for text color on hover */
  cursor: pointer;
}

@media (max-width: 768px) {
  .mainDiv {
    width: 250px;
    height: 250px;
    left: 10px;
    bottom: 10px;
  }
}

@media (max-width: 480px) {
  .mainDiv {
    width: 200px;
    height: 200px;
    left: 5px;
    bottom: 5px;
    padding: 15px;
  }
  .mainDiv li {
    padding: 8px;
    font-size: 12px;
  }
}
</style>

