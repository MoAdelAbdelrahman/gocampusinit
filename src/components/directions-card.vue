<template>
  <div class='mainDiv'>
      <ul class ='outdoorInstructions'>
          <li v-for="(step, index) in steps" :key="index">{{ step.maneuver.instruction }}</li>
      </ul>
      
    
      
      <ul class='IndoorInstructions'>
  <li v-for="(step, index) in indoorSteps" :key="index">
    From {{ step.FirstNode }}, go {{ step.RelativeDirection }} to {{ step.SecondNode }}.
  </li>
</ul>
  </div>
</template>

<script>
export default {
  name: 'directions-card',
  props: {
    steps: Array,  
    indoorSteps: Array,
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
  background-color: #fff; /* Light background for readability */
  border: 2px solid #53655c; /* UofA green for border */
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  font-family: sans-serif;
} 

/* Styling for indoor instructions */
.IndoorInstructions {
  background-color: #EBF5EB; /* Slightly lighter UofA green variant for background */
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: auto;
  height: fit-content;
}

/* Styling for outdoor instructions */
.outdoorInstructions {
  background-color: rgb(209, 235, 233); /* A different, light UofA themed color */
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: fit-content;
  overflow-y: auto;
}

.outdoorInstructions li, .IndoorInstructions li {
  padding: 10px;
  border-bottom: 1px solid #dddddd;
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
    width: 230px;
    height: 290px;
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


