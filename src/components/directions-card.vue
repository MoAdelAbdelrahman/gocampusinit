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


/* Main container for overall layout */
.mainDiv {
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 300px;
  height: 300px;
  overflow: auto;
  padding: 20px;
  background-color: #ffffff; /* Light background for readability */
  border-radius: 20px;
  border: 1px solid #A1B5A1; /* Softer green border */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); /* Elevated shadow effect */
  font-family: 'Poppins', sans-serif; /* Clean, modern font */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effect to add a slight lift */
.mainDiv:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25); /* Stronger shadow on hover */
}

/* Styling for indoor instructions */
.IndoorInstructions,
.outdoorInstructions {
  background-color: #f9f9f9; /* Clean, soft light gray background */
  list-style-type: none;
  padding: 10px; /* Added padding to create space around instructions */
  margin: 0;
  border-radius: 10px;
  overflow-y: auto;
}

/* Styling individual list items */
.outdoorInstructions li,
.IndoorInstructions li {
  padding: 12px;
  margin: 6px 0;
  border-radius: 8px;
  background-color: #ffffff; /* White background for each instruction */
  color: #333333; /* Dark text for readability */
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Soft shadow for individual instructions */
  transition: background-color 0.3s, color 0.3s;
}

/* Hover effect for list items */
.outdoorInstructions li:hover,
.IndoorInstructions li:hover {
  background-color: #007C41; /* UofA green for hover */
  color: #FFD200; /* UofA gold for text on hover */
  cursor: pointer;
}

/* Media query for smaller screens */
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


