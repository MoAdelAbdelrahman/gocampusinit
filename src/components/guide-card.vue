<template>
    <div class="mainContainer">
      <div class="guideContainer">
        <div class="guide" >
          <p> {{ guide_arr.length > 0 && guide_arr[0].maneuver ? guide_arr[0].maneuver.instruction : "' '" }}</p>
        </div>
        <div class="verticalLine"></div>
        <div class="guide" >
          <p> {{ guide_arr.length > 1 && guide_arr[1].maneuver ? guide_arr[1].maneuver.instruction : " ' '" }}</p>
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
    mounted () {
    
    },
  };
  </script>
  
  <style scoped>
  
.mainContainer {
  position: absolute;
  top: 10%; /* Added 'px' unit */
  left: 3%; /* Added 'px' unit */
  display: flex;
  justify-content: start;
  align-items: start;
  max-width: auto;
  border-radius: 8px;
    box-shadow: 0 30px 10px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0;
    opacity: 0.95;
}

  
  .guideContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    opacity: 1;
    
  }
  
  .guide {
    background-color: #f0f0f0;
    padding: 20px;
    min-width: 300px;
    max-width: 400px;
    opacity: 1;
    margin: 10px 0; /* Adjusted for vertical stacking */
    border-radius: 8px;
    box-shadow: 0 30px 10px rgba(0, 0, 0, 0.1);
  }
  
  .verticalLine {
    position: absolute;
    width: 4px;
    background-color: #007bff;
    left: 50%;
    z-index: -1;
    
    transform: translateX(-50%);
    top: 25%; /* Adjust this value based on the actual height of your guides */
    height: calc(100% - 120px); /* Adjust based on the total height of guides and desired spacing */
  }
  </style>
  